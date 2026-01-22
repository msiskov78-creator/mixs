import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Автоматизация передвижения",
  description: "MVP+ агрегатор маршрутов и сервисов"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
