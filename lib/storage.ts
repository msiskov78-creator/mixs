export type UserProfile = {
  name: string;
  phone: string;
  role: "user" | "admin";
  preference: "fast" | "cheap" | "comfort" | "eco";
  language: "ru" | "kz";
  theme: "light" | "dark";
};

export type SavedTrip = {
  id: string;
  from: string;
  to: string;
  price: number;
  mode: string;
  date: string;
};

const USER_KEY = "mixs:user";
const HISTORY_KEY = "mixs:history";
const FAVORITES_KEY = "mixs:favorites";
const ADMIN_LOG_KEY = "mixs:admin-log";

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

export function setUser(user: UserProfile) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(HISTORY_KEY);
  window.localStorage.removeItem(FAVORITES_KEY);
  window.localStorage.removeItem(ADMIN_LOG_KEY);
}

export function getHistory(): SavedTrip[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(HISTORY_KEY);
  return raw ? (JSON.parse(raw) as SavedTrip[]) : [];
}

export function addHistory(trip: SavedTrip) {
  const history = getHistory();
  const next = [trip, ...history].slice(0, 20);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export type FavoriteRoute = {
  id: string;
  name: string;
  mode: string;
  price: number;
};

export function getFavorites(): FavoriteRoute[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_KEY);
  return raw ? (JSON.parse(raw) as FavoriteRoute[]) : [];
}

export function addFavorite(route: FavoriteRoute) {
  const favorites = getFavorites();
  const next = [route, ...favorites.filter((fav) => fav.id !== route.id)].slice(0, 20);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
}

export type AdminLogEntry = {
  id: string;
  message: string;
  date: string;
};

export function getAdminLogs(): AdminLogEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(ADMIN_LOG_KEY);
  return raw ? (JSON.parse(raw) as AdminLogEntry[]) : [];
}

export function addAdminLog(entry: AdminLogEntry) {
  const logs = getAdminLogs();
  window.localStorage.setItem(ADMIN_LOG_KEY, JSON.stringify([entry, ...logs]));
}
