"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button, buttonStyles } from "@/components/Button";
import Link from "next/link";
import { Card } from "@/components/Card";
import { services, type Service, type ServiceCategory } from "@/data/services";

const categories: { id: ServiceCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "taxi", label: "Такси" },
  { id: "map", label: "Карта" },
  { id: "scooter", label: "Самокат" },
  { id: "payment", label: "Оплата" }
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [compare, setCompare] = useState<Service[]>([]);

  const filtered = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = category === "all" || service.category === category;
      const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const addCompare = (service: Service) => {
    setCompare((prev) => {
      if (prev.find((item) => item.id === service.id)) return prev;
      return [...prev, service].slice(0, 3);
    });
  };

  const aiRecommendation = useMemo(() => {
    if (compare.length === 0) return "Добавьте сервисы для сравнения.";
    const best = [...compare].sort((a, b) => b.rating - a.rating)[0];
    return `AI рекомендует связку: ${best.name}. Рейтинг ${best.rating} и широкое покрытие.`;
  }, [compare]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page space-y-8 py-8">
        <section className="card space-y-4 p-5">
          <h1 className="text-2xl font-semibold">Сервисы</h1>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <Button
                key={item.id}
                variant={category === item.id ? "primary" : "secondary"}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск сервиса"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="text-lg font-semibold">Сравнение сервисов</h2>
          <p className="text-sm text-slate-500">Можно выбрать до 3 сервисов.</p>
          {compare.length === 0 ? (
            <p className="text-sm text-slate-500">Нет выбранных сервисов.</p>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Сервис</th>
                    <th className="p-2">Комиссия</th>
                    <th className="p-2">Покрытие</th>
                    <th className="p-2">Оплата</th>
                    <th className="p-2">Рейтинг</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((service) => (
                    <tr key={service.id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="p-2">{service.name}</td>
                      <td className="p-2">{service.commission}</td>
                      <td className="p-2">{service.coverage}</td>
                      <td className="p-2">{service.payments.join(", ")}</td>
                      <td className="p-2">★ {service.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{aiRecommendation}</div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <Card key={service.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                    <path d={service.logo} fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm text-slate-500">{service.description}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">Категория: {service.category}</div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => addCompare(service)}>
                  Сравнить
                </Button>
                <Link
                  href={`/services/${service.id}`}
                  className={`${buttonStyles.base} ${buttonStyles.variants.primary}`}
                >
                  Открыть
                </Link>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
