# Mindweave REST & WebSocket API Specification

Base Path: `/api/v1`

## Endpoints

### Auth
- `POST /auth/register` — Create user account
- `POST /auth/login` — Authenticate and receive JWT tokens
- `GET /auth/me` — Retrieve current authenticated user profile
- `POST /auth/logout` — Revoke access session

### Projects & Tasks
- `GET /projects` — List project workspaces
- `GET /tasks` — Filter tasks by project or status
- `POST /tasks` — Create task work item
- `PUT /tasks/:id` — Update task status/assignee/priority

### Knowledge Graph & Rules
- `GET /knowledge/entities` — Retrieve symbolic entities
- `GET /knowledge/graph` — Retrieve nodes & edges for graph visualization
- `GET /knowledge/rules/evaluate` — Run symbolic rule evaluator
- `GET /knowledge/traceability` — Fetch Requirements Traceability Matrix

### AI Manager
- `POST /ai/chat` — Execute hybrid symbolic + RAG query
- `POST /ai/generate-tasks` — Convert requirement text into tasks
- `GET /ai/analyze-project` — Run automated health analysis
