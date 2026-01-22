export type Place = {
  id: string;
  name: string;
  city: "Алматы" | "Астана";
  lat: number;
  lng: number;
};

export const places: Place[] = [
  { id: "al-1", name: "Медеу", city: "Алматы", lat: 43.2007, lng: 76.8922 },
  { id: "al-2", name: "Кок-Тобе", city: "Алматы", lat: 43.2333, lng: 76.9754 },
  { id: "al-3", name: "ТРЦ Mega", city: "Алматы", lat: 43.2017, lng: 76.8933 },
  { id: "al-4", name: "Алматы Арена", city: "Алматы", lat: 43.2585, lng: 76.7937 },
  { id: "al-5", name: "Ж/д вокзал Алматы-2", city: "Алматы", lat: 43.2643, lng: 76.9347 },
  { id: "al-6", name: "Парк Первого Президента", city: "Алматы", lat: 43.1954, lng: 76.8832 },
  { id: "ast-1", name: "Байтерек", city: "Астана", lat: 51.1283, lng: 71.4306 },
  { id: "ast-2", name: "Хан Шатыр", city: "Астана", lat: 51.1324, lng: 71.4047 },
  { id: "ast-3", name: "EXPO", city: "Астана", lat: 51.0905, lng: 71.418 },
  { id: "ast-4", name: "Нурлы Жол", city: "Астана", lat: 51.1812, lng: 71.4791 },
  { id: "ast-5", name: "Казахский театр", city: "Астана", lat: 51.1605, lng: 71.472 },
  { id: "ast-6", name: "Центральный парк", city: "Астана", lat: 51.1505, lng: 71.4102 }
];

export const popularPlaceNames = places.map((place) => place.name);
