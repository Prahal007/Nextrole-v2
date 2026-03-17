from fastapi import APIRouter, HTTPException
from app.models.schemas import OptimizeRequest, OptimizeResponse
from app.services.optimizer import ResumeOptimizer

router = APIRouter(prefix="/optimize", tags=["optimize"])
optimizer = ResumeOptimizer()

@router.post("", response_model=OptimizeResponse)
async def optimize_resume(req: OptimizeRequest):
    try:
        return await optimizer.optimize(req.resume_text, req.job_description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
