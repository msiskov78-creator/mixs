export type Tariff = {
  id: string;
  serviceId: string;
  name: string;
  base: number;
  perKm: number;
  description: string;
};

export const tariffs: Tariff[] = [
  {
    id: "taxi-basic",
    serviceId: "indrive",
    name: "Эконом",
    base: 400,
    perKm: 90,
    description: "Быстро и доступно для ежедневных поездок."
  },
  {
    id: "taxi-comfort",
    serviceId: "indrive",
    name: "Комфорт",
    base: 700,
    perKm: 120,
    description: "Более высокий класс авто и повышенный комфорт."
  },
  {
    id: "taxi-eco",
    serviceId: "indrive",
    name: "Эко",
    base: 500,
    perKm: 80,
    description: "Оптимальный тариф с приоритетом экологии."
  }
];
