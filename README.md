# Kanban ToDo Dashboard (Assessment)

A Kanban-style ToDo dashboard with **4 columns** (Backlog / In Progress / Review / Done) featuring:
- CRUD tasks (create, update, delete)
- Drag & drop between columns
- Pagination / Infinite scroll **per column**
- Global search by title/description
- **Material UI** layout + consistent design system
- **React Query** caching for server state
- Local mock API using **json-server**

## Tech
- React + TypeScript + Vite
- MUI (Material UI)
- @tanstack/react-query
- Zustand (UI-only state)
- dnd-kit (drag & drop)
- react-hook-form + zod (forms & validation)
- json-server (mock REST)

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run mock API
```bash
npm run server
```
Mock API will be at: `http://localhost:4000/tasks`

### 3) Run the app
```bash
npm run dev
```
App will be at: `http://localhost:5173`

## Build / Deploy
```bash
npm run build
npm run preview
```

## Notes (Architecture)
- `features/tasks` contains domain logic (api + hooks + UI components).
- Server state is handled by React Query. UI-only state (dialogs, search input) is in Zustand.
- Each column uses `useInfiniteQuery` with `_page/_limit` for independent pagination and caching.
- Drag & drop updates the task column via mutation with an optimistic UI update + rollback on error.

