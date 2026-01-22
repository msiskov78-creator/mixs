# Автоматизация передвижения (MVP+)

Прототип агрегатора маршрутов (такси, ОТ, самокаты) с AI-рекомендацией, оплатой Kaspi QR (демо), профилем и админ-панелью.

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Основные страницы

- `/` — поиск маршрута, карта, варианты поездки, AI-совет, демо-оплата.
- `/services` — каталог сервисов и сравнение.
- `/services/[id]` — деталка сервиса с тарифами, калькулятором, отзывами.
- `/profile` — вход, настройки, история и избранное.
- `/admin` — демо админ-панель (только для роли admin).

## Вход в админку

На странице `/profile` укажите код `ADMIN123` — роль сохранится в localStorage.

## Важное

Kaspi QR — полностью демо-поток. Платежи не настоящие и используются только для UX.

## Структура проекта

```
app/
  api/
  admin/
  profile/
  services/
  page.tsx
components/
  Button.tsx
  Header.tsx
  MapView.tsx
  Modal.tsx
  Tabs.tsx
  InputAutocomplete.tsx
lib/
  haversine.ts
  pricing.ts
  scoring.ts
  storage.ts
  utils.ts
data/
  places.ts
  services.ts
  tariffs.ts
  reviews.ts
  mockTraffic.ts
  mockWeather.ts
```
