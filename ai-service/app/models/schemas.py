from pydantic import BaseModel

class OptimizeRequest(BaseModel):
    resume_text: str
    job_description: str

class OptimizeResponse(BaseModel):
    ats_score: int
    optimized_resume: str
    missing_keywords: list[str]
    improvements: list[str]
    summary: str
