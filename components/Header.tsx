"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getUser } from "@/lib/storage";

export function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = getUser();
    setIsAdmin(user?.role === "admin");
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          Автоматизация передвижения
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/">Главная</Link>
          <Link href="/services">Сервисы</Link>
          <Link href="/profile">Профиль</Link>
          {isAdmin && <Link href="/admin">Админ</Link>}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
