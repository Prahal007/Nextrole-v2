"use client";
import { useState, useEffect, useRef } from "react";
import { getJobStatus } from "@/lib/api";
import type { OptimizationJob } from "@/types";

export function usePollJob(jobId: string | null) {
  const [job, setJob] = useState<OptimizationJob | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!jobId) return;
    const poll = async () => {
      try {
        const data = await getJobStatus(jobId);
        setJob(data);
        if (data.status === "COMPLETED" || data.status === "FAILED") {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch {}
    };
    poll();
    intervalRef.current = setInterval(poll, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [jobId]);

  return job;
}
