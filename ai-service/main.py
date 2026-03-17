from app.routers import optimize
from fastapi import FastAPI

app = FastAPI(title="NextRole AI Service", version="1.0.0")
app.include_router(optimize.router)

@app.get("/health")
async def health():
    return {"status": "ok"}
