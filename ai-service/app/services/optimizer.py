import json, os
from openai import AsyncOpenAI
from app.models.schemas import OptimizeResponse

client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

SYSTEM_PROMPT = (
    "You are an expert ATS resume optimizer. "
    "Given a resume and job description, score ATS compatibility, "
    "rewrite the resume for maximum keyword alignment, and provide improvements. "
    "Return ONLY valid JSON matching the schema provided."
)

class ResumeOptimizer:
    async def optimize(self, resume_text: str, job_description: str) -> OptimizeResponse:
        prompt = f"""Resume:\n{resume_text}\n\nJob Description:\n{job_description}\n\nReturn JSON:
{{
  "ats_score": <int 0-100>,
  "optimized_resume": "<rewritten resume>",
  "missing_keywords": ["<keyword>"],
  "improvements": ["<suggestion>"],
  "summary": "<2-sentence summary>"
}}"""
        resp = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.3
        )
        data = json.loads(resp.choices[0].message.content)
        return OptimizeResponse(**data)
