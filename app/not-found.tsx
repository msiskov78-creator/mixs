import Link from "next/link";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page py-10">
        <Card className="space-y-3">
          <h1 className="text-xl font-semibold">Страница не найдена</h1>
          <p className="text-sm text-slate-500">Попробуйте вернуться на главную.</p>
          <Link href="/" className="text-sm text-brand-500">
            Перейти на главную
          </Link>
        </Card>
      </main>
    </div>
  );
}
