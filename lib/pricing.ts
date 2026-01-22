import { getTrafficMultiplier } from "@/data/mockTraffic";
import { getWeatherImpact, type Weather } from "@/data/mockWeather";

export type RoutePreference = "fast" | "cheap" | "comfort" | "eco";

export type RouteMode = "taxi" | "bus" | "scooter" | "walk" | "mixed";

export type RouteOption = {
  id: string;
  name: string;
  mode: RouteMode;
  durationMinutes: number;
  distanceKm: number;
  price: number;
  rating: number;
  badges: string[];
  description: string;
  steps: string[];
};

const baseSpeed = {
  taxi: 35,
  bus: 22,
  scooter: 18,
  walk: 5,
  mixed: 25
};

const basePrice = {
  taxi: 300,
  bus: 120,
  scooter: 80,
  walk: 0,
  mixed: 200
};

const perKm = {
  taxi: 90,
  bus: 35,
  scooter: 45,
  walk: 0,
  mixed: 70
};

export function buildRouteOptions(
  distanceKm: number,
  hour: number,
  weather: Weather,
  preference: RoutePreference
): RouteOption[] {
  const traffic = getTrafficMultiplier(hour);
  const weatherImpact = getWeatherImpact(weather);

  const modes: RouteMode[] = ["taxi", "bus", "scooter", "walk", "mixed"];

  return modes.flatMap((mode, index) => {
    const speed = baseSpeed[mode] / traffic.multiplier / weatherImpact.speedMultiplier;
    const durationMinutes = Math.max(5, Math.round((distanceKm / speed) * 60));
    const base = basePrice[mode] + perKm[mode] * distanceKm;
    const price = Math.round(base * weatherImpact.priceMultiplier);
    const rating = 3.8 + (index % 3) * 0.3;

    const badges = [
      preference === "cheap" && mode !== "taxi" ? "Дешевле" : null,
      preference === "fast" && mode === "taxi" ? "Быстрее" : null,
      preference === "eco" && mode === "walk" ? "Eco" : null,
      mode === "mixed" ? "Меньше пересадок" : null
    ].filter(Boolean) as string[];

    return [
      {
        id: `${mode}-${index}`,
        name: `${mode === "taxi" ? "Taxi" : mode === "bus" ? "Bus" : mode === "scooter" ? "Scooter" : mode === "walk" ? "Walk" : "Mixed"} ${index + 1}`,
        mode,
        durationMinutes,
        distanceKm: Number(distanceKm.toFixed(1)),
        price,
        rating: Number(rating.toFixed(1)),
        badges,
        description: "Маршрут рассчитан по мок-коэффициентам и доступности сервисов.",
        steps: [
          "Старт: точка A",
          "Переезд через центральную магистраль",
          "Финиш: точка B"
        ]
      }
    ];
  });
}
