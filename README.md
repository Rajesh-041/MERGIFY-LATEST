# Mergify — Unified Campus Platform

Mergify is a single-page React app that gives a college campus one shared portal for students and faculty: attendance, timetables, announcements, lost & found / maintenance tickets, a safety center with SOS, and a personal study planner. All data is synced live through Firebase Firestore.

## Features

**Student Portal**
- **Dashboard** — overview of recent reports, announcements, and the current timetable.
- **Campus Hub** — submit "Lost Item" or "Maintenance" tickets.
- **Safety Center** — one-tap SOS alert and an anonymous incident-reporting form, plus quick links to campus helplines.
- **AI Planner** — a guided 3-step wizard that generates a personal day/week/month study/activity timetable.
- **Settings** — profile summary and sign-out.

**Faculty Portal**
- **Dashboard** — summary view of incoming reports.
- **Attendance Hub** — live roster of registered students with one-click Present/Absent marking, logged to Firestore.
- **Timetable Hub** — edit and publish the class timetable, which students see in real time.
- **Comms Manager** — post announcements visible to all students.
- **Monitoring** — review and resolve student-submitted reports (lost & found, maintenance, safety, SOS).

Data updates (reports, announcements, timetable) are pushed to all connected clients in real time via Firestore's `onSnapshot` listeners — no manual refresh needed.

## Tech stack

- **React 18** (JSX, function components, hooks)
- **Vite 5** — dev server / build tool
- **Tailwind CSS** + PostCSS/Autoprefixer — styling
- **Firebase** (Auth + Firestore) — backend: anonymous/custom-token auth, real-time data sync
- **lucide-react** — icon set

## Project structure

```
mergify/                  # the actual Vite app (this is the project root to run commands from)
├── index.html
├── src/
│   ├── main.jsx           # React entrypoint
│   ├── app.jsx             # Entire application: auth flow, role routing, all views/components
│   └── index.css            # Tailwind directives
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json              # SPA rewrite rule for Vercel
└── package.json
```

> Note: the repo root also contains a stray `ex2.txt` (an unrelated SQL script) — it isn't part of the application and can be ignored or removed.

## Getting started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Anonymous sign-in enabled) and **Firestore** turned on

### Installation

```bash
git clone https://github.com/Rajesh-041/MERGIFY-LATEST.git
cd MERGIFY-LATEST/mergify
npm install
```

### Firebase configuration

The Firebase config is currently **hardcoded** directly in `src/app.jsx`:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "mergify-28a08.firebaseapp.com",
  projectId: "mergify-28a08",
  storageBucket: "mergify-28a08.firebasestorage.app",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

To point the app at your own Firebase project, replace these values (ideally moving them into Vite environment variables, e.g. `import.meta.env.VITE_FIREBASE_API_KEY`, rather than committing them directly).

The app also looks for two optional global variables at runtime — `__app_id` and `__initial_auth_token` — falling back to `'MERGIFY-CAMPUS-V3'` and anonymous sign-in respectively if they aren't defined. These are hooks for embedding the app inside another platform that injects a custom auth token; for a standalone deployment you can ignore them and anonymous auth will be used automatically.

### Running locally

```bash
npm run dev
```

The app will be available at the Vite dev server URL printed in the terminal (default `http://localhost:5173`).

### Building for production

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Deployment

`vercel.json` rewrites all routes to `/index.html`, so the app deploys cleanly to Vercel as a static SPA (set the project root to the `mergify/` subfolder when configuring the Vercel project).

## How login/registration works

There's no traditional password. A user registers with a **role** (student/faculty), **full name**, **register number**, and **email**; this creates a document in the `user_directory` Firestore collection keyed by register number. Logging back in just checks that the entered register number exists in that directory with a matching role — so register numbers function as the de facto login credential. Anyone deploying this for real use should add proper password or OTP-based authentication before going live.

## License

No license file is currently included in this repository.
