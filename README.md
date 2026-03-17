# NextRole — AI Resume Optimizer

Monorepo layout:
- `frontend/`  — Next.js 14 (App Router)
- `backend/`   — Spring Boot 3 REST API
- `ai-service/`— FastAPI Python microservice (GPT-4o integration)
- `database/`  — SQL migrations (Flyway)
- `infra/`     — Railway config / docker-compose

## Local dev
```bash
docker-compose up          # starts all services
```

## Services
| Service     | Port | Notes                      |
|-------------|------|----------------------------|
| frontend    | 3000 | Next.js                    |
| backend     | 8080 | Spring Boot                |
| ai-service  | 8000 | FastAPI                    |
| postgres    | 5432 | Railway managed in prod    |
| redis       | 6379 | Railway managed in prod    |
