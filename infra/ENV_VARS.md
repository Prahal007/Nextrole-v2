# Railway Environment Variables

## Shared secrets (set in Railway project variables)
| Variable       | Description                        |
|----------------|------------------------------------|
| JWT_SECRET     | Min 32-char random string          |
| OPENAI_API_KEY | Your OpenAI API key                |

## Backend service (auto-wired from Railway)
| Variable                | Source                          |
|-------------------------|---------------------------------|
| SPRING_DATASOURCE_URL   | Postgres plugin — DATABASE_URL  |
| SPRING_DATASOURCE_USERNAME | Postgres plugin — PGUSER     |
| SPRING_DATASOURCE_PASSWORD | Postgres plugin — PGPASSWORD |
| REDIS_HOST              | Redis plugin — REDIS_HOST       |
| REDIS_PORT              | Redis plugin — REDIS_PORT       |
| AI_SERVICE_URL          | ai-service private URL          |

## Frontend service (build arg, baked in at build time)
| Variable              | Source                            |
|-----------------------|-----------------------------------|
| NEXT_PUBLIC_API_URL   | backend service public URL        |

## Generate JWT_SECRET
```bash
openssl rand -base64 48
```
