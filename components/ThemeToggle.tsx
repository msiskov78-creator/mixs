"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("mixs:theme");
    const initial = stored === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("mixs:theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <Button variant="ghost" onClick={toggle} aria-label="Переключить тему">
      {theme === "light" ? "🌞" : "🌙"}
    </Button>
  );
}
