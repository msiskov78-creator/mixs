"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputAutocomplete } from "@/components/InputAutocomplete";
import { MapView } from "@/components/MapView";
import { Modal } from "@/components/Modal";
import { Tabs, type TabOption } from "@/components/Tabs";
import { places, type Place } from "@/data/places";
import { weatherConditions } from "@/data/mockWeather";
import { buildRouteOptions, type RouteOption, type RoutePreference } from "@/lib/pricing";
import { getAiRecommendation } from "@/lib/scoring";
import { addFavorite, addHistory } from "@/lib/storage";

const preferences: { id: RoutePreference; label: string }[] = [
  { id: "fast", label: "Быстрее" },
  { id: "cheap", label: "Дешевле" },
  { id: "comfort", label: "Комфорт" },
  { id: "eco", label: "Eco" }
];

const tabs: TabOption[] = [
  { id: "taxi", label: "Такси" },
  { id: "bus", label: "Общественный транспорт" },
  { id: "scooter", label: "Самокаты" },
  { id: "walk", label: "Пешком + транспорт" },
  { id: "mixed", label: "Смешанные" }
];

const mockLayers = [
  { id: "taxi", name: "Такси", pins: places.slice(0, 4) },
  { id: "scooter", name: "Самокаты", pins: places.slice(4, 8) },
  { id: "bus", name: "ОТ", pins: places.slice(8, 12) },
  { id: "parking", name: "Парковки", pins: places.slice(2, 6) },
  { id: "traffic", name: "Пробки", pins: places.slice(6, 10) }
];

