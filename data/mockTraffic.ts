export type TrafficLevel = "low" | "medium" | "high";

export const trafficByHour: Record<number, { level: TrafficLevel; multiplier: number }> = {
  7: { level: "high", multiplier: 1.4 },
  8: { level: "high", multiplier: 1.5 },
  9: { level: "medium", multiplier: 1.2 },
  12: { level: "medium", multiplier: 1.1 },
  17: { level: "high", multiplier: 1.6 },
  18: { level: "high", multiplier: 1.7 },
  19: { level: "medium", multiplier: 1.3 },
  22: { level: "low", multiplier: 0.9 }
};

export function getTrafficMultiplier(hour: number) {
  const data = trafficByHour[hour];
  return data ?? { level: "low", multiplier: 1 };
}
