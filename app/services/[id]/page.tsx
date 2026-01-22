"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { services } from "@/data/services";
import { tariffs } from "@/data/tariffs";
import { reviews } from "@/data/reviews";

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>();
  const service = services.find((item) => item.id === params.id);
  const relatedTariffs = tariffs.filter((tariff) => tariff.serviceId === service?.id);
  const relatedReviews = reviews.filter((review) => review.serviceId === service?.id);
  const [distance, setDistance] = useState(6);
  const [minutes, setMinutes] = useState(18);
  const [demand, setDemand] = useState(1.1);
  const [sort, setSort] = useState("new");

  const estimate = useMemo(() => {
    const base = 400 + distance * 90;
    return Math.round(base * demand);
  }, [distance, demand]);

  const sortedReviews = useMemo(() => {
    return [...relatedReviews].sort((a, b) =>
      sort === "rate" ? b.rating - a.rating : b.date.localeCompare(a.date)
    );
  }, [relatedReviews, sort]);

  if (!service) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-page py-10">
          <Card>
            <p className="text-sm text-slate-500">Сервис не найден.</p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page space-y-8 py-8">
        <section className="card space-y-4 p-6">
          <h1 className="text-2xl font-semibold">{service.name}</h1>
          <p className="text-sm text-slate-500">{service.description}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="badge">Покрытие: {service.coverage}</span>
            <span className="badge">Рейтинг: {service.rating}</span>
          </div>
          <Button>Оформить (демо)</Button>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {relatedTariffs.map((tariff) => (
            <Card key={tariff.id} className="space-y-3">
              <h3 className="text-lg font-semibold">{tariff.name}</h3>
              <p className="text-sm text-slate-500">{tariff.description}</p>
              <div className="text-sm">База: ₸ {tariff.base}</div>
              <div className="text-sm">За км: ₸ {tariff.perKm}</div>
            </Card>
          ))}
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Мини-калькулятор</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm">
              <span>Расстояние (км)</span>
              <input
                type="number"
                value={distance}
                onChange={(event) => setDistance(Number(event.target.value))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Время (мин)</span>
              <input
                type="number"
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Коэффициент спроса</span>
              <input
                type="range"
                min="1"
                max="1.8"
                step="0.1"
                value={demand}
                onChange={(event) => setDemand(Number(event.target.value))}
              />
              <span className="text-xs text-slate-500">x {demand.toFixed(1)}</span>
            </label>
          </div>
          <div className="rounded-xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
            Цена: ₸ {estimate} · Время подачи: {Math.max(3, Math.round(minutes / 6))} мин · Вероятность ожидания: {Math.min(95, Math.round(demand * 60))}%
          </div>
        </section>

        <section className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Отзывы</h2>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <option value="new">Сначала новые</option>
              <option value="rate">По рейтингу</option>
            </select>
          </div>
          <div className="space-y-3">
            {sortedReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.author}</span>
                  <span>★ {review.rating}</span>
                </div>
                <p className="text-slate-500">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <details className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
            <summary className="cursor-pointer font-medium">Как работает демо?</summary>
            <p className="mt-2 text-slate-500">Демо не совершает реальные платежи и вызовы.</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
            <summary className="cursor-pointer font-medium">Есть ли скидки?</summary>
            <p className="mt-2 text-slate-500">В прототипе доступны мок-скидки для сравнения.</p>
          </details>
        </section>
      </main>
    </div>
  );
}
