"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

export function LanguageToggle() {
  const [lang, setLang] = useState<"ru" | "kz">("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem("mixs:lang");
    setLang(stored === "kz" ? "kz" : "ru");
  }, []);

  const toggle = () => {
    const next = lang === "ru" ? "kz" : "ru";
    setLang(next);
    window.localStorage.setItem("mixs:lang", next);
  };

  return (
    <Button variant="ghost" onClick={toggle} aria-label="Переключить язык">
      {lang.toUpperCase()}
    </Button>
  );
}
