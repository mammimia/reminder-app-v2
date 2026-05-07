# Reminder App v2

A personal productivity and expense tracking application built as an Nx monorepo. Manage reminders with folders and categories, and track income/expenses across multiple currencies with balance management.

---

## Features

### Reminders
- Create reminders with title, content, due date, and folder assignment
- Organize reminders into color-coded folders grouped by categories
- Track reminder status: `TODO` → `IN_PROGRESS` → `PENDING` → `DONE` / `CANCELED`
- Calendar view for date-based browsing
- Auto-assign to a default `General` folder when no folder is selected

### Expenses
- Track income and expenses in `TL` and `USD`
- Payment methods: `CASH` or `CARD`
- Payment periods: `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`, `ONE_TIME`
- Multi-currency balance management
- Local USD exchange rate storage for TL total calculation
- Mark payments as paid to update balances automatically

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | NestJS 10, PostgreSQL, Prisma ORM 5, Zod |
| Mobile | React Native 0.74, Expo 51, React Navigation, React Native Paper, Axios, Formik |
| Shared | `@mammimia/types` (Zod DTOs), `@mammimia/ui` (theme + components) |
| Monorepo | Nx 19 |

---

## Project Structure

```
reminder-app-v2/
├── apps/
│   ├── api/          # NestJS REST API
│   └── mobile/       # React Native / Expo mobile app
├── libs/
│   ├── types/        # Shared Zod DTOs (@mammimia/types)
│   └── ui/           # Shared theme and UI components (@mammimia/ui)
└── Documents/        # Local project docs (gitignored)
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device or an emulator

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/reminder_db
DIRECT_URL=postgresql://user:password@localhost:5432/reminder_db
```

### 3. Run database migrations

```bash
npx prisma migrate dev --schema=apps/api/src/prisma/schema.prisma
```

### 4. Start the API

```bash
npx nx serve api
```

The API will be available at `http://localhost:3000/api`.

### 5. Start the mobile app

```bash
npx nx start mobile
```

Scan the QR code with Expo Go or press `a` for Android emulator / `i` for iOS simulator.

---

## API Endpoints

| Resource | Base Path |
|---|---|
| Reminders | `/api/reminders` |
| Folders | `/api/folders` |
| Categories | `/api/categories` |
| Payments | `/api/payments` |
| Payment Types | `/api/payment-types` |
| Balances | `/api/balances` |

All resources support standard CRUD. Additional endpoints:
- `POST /api/payments/:id/pay` — mark a payment as paid and update balance
- `PATCH /api/balances/:id/increase` — increase a balance amount
- `PATCH /api/balances/:id/reduce` — reduce a balance amount

---

## Common Nx Commands

```bash
# Serve the API in development
npx nx serve api

# Start the mobile app
npx nx start mobile

# Build the API
npx nx build api

# Lint all projects
npx nx run-many -t lint

# View the project dependency graph
npx nx graph
```
