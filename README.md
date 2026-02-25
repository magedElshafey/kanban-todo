# 🚀 Kanban Task Management Board

A production-ready Kanban task management application built with modern React architecture.  
This project demonstrates scalable frontend patterns, optimistic UI updates, drag & drop collision tuning, and clean feature-based structure.

---

## 🔗 Live Demo

**Production:**  
👉 https://kanban-todo-one.vercel.app

---

# 🧠 Overview

This application simulates a real-world task management system with:

- Paginated API data per column
- Optimistic task movement between columns
- Infinite scrolling
- Drag & Drop interactions
- Advanced state management
- Production-grade architecture

The focus of this project is not just UI — but clean engineering structure and predictable state flow.

---

# 🛠 Tech Stack

### Core

- React 18
- TypeScript
- Vite

### UI & Interaction

- MUI (Material UI)
- dnd-kit (Drag & Drop)
- Framer Motion
- Sonner (toasts)

### State & Data

- TanStack Query (Server State)
- Zustand (UI State)
- JSON Server (Mock REST API)

---

# ✨ Features

## 📌 Kanban Board

- Multiple dynamic columns
- Task count per column
- Infinite scrolling per column
- Sorted by latest update

## 🔄 Drag & Drop

- Cross-column drag support
- Custom collision detection strategy
- Drag overlay rendering
- Optimistic UI updates
- Rollback on server failure

## ⚡ Optimistic Mutations

- Instant UI response
- Smart cache patching
- Query invalidation on settle

## 🔍 Filtering & Search

- Debounced search
- Multi-priority filtering
- Server-side pagination

## 📱 Responsive Design

- Mobile-first layout
- Scroll isolation per column
- Adaptive grid system

---

# 📂 Project Structure

```
src/
 ├── features/
 │    ├── tasks/
 ├── shared/
 │    ├── layout/
 │    ├── types/
 │    └── utils/
  │   └── Ui/
 ├── stores/
 ├── pages/
 └── main.tsx
```

Architecture goals:

- High cohesion
- Low coupling
- Feature isolation
- Reusable hooks
- Clear API abstraction

---

# ⚙️ Getting Started

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_URL=http://localhost:4000
```

---

## 3️⃣ Start Mock API Server

```bash
  npm run server
```

---

## 4️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🌍 Production Deployment

### Frontend

Deployed on **Vercel**

### Backend (Mock API)

Deployed on **Railway**

Production environment variable:

```
VITE_API_URL=https://kanban-todo-production.up.railway.app
```

Deployment includes:

- Production build optimization
- Proper environment configuration
- CORS handling
- Cache-safe requests

---

# 🧪 Engineering Highlights

This project demonstrates:

- Custom collision detection tuning (dnd-kit)
- InfiniteQuery pagination handling
- Smart TanStack Query cache manipulation
- Optimistic mutation lifecycle control
- Modular feature-based architecture
- Strong TypeScript typing
- Clean separation of concerns

---

# 🎯 Design Philosophy

The goal was to build a Kanban system with a real production mindset:

- Predictable behavior
- Performance awareness
- Maintainability
- Scalability
- Clean developer experience

---

# 🔮 Possible Enhancements

The current implementation focuses on scalable architecture and clean state management.  
Future iterations could elevate the system further with:

- Authentication & user session management
- Real backend implementation (Node.js / Express)
- WebSocket-based live updates
- Role-based access control (RBAC)
- Unit & integration testing (Vitest / React Testing Library)
- Dark mode with theme switching
- **Design System extraction**:
  - Centralized design tokens (colors, spacing, typography, shadows)
  - Theme configuration instead of inline color values
  - Reusable UI primitives
  - Consistent theming layer for scalability and brand alignment

This would transform the project from a feature-based implementation into a fully scalable product foundation.

---

# 📜 License

This project was built as a **technical assessment submission for MindLuster**.

It is intended solely for evaluation purposes and demonstration of frontend engineering capabilities, architectural decisions, and production-readiness standards.
