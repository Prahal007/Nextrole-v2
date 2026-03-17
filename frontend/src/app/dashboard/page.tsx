"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { listResumes, optimizeResume } from "@/lib/api";
import { usePollJob } from "@/hooks/usePollJob";
import { useExportPdf } from "@/hooks/useExportPdf";
import { Navbar } from "@/components/layout/Navbar";
import { DropZone } from "@/components/resume/DropZone";
import { AtsScore } from "@/components/resume/AtsScore";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import type { Resume, OptimizationJob } from "@/types";
import { FileText, Sparkles, ChevronDown, ChevronUp, Download } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selected, setSelected] = useState<Resume | null>(null);
  const [jd, setJd] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [expandedResult, setExpandedResult] = useState(false);
  const [error, setError] = useState("");

  const job = usePollJob(jobId);
  const { exportPdf } = useExportPdf();

  useEffect(() => {
    if (!getToken()) { router.push("/auth/login"); return; }
    listResumes().then(setResumes).catch(() => {});
  }, [router]);

  const handleUploaded = (resume: Resume) => {
    setResumes(prev => [resume, ...prev]);
    setSelected(resume);
  };

  const handleOptimize = async () => {
    if (!selected || !jd.trim()) return;
    setOptimizing(true); setError(""); setJobId(null);
    try {
      const data = await optimizeResume(selected.id, jd);
      setJobId(data.jobId);
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Optimization failed");
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Upload */}
        <section>
          <h2 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Upload Resume</h2>
          <DropZone onUploaded={handleUploaded} />
        </section>

        {/* Resume list */}
        {resumes.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Your Resumes</h2>
            <div className="flex flex-col gap-2">
              {resumes.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`glass flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    selected?.id === r.id ? "border-brand-500/50 bg-brand-600/5" : "hover:border-white/20"
                  }`}
                >
                  <FileText size={16} className="text-slate-500 shrink-0" />
                  <span className="text-sm text-white truncate flex-1">{r.filename}</span>
                  {selected?.id === r.id && (
                    <span className="text-xs text-brand-400 shrink-0">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Optimize */}
        {selected && (
          <section>
            <h2 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
              Optimize — {selected.filename}
            </h2>
            <div className="glass p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Job description</label>
                <textarea
                  value={jd}
                  onChange={e => setJd(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={6}
                  className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-brand-500 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition resize-none"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <Button onClick={handleOptimize} loading={optimizing} className="self-start gap-2">
                <Sparkles size={15} />
                Optimize resume
              </Button>
            </div>
          </section>
        )}

        {/* Job result */}
        {job && (
          <section>
            <div className="glass p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">Optimization result</span>
                  <StatusBadge status={job.status} />
                </div>
                {job.status === "COMPLETED" && job.result && selected && (
                  <Button variant="ghost" onClick={() => exportPdf(job, selected.filename)} className="gap-1.5">
                    <Download size={14} />
                    Download PDF
                  </Button>
                )}
              </div>
              {job.atsScore != null && <AtsScore score={job.atsScore} />}

              {job.status === "PROCESSING" && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  AI is analyzing your resume…
                </div>
              )}

              {job.status === "COMPLETED" && job.result && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-300">{job.result.summary}</p>

                  {job.result.missing_keywords?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-2">Missing keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {job.result.missing_keywords.map(kw => (
                          <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-red-900/20 text-red-400 border border-red-800/30">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.result.improvements?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-2">Improvements</p>
                      <ul className="flex flex-col gap-1.5">
                        {job.result.improvements.map((imp, i) => (
                          <li key={i} className="text-sm text-slate-300 flex gap-2">
                            <span className="text-brand-500 shrink-0">→</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <button
                      onClick={() => setExpandedResult(v => !v)}
                      className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300"
                    >
                      {expandedResult ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {expandedResult ? "Hide" : "Show"} optimized resume
                    </button>
                    {expandedResult && (
                      <pre className="mt-3 text-xs text-slate-300 bg-black/30 rounded-lg p-4 overflow-auto max-h-96 whitespace-pre-wrap">
                        {job.result.optimized_resume}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {job.status === "FAILED" && (
                <p className="text-sm text-red-400">Optimization failed. Please try again.</p>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
