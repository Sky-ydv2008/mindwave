# Mindweave — AI-Powered Collaborative Intelligence & Project Execution Platform

> Built by **Apexx Innovators**

Mindweave is an enterprise-grade AI collaborative workspace combining project management, interactive Kanban boards, real-time team chat, document intelligence, GitHub integration, analytics, and a systematic symbolic knowledge layer with transparent hybrid RAG reasoning.

---

## 🚀 Deployment Status & Links

- **Frontend (Vercel)**: Configured for 1-click deployment on [Vercel](https://vercel.com) using `vercel.json` (`apps/web`).
- **Backend (Render)**: Configured for automated deployment on [Render](https://render.com) using `render.yaml` (`apps/server`).
- **Full Guide**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step instructions.

---

## 🌟 Key Features

1. **Systematic Symbolic Representation & Knowledge Layer**:
   - Structured project knowledge graphs containing explicit entities (`Project`, `Person`, `Task`, `Feature`, `Requirement`, `Document`, `Pull Request`, `Decision`).
   - Typed relationship edges (`IMPLEMENTED_BY`, `BROKEN_INTO`, `ASSIGNED_TO`, `DEPENDS_ON`, `EVIDENCE_FOR`).
   - Grounded confidence scores and verifiable evidence snippets for every extracted fact.

2. **Interactive Knowledge Graph Explorer**:
   - Filter by entity type (`REQUIREMENT`, `FEATURE`, `TASK`, `DOCUMENT`, `PULL_REQUEST`, `PERSON`).
   - Deep inspection modal showing outgoing & incoming relations, explicit facts, and evidence sources.

3. **End-to-End Requirements Traceability Matrix**:
   - Complete audit trail: `Requirement → Feature → Task → Pull Request → Test → Documentation`.
   - Continuous detection of uncovered requirements and unlinked code changes.

4. **Hybrid Symbolic + RAG AI Engine**:
   - Combines graph constraints with vector similarity search.
   - Non-hallucinating transparent reasoning traces exposing exact evidence sources and applied symbolic rules.

5. **Automated AI Task Generation**:
   - Convert requirement specifications into structured epics, tasks, subtasks, priorities, and symbolic links.

6. **Interactive Kanban & Real-Time Collaboration**:
   - Drag-and-drop status workflows (`BACKLOG`, `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `BLOCKED`, `COMPLETED`).
   - Real-time channel chat with decision-to-fact conversion capabilities.

7. **GitHub Integration & Analytics**:
   - Linked repositories, live commit feeds, pull request sync, sprint velocity, and knowledge freshness metrics.

8. **Role-Based Access Control (RBAC)**:
   - Enforced user roles: `SUPER_ADMIN`, `TEAM_ADMIN`, `PROJECT_MANAGER`, `TEAM_MEMBER`.

---

## 📁 Repository Structure

```
mindwave/
├── apps/
│   ├── web/               # React + Vite + TypeScript + Tailwind CSS UI (Deploy on Vercel)
│   └── server/            # Express + TypeScript + Socket.IO + Prisma API (Deploy on Render)
├── packages/
│   ├── types/             # Shared TypeScript types & enums
│   └── config/            # Shared configuration definitions
├── prisma/
│   └── schema.prisma      # Full database schema (32 models)
├── docs/
│   ├── ARCHITECTURE.md    # System & Symbolic Architecture Details
│   ├── API.md             # REST API & WebSocket Event Specification
│   ├── SETUP.md           # Setup Instructions
│   └── DEPLOYMENT.md      # Vercel & Render Deployment Guide
├── vercel.json            # Vercel Frontend Deployment Config
├── render.yaml            # Render Backend Blueprint Config
├── docker-compose.yml     # Docker environment (PostgreSQL, Redis, Web, Server)
└── README.md
```

---

## 🛠️ Local Installation & Run

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Sky-ydv2008/mindwave.git
   cd mindwave
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build Monorepo Packages**:
   ```bash
   npm run build
   ```

4. **Run Applications**:
   ```bash
   npm run dev
   ```

5. **Access Application**:
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000/api/v1`

---

## 📜 License
Licensed under the [MIT License](LICENSE).