export default function HomePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [preference, setPreference] = useState<RoutePreference>("fast");
  const [errors, setErrors] = useState<{ from?: string; to?: string }>(() => ({}));
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [activeTab, setActiveTab] = useState("taxi");
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "paid">("idle");
  const [layers, setLayers] = useState(
    mockLayers.map((layer) => ({ ...layer, enabled: layer.id === "taxi" }))
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  const placeOptions = useMemo(() => places.map((place) => place.name), []);

  const fromPlace = useMemo(() => places.find((place) => place.name === from) ?? null, [from]);
  const toPlace = useMemo(() => places.find((place) => place.name === to) ?? null, [to]);

  const aiAdvice = useMemo(() => {
    if (routes.length === 0) return null;
    const hour = new Date().getHours();
    const weather = weatherConditions[hour % weatherConditions.length];
    return getAiRecommendation(routes, preference, hour, weather);
  }, [routes, preference]);

  const handleBuild = () => {
    const nextErrors: { from?: string; to?: string } = {};
    if (!from) nextErrors.from = "Введите точку A";
    if (!to) nextErrors.to = "Введите точку B";
    if (from && to && from === to) {
      nextErrors.to = "Точки не должны совпадать";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const hour = new Date().getHours();
    const weather = weatherConditions[hour % weatherConditions.length];
    const distance = fromPlace && toPlace ? Math.random() * 10 + 2 : Math.random() * 8 + 3;
    const options = buildRouteOptions(distance, hour, weather, preference);
    setRoutes(options);
    setSelectedRoute(null);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleDemoLocation = () => {
    setFrom("Текущая (мок)");
  };

  const filteredRoutes = routes.filter((route) => route.mode === activeTab);

  const handleFavorite = (route: RouteOption) => {
    addFavorite({ id: route.id, name: route.name, mode: route.mode, price: route.price });
  };

  const handlePayment = () => {
    if (!selectedRoute) return;
    setPaymentStatus("paid");
    addHistory({
      id: `${selectedRoute.id}-${Date.now()}`,
      from,
      to,
      price: selectedRoute.price,
      mode: selectedRoute.mode,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page space-y-10 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Поиск маршрута</h1>
              <p className="text-sm text-slate-500">Выберите точки, время и предпочтение.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <InputAutocomplete
                label="Точка A"
                value={from}
                onChange={setFrom}
                options={placeOptions}
                placeholder="Начальная точка"
                error={errors.from}
              />
              <InputAutocomplete
                label="Точка B"
                value={to}
                onChange={setTo}
                options={placeOptions}
                placeholder="Конечная точка"
                error={errors.to}
              />
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium">Дата и время</span>
                <input
                  type="datetime-local"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium">Предпочтение</span>
                <select
                  value={preference}
                  onChange={(event) => setPreference(event.target.value as RoutePreference)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                >
                  {preferences.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleBuild}>Построить</Button>
              <Button variant="secondary" onClick={handleSwap}>
                Поменять A↔B
              </Button>
              <Button variant="secondary" onClick={handleDemoLocation}>
                Определить моё местоположение (демо)
              </Button>
            </div>
          </Card>
          <Card>
            <div className="mb-3 flex flex-wrap gap-2">
              {layers.map((layer) => (
                <Button
                  key={layer.id}
                  variant={layer.enabled ? "primary" : "secondary"}
                  onClick={() =>
                    setLayers((prev) =>
                      prev.map((item) =>
                        item.id === layer.id ? { ...item, enabled: !item.enabled } : item
                      )
                    )
                  }
                >
                  {layer.name}
                </Button>
              ))}
            </div>
            <MapView
              from={fromPlace ?? (from === "Текущая (мок)" ? { id: "demo", name: from, lat: 43.24, lng: 76.92 } : null)}
              to={toPlace}
              layers={layers}
            />
          </Card>
        </section>

        <section className="space-y-4">
          <div className="card p-4">
            <h2 className="text-lg font-semibold">AI совет</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {aiAdvice?.explanation ?? "Постройте маршрут, чтобы получить рекомендацию."}
            </p>
          </div>
          <Tabs options={tabs} active={activeTab} onChange={setActiveTab} />
          {routes.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-500">Здесь появятся варианты после построения маршрута.</p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRoutes.map((route) => (
                <Card key={route.id} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{route.name}</h3>
                      <p className="text-sm text-slate-500">{route.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>{route.durationMinutes} мин</p>
                      <p>{route.distanceKm} км</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold">₸ {route.price}</span>
                    <span>★ {route.rating}</span>
                    {route.badges.map((badge) => (
                      <span key={badge} className="badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                  {expanded === route.id && (
                    <ul className="space-y-1 text-sm text-slate-500">
                      {route.steps.map((step) => (
                        <li key={step}>• {step}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => {
                        setSelectedRoute(route);
                        setShowCheckout(true);
                        setPaymentStatus("idle");
                      }}
                    >
                      Выбрать
                    </Button>
                    <Button variant="secondary" onClick={() => handleFavorite(route)}>
                      В избранное
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setExpanded(expanded === route.id ? null : route.id)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Kaspi QR (демо)</h3>
              <p className="text-sm text-slate-500">Оплатите выбранный вариант в демо-режиме.</p>
            </div>
            <Button
              disabled={!selectedRoute}
              onClick={() => {
                setShowCheckout(true);
                setPaymentStatus("pending");
              }}
            >
              Оплатить Kaspi QR (демо)
            </Button>
          </div>
        </section>
      </main>

      <Modal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        title="Оформление (демо)"
      >
        {selectedRoute ? (
          <div className="space-y-4 text-sm">
            <div className="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-800">
              <p>Сумма к оплате</p>
              <p className="text-2xl font-semibold">₸ {selectedRoute.price}</p>
            </div>
            <div className="flex justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" aria-label="QR код">
                <rect width="120" height="120" fill="#111" />
                <rect x="12" y="12" width="32" height="32" fill="#fff" />
                <rect x="76" y="12" width="32" height="32" fill="#fff" />
                <rect x="12" y="76" width="32" height="32" fill="#fff" />
                <rect x="56" y="56" width="20" height="20" fill="#fff" />
              </svg>
            </div>
            <p className="text-center text-xs text-slate-500">Истекает через 02:00</p>
            <div className="rounded-xl border border-slate-200 p-3 text-center dark:border-slate-700">
              Статус: {paymentStatus === "paid" ? "Оплачено" : "Ожидаем..."}
            </div>
            <Button onClick={handlePayment} disabled={paymentStatus === "paid"}>
              Симулировать оплату
            </Button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Выберите маршрут, чтобы начать оплату.</p>
        )}
      </Modal>
    </div>
  );
}
