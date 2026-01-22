import { getTrafficMultiplier } from "@/data/mockTraffic";
import { getWeatherImpact, type Weather } from "@/data/mockWeather";
import type { RouteOption, RoutePreference } from "@/lib/pricing";

export function getAiRecommendation(
  routes: RouteOption[],
  preference: RoutePreference,
  hour: number,
  weather: Weather
) {
  const traffic = getTrafficMultiplier(hour);
  const weatherImpact = getWeatherImpact(weather);

  const scored = routes.map((route) => {
    const timeScore = 1 / route.durationMinutes;
    const priceScore = 1 / Math.max(route.price, 1);
    const ecoScore = route.mode === "walk" ? 1 : route.mode === "scooter" ? 0.7 : 0.4;
    const comfortScore = route.mode === "taxi" ? 0.8 : 0.5;

    const weights = {
      fast: 0.5,
      cheap: 0.5,
      comfort: 0.4,
      eco: 0.4
    };

    const score =
      (preference === "fast" ? timeScore * weights.fast : 0) +
      (preference === "cheap" ? priceScore * weights.cheap : 0) +
      (preference === "comfort" ? comfortScore * weights.comfort : 0) +
      (preference === "eco" ? ecoScore * weights.eco : 0) +
      timeScore * 0.2 +
      priceScore * 0.2;

    return { route, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0]?.route;
  const reason = `Сейчас ${hour.toString().padStart(2, "0")}:00, трафик ${traffic.level}. Погода: ${weatherImpact.label}.`;
  const preferenceReason =
    preference === "cheap"
      ? "Ставим упор на минимальную стоимость."
      : preference === "fast"
      ? "Ставим упор на скорость прибытия."
      : preference === "eco"
      ? "Ставим упор на экологичность."
      : "Ставим упор на комфорт и предсказуемость.";

  return {
    best,
    explanation: `${reason} ${preferenceReason} Рекомендуем: ${best?.name ?? "вариант"}.`
  };
}
