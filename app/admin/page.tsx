"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { places } from "@/data/places";
import { services } from "@/data/services";
import { tariffs } from "@/data/tariffs";
import { addAdminLog, getAdminLogs, getHistory, getUser } from "@/lib/storage";

export default function AdminPage() {
  const router = useRouter();
  const [logs, setLogs] = useState(getAdminLogs());
  const [admin, setAdmin] = useState(false);
  const history = getHistory();

  useEffect(() => {
    const user = getUser();
    if (user?.role !== "admin") {
      router.replace("/profile");
    } else {
      setAdmin(true);
    }
  }, [router]);

  const metrics = useMemo(() => {
    const totalPayments = history.length;
    const avgPrice = history.length
      ? Math.round(history.reduce((acc, item) => acc + item.price, 0) / history.length)
      : 0;
    return {
      totalSearches: totalPayments + 12,
      totalPayments,
      avgPrice,
      topRoute: history[0] ? `${history[0].from} → ${history[0].to}` : "Алматы Арена → Медеу"
    };
  }, [history]);

  if (!admin) {
    return null;
  }

  const handleMockUpdate = (message: string) => {
    const entry = { id: `${Date.now()}`, message, date: new Date().toISOString() };
    addAdminLog(entry);
    setLogs((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page space-y-6 py-8">
        <Card className="space-y-4">
          <h1 className="text-2xl font-semibold">Админ-панель</h1>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Всего поисков: {metrics.totalSearches}</div>
            <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Оплат: {metrics.totalPayments}</div>
            <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Средняя цена: ₸ {metrics.avgPrice}</div>
            <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Топ маршрут: {metrics.topRoute}</div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Управление точками</h2>
          <p className="text-sm text-slate-500">Всего точек: {places.length}</p>
          <Button onClick={() => handleMockUpdate("admin изменил список точек")}>Симулировать CRUD</Button>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Управление сервисами</h2>
          <p className="text-sm text-slate-500">Всего сервисов: {services.length}</p>
          <Button onClick={() => handleMockUpdate("admin изменил сервисы")}>Симулировать CRUD</Button>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Управление тарифами</h2>
          <p className="text-sm text-slate-500">Всего тарифов: {tariffs.length}</p>
          <Button onClick={() => handleMockUpdate("admin изменил тарифы")}>Симулировать CRUD</Button>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Лог действий</h2>
          {logs.length === 0 ? (
            <p className="text-sm text-slate-500">Лог пуст.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((log) => (
                <li key={log.id} className="rounded-xl border border-slate-200 p-2 dark:border-slate-800">
                  {log.message} · {new Date(log.date).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </div>
  );
}
