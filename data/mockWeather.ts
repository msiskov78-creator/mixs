export type Weather = "sunny" | "rain" | "snow";

export const weatherConditions: Weather[] = ["sunny", "rain", "snow"];

export function getWeatherImpact(weather: Weather) {
  switch (weather) {
    case "rain":
      return { speedMultiplier: 1.15, priceMultiplier: 1.1, label: "Дождь" };
    case "snow":
      return { speedMultiplier: 1.25, priceMultiplier: 1.15, label: "Снег" };
    default:
      return { speedMultiplier: 1, priceMultiplier: 1, label: "Солнечно" };
  }
}
