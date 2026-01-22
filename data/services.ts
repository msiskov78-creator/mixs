export type ServiceCategory = "taxi" | "map" | "scooter" | "payment";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  coverage: string;
  rating: number;
  payments: string[];
  commission: string;
  logo: string;
};

export const services: Service[] = [
  {
    id: "indrive",
    name: "InDrive Demo",
    category: "taxi",
    description: "Народное такси с гибкой ценой и быстрым подбором водителя.",
    coverage: "Алматы, Астана",
    rating: 4.6,
    payments: ["наличные", "карта"],
    commission: "8%",
    logo: "M8 2h8v4h2v4h4V2h2v8H8V2z"
  },
  {
    id: "onay",
    name: "Onay Demo",
    category: "payment",
    description: "Оплата общественного транспорта и быстрые пополнения.",
    coverage: "Алматы",
    rating: 4.2,
    payments: ["карта", "баланс"],
    commission: "0%",
    logo: "M2 4h12v8H2z"
  },
  {
    id: "2gis",
    name: "2GIS Demo",
    category: "map",
    description: "Подробные карты и маршруты по городу.",
    coverage: "Алматы, Астана",
    rating: 4.8,
    payments: ["нет"],
    commission: "-",
    logo: "M2 2h12v12H2z"
  },
  {
    id: "jet",
    name: "Jet Самокаты Demo",
    category: "scooter",
    description: "Шеринг самокатов для быстрых городских поездок.",
    coverage: "Алматы",
    rating: 4.3,
    payments: ["карта", "Kaspi"],
    commission: "5%",
    logo: "M2 2h8v2H2z"
  }
];
