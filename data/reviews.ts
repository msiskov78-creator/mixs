export type Review = {
  id: string;
  serviceId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    serviceId: "indrive",
    author: "Айгуль",
    rating: 5,
    text: "Приехали быстро, водитель вежливый.",
    date: "2024-06-12"
  },
  {
    id: "r2",
    serviceId: "indrive",
    author: "Марат",
    rating: 4,
    text: "Цена приемлемая, но в час пик ожидал дольше.",
    date: "2024-05-30"
  },
  {
    id: "r3",
    serviceId: "jet",
    author: "Жанна",
    rating: 4,
    text: "Самокаты удобно находить, но нужен бонус за парковку.",
    date: "2024-04-18"
  }
];
