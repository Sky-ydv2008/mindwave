# Mindweave Architecture & Symbolic Knowledge Layer

## System Overview
Mindweave combines REST APIs, Socket.IO WebSockets, a Prisma/PostgreSQL storage layer, and an explicit **Symbolic Reasoning Engine**.

```
                       ┌─────────────────────────┐
                       │  React + Vite Web App   │
                       └────────────┬────────────┘
                                    │ REST / Socket.IO
                       ┌────────────▼────────────┐
                       │   Express API Server    │
                       └─────┬─────────────┬─────┘
                             │             │
              ┌──────────────▼───┐     ┌───▼──────────────┐
              │ Symbolic Engine  │     │ Hybrid RAG Engine│
              └──────────────┬───┘     └───┬──────────────┘
                             │             │
                       ┌─────▼─────────────▼─────┐
                       │ PostgreSQL + pgvector   │
                       └─────────────────────────┘
```

## Symbolic Graph Pipeline
1. **Entities**: Explicit nodes (`REQUIREMENT`, `FEATURE`, `TASK`, `PULL_REQUEST`, `DOCUMENT`, `PERSON`).
2. **Relations**: Directional edges (`IMPLEMENTED_BY`, `BROKEN_INTO`, `ASSIGNED_TO`, `DEPENDS_ON`, `EVIDENCE_FOR`).
3. **Rule Evaluation**: Deterministic checks evaluate graph state (e.g. flagging blocked tasks or uncovered requirements).
4. **Hybrid Retrieval**: Queries check permissions -> run symbolic lookup -> query vector embeddings -> assemble verifiable evidence trace.
