"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { getToken } from "@/lib/auth";
import { listResumes, optimizeResume, uploadResume } from "@/lib/api";
import { usePollJob } from "@/hooks/usePollJob";
import { useExportPdf } from "@/hooks/useExportPdf";
import { AtsScore } from "@/components/resume/AtsScore";
import { StatusBadge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import type { Resume } from "@/types";
import { LogOut, Zap, Download, Sparkles, FileText, ChevronDown, ChevronUp } from "lucide-react";

const JOB_TYPES = ["General","Full Stack Engineer","Data Engineer","Backend Engineer","Frontend Engineer","DevOps Engineer","ML Engineer","Product Manager","Business Analyst"];

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selected, setSelected] = useState<Resume | null>(null);
  const [jd, setJd] = useState("");
  const [jobType, setJobType] = useState("General");
  const [targetRole, setTargetRole] = useState("");
  const [industry, setIndustry] = useState("");
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

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    try {
      const resume = await uploadResume(file);
      setResumes(prev => [resume, ...prev]);
      setSelected(resume);
    } catch {}
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "application/pdf": [".pdf"] }, maxFiles: 1
  });

  const handleOptimize = async () => {
    if (!selected) return;
    setOptimizing(true); setError(""); setJobId(null);
    const fullJd = [jobType !== "General" ? `Job Type: ${jobType}` : "", targetRole ? `Target Role: ${targetRole}` : "", industry ? `Industry: ${industry}` : "", jd].filter(Boolean).join("\n");
    try {
      const data = await optimizeResume(selected.id, fullJd || "General position");
      setJobId(data.jobId);
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Optimization failed");
    } finally { setOptimizing(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0a12",color:"#e2e8f0",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(10,10,18,0.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1000,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Zap size={18} color="#818cf8" />
            <span style={{fontWeight:700,fontSize:17,color:"#fff"}}>NextRole</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontSize:13,color:"#475569"}}>5 free optimizations/day</span>
            <button onClick={logout} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",padding:"6px 14px",borderRadius:8,fontSize:13,cursor:"pointer"}}>
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <main style={{maxWidth:1000,margin:"0 auto",padding:"48px 24px",display:"flex",flexDirection:"column",gap:32}}>
        <div>
          <h1 style={{fontWeight:800,fontSize:36,color:"#fff",margin:0}}>Optimize your resume</h1>
          <p style={{color:"#64748b",fontSize:15,marginTop:8}}>Upload your PDF and let AI supercharge it for your target role</p>
        </div>

        <div {...getRootProps()} style={{border:`2px dashed ${isDragActive?"#6366f1":"rgba(255,255,255,0.12)"}`,borderRadius:16,padding:"48px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:12,cursor:"pointer",background:isDragActive?"rgba(99,102,241,0.05)":"rgba(255,255,255,0.02)",transition:"all 0.2s"}}>
          <input {...getInputProps()} />
          <div style={{fontSize:40}}>📥</div>
          <p style={{fontSize:16,fontWeight:500,color:"#fff",margin:0}}>{isDragActive?"Drop it here!":"Drop your resume here"}</p>
          <p style={{fontSize:13,color:"#475569",margin:0}}>PDF only · Max 10MB · <span style={{color:"#6366f1"}}>or click to browse</span></p>
        </div>

        {resumes.length > 0 && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <p style={{fontSize:12,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",margin:0}}>Your resumes</p>
            {resumes.map(r => (
              <button key={r.id} onClick={() => setSelected(r)} style={{display:"flex",alignItems:"center",gap:12,background:selected?.id===r.id?"rgba(99,102,241,0.08)":"rgba(255,255,255,0.02)",border:`1px solid ${selected?.id===r.id?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",transition:"all 0.15s",textAlign:"left"}}>
                <FileText size={15} color="#475569" />
                <span style={{fontSize:14,color:"#e2e8f0",flex:1}}>{r.filename}</span>
                {selected?.id===r.id && <span style={{fontSize:12,color:"#818cf8"}}>Selected</span>}
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:28,display:"flex",flexDirection:"column",gap:20}}>
            <p style={{fontSize:14,fontWeight:600,color:"#fff",margin:0}}>🎯 Optimization target</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <label style={{fontSize:11,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em"}}>Job type</label>
                <select value={jobType} onChange={e=>setJobType(e.target.value)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 12px",color:"#e2e8f0",fontSize:14,outline:"none"}}>
                  {JOB_TYPES.map(t=><option key={t} value={t} style={{background:"#1a1a2e"}}>{t}</option>)}
                </select>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <label style={{fontSize:11,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em"}}>Target role</label>
                <input value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="e.g. Senior Engineer" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 12px",color:"#e2e8f0",fontSize:14,outline:"none"}} />
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <label style={{fontSize:11,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em"}}>Industry</label>
                <input value={industry} onChange={e=>setIndustry(e.target.value)} placeholder="e.g. Fintech" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 12px",color:"#e2e8f0",fontSize:14,outline:"none"}} />
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:11,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em"}}>Job description</label>
              <textarea value={jd} onChange={e=>setJd(e.target.value)} rows={6} placeholder="Paste the full job description here..." style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"12px",color:"#e2e8f0",fontSize:14,outline:"none",resize:"none",fontFamily:"inherit"}} />
            </div>
            {error && <p style={{fontSize:13,color:"#f87171",margin:0}}>{error}</p>}
            <button onClick={handleOptimize} disabled={optimizing} style={{alignSelf:"flex-start",display:"flex",alignItems:"center",gap:8,background:optimizing?"rgba(99,102,241,0.5)":"#6366f1",color:"#fff",border:"none",padding:"12px 24px",borderRadius:10,fontSize:14,fontWeight:500,cursor:optimizing?"not-allowed":"pointer"}}>
              <Sparkles size={15} />
              {optimizing?"Optimizing...":"Optimize resume"}
            </button>
          </div>
        )}

        {job && (
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:28,display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:15,fontWeight:600,color:"#fff"}}>Optimization result</span>
                <StatusBadge status={job.status} />
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {job.status==="COMPLETED" && job.result && selected && (
                  <button onClick={()=>exportPdf(job,selected.filename)} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.3)",color:"#818cf8",padding:"8px 16px",borderRadius:8,fontSize:13,cursor:"pointer"}}>
                    <Download size={13} /> Download PDF
                  </button>
                )}
                {job.atsScore!=null && <AtsScore score={job.atsScore} />}
              </div>
            </div>
            {job.status==="PROCESSING" && <p style={{fontSize:14,color:"#64748b",margin:0}}>AI is analyzing your resume…</p>}
            {job.status==="COMPLETED" && job.result && (
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.6,margin:0}}>{job.result.summary}</p>
                {job.result.missing_keywords?.length>0 && (
                  <div>
                    <p style={{fontSize:12,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Missing keywords</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                      {job.result.missing_keywords.map(kw=>(
                        <span key={kw} style={{fontSize:12,padding:"4px 10px",borderRadius:100,background:"rgba(248,113,113,0.1)",color:"#f87171",border:"1px solid rgba(248,113,113,0.2)"}}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
                {job.result.improvements?.length>0 && (
                  <div>
                    <p style={{fontSize:12,fontWeight:500,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Improvements</p>
                    <ul style={{display:"flex",flexDirection:"column",gap:8,paddingLeft:0,margin:0,listStyle:"none"}}>
                      {job.result.improvements.map((imp,i)=>(
                        <li key={i} style={{display:"flex",gap:8,fontSize:14,color:"#94a3b8"}}>
                          <span style={{color:"#6366f1",flexShrink:0}}>→</span>{imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <button onClick={()=>setExpandedResult(v=>!v)} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"none",color:"#6366f1",fontSize:13,cursor:"pointer",padding:0}}>
                    {expandedResult?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
                    {expandedResult?"Hide":"Show"} optimized resume
                  </button>
                  {expandedResult && (
                    <pre style={{marginTop:12,fontSize:12,color:"#94a3b8",background:"rgba(0,0,0,0.3)",borderRadius:10,padding:16,overflow:"auto",maxHeight:400,whiteSpace:"pre-wrap"}}>
                      {job.result.optimized_resume}
                    </pre>
                  )}
                </div>
              </div>
            )}
            {job.status==="FAILED" && <p style={{fontSize:14,color:"#f87171",margin:0}}>Optimization failed. Please try again.</p>}
          </div>
        )}
      </main>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap'); input::placeholder,textarea::placeholder{color:#334155;}`}</style>
    </div>
  );
}