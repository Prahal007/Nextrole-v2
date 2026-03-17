export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
}

export interface Resume {
  id: string;
  filename: string;
  createdAt: string;
}

export interface OptimizationJob {
  jobId: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  atsScore: number | null;
  result: {
    optimized_resume: string;
    missing_keywords: string[];
    improvements: string[];
    summary: string;
    ats_score: number;
  } | null;
}
