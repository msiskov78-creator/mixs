"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  addAdminLog,
  clearAll,
  getFavorites,
  getHistory,
  getUser,
  setUser,
  type SavedTrip,
  type UserProfile
} from "@/lib/storage";

const ADMIN_CODE = "ADMIN123";

export default function ProfilePage() {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [history, setHistory] = useState<SavedTrip[]>([]);
  const [favorites, setFavorites] = useState(getFavorites());

  useEffect(() => {
    const stored = getUser();
    setUserState(stored);
    setHistory(getHistory());
    setFavorites(getFavorites());
  }, []);

  const handleLogin = () => {
    const role = code === ADMIN_CODE ? "admin" : "user";
    const profile: UserProfile = {
      name,
      phone,
      role,
      preference: "fast",
      language: "ru",
      theme: "light"
    };
    setUser(profile);
    setUserState(profile);
    if (role === "admin") {
      addAdminLog({ id: `${Date.now()}`, message: "Админ вошёл в систему", date: new Date().toISOString() });
    }
  };

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "history.json";
    link.click();
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-page py-10">
          <Card className="space-y-4">
            <h1 className="text-xl font-semibold">Вход</h1>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Имя"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Телефон"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            />
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Код админа (опционально)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            />
            <Button onClick={handleLogin}>Войти</Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page space-y-6 py-8">
        <Card className="space-y-2">
          <h1 className="text-xl font-semibold">Профиль</h1>
          <p className="text-sm text-slate-500">{user.name} · {user.phone} · роль: {user.role}</p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Настройки</h2>
          <div className="text-sm text-slate-500">Предпочтение по умолчанию: {user.preference}</div>
          <div className="text-sm text-slate-500">Язык: {user.language}</div>
          <div className="text-sm text-slate-500">Тема: {user.theme}</div>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">История поездок</h2>
          {history.length === 0 ? (
            <p className="text-sm text-slate-500">История пуста.</p>
          ) : (
            <div className="overflow-auto text-sm">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Маршрут</th>
                    <th className="p-2">Цена</th>
                    <th className="p-2">Тип</th>
                    <th className="p-2">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((trip) => (
                    <tr key={trip.id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="p-2">{trip.from} → {trip.to}</td>
                      <td className="p-2">₸ {trip.price}</td>
                      <td className="p-2">{trip.mode}</td>
                      <td className="p-2">{new Date(trip.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Избранные варианты</h2>
          {favorites.length === 0 ? (
            <p className="text-sm text-slate-500">Пока ничего нет в избранном.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {favorites.map((fav) => (
                <li key={fav.id} className="rounded-xl border border-slate-200 p-2 dark:border-slate-800">
                  {fav.name} · {fav.mode} · ₸ {fav.price}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <div className="flex flex-wrap gap-3">
          <Button onClick={exportHistory}>Экспорт истории</Button>
          <Button
            variant="secondary"
            onClick={() => {
              clearAll();
              setUserState(null);
            }}
          >
            Сбросить данные
          </Button>
        </div>
      </main>
    </div>
  );
}
