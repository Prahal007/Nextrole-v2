"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { value: "10k+", label: "Resumes optimized" },
  { value: "94%", label: "ATS pass rate" },
  { value: "3x", label: "More interviews" },
  { value: "30s", label: "Average time" },
];

const steps = [
  { n: "01", title: "Upload your resume", desc: "Drop your PDF and we extract every detail automatically." },
  { n: "02", title: "Paste the job description", desc: "Copy the job posting — any format, any length." },
  { n: "03", title: "Get your optimized resume", desc: "AI rewrites your resume with the exact keywords recruiters search for." },
];

const features = [
  { icon: "⚡", title: "Instant ATS Score", desc: "See exactly how well your resume matches before applying." },
  { icon: "🎯", title: "Keyword Matching", desc: "GPT-4o identifies every missing keyword and injects them naturally." },
  { icon: "📄", title: "PDF Export", desc: "Download your optimized resume as a clean, recruiter-ready PDF." },
  { icon: "🔒", title: "Private & Secure", desc: "Your data is encrypted and never shared with third parties." },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty("--mx", `${x}px`);
      heroRef.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="landing-root">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <span className="nav-logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L4 7v8l7 5 7-5V7L11 2z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M11 2v18M4 7l7 4 7-4" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            NextRole
          </span>
          <div className="nav-actions">
            <Link href="/auth/login" className="btn-ghost">Sign in</Link>
            <Link href="/auth/register" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="grid-lines" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">✦ AI-powered resume optimization</div>
          <h1 className="hero-title">
            Your Resume,<br />
            <span className="gradient-text">Supercharged by AI</span>
          </h1>
          <p className="hero-sub">
            Upload your PDF. Our AI rewrites your resume, boosts your ATS score,<br />
            and suggests the exact keywords recruiters search for.
          </p>
          <div className="hero-cta">
            <Link href="/auth/register" className="btn-primary btn-lg">Optimize my resume →</Link>
            <Link href="#how" className="btn-ghost btn-lg">See how it works</Link>
          </div>
          <p className="hero-note">Free · No credit card required · 5 optimizations/day</p>
        </div>
        <div className="stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how">
        <div className="section-inner">
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-title">Three steps to your dream job</h2>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-dark">
        <div className="section-inner">
          <p className="section-eyebrow">Features</p>
          <h2 className="section-title">Everything you need to get hired</h2>
          <div className="features">
            {features.map((f) => (
              <div key={f.title} className="feature">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to land more interviews?</h2>
          <p className="cta-sub">Join thousands of job seekers who optimized their resume with NextRole.</p>
          <Link href="/auth/register" className="btn-primary btn-lg">Start for free →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="nav-logo">
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L4 7v8l7 5 7-5V7L11 2z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M11 2v18M4 7l7 4 7-4" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          NextRole
        </span>
        <span className="footer-copy">© 2026 NextRole. Built with AI.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .landing-root { min-height: 100vh; background: #07070f; color: #e2e8f0; font-family: 'DM Sans', sans-serif; }
        .landing-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(7,7,15,0.8); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 8px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .btn-primary { background: #6366f1; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: #4f46e5; transform: translateY(-1px); }
        .btn-primary.btn-lg { padding: 14px 28px; font-size: 15px; border-radius: 10px; }
        .btn-ghost { background: transparent; color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 400; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
        .btn-ghost.btn-lg { padding: 14px 28px; font-size: 15px; border-radius: 10px; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 24px 60px; position: relative; overflow: hidden; --mx: 0px; --my: 0px; }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; }
        .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, #6366f1, transparent 70%); top: -100px; left: -100px; transform: translate(var(--mx), var(--my)); transition: transform 0.3s ease; }
        .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, #8b5cf6, transparent 70%); bottom: -100px; right: -100px; transform: translate(calc(var(--mx) * -1), calc(var(--my) * -1)); transition: transform 0.3s ease; }
        .grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-content { position: relative; text-align: center; max-width: 800px; display: flex; flex-direction: column; align-items: center; gap: 24px; animation: fadeUp 0.8s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; padding: 6px 16px; border-radius: 100px; font-size: 13px; }
        .hero-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(42px, 7vw, 80px); line-height: 1.05; color: #fff; margin: 0; }
        .gradient-text { background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-size: 18px; color: #94a3b8; line-height: 1.6; margin: 0; font-weight: 300; }
        .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .hero-note { font-size: 12px; color: #475569; }
        .stats-bar { position: relative; margin-top: 60px; display: flex; gap: 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; animation: fadeUp 0.8s 0.3s ease both; }
        .stat { display: flex; flex-direction: column; align-items: center; padding: 24px 48px; gap: 4px; border-right: 1px solid rgba(255,255,255,0.07); }
        .stat:last-child { border-right: none; }
        .stat-value { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 28px; color: #fff; }
        .stat-label { font-size: 12px; color: #64748b; }
        .section { padding: 100px 24px; }
        .section-dark { background: rgba(255,255,255,0.02); }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #6366f1; margin-bottom: 12px; }
        .section-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: clamp(28px, 4vw, 42px); color: #fff; margin: 0 0 48px; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .step { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 32px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s, transform 0.2s; }
        .step:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-4px); }
        .step-n { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 36px; color: rgba(99,102,241,0.3); }
        .step-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 18px; color: #fff; }
        .step-desc { font-size: 14px; color: #64748b; line-height: 1.6; }
        .features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .feature { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s; }
        .feature:hover { border-color: rgba(99,102,241,0.4); }
        .feature-icon { font-size: 28px; }
        .feature-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 16px; color: #fff; }
        .feature-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        .cta-section { text-align: center; }
        .cta-inner { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .cta-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(28px, 4vw, 42px); color: #fff; margin: 0; }
        .cta-sub { font-size: 16px; color: #64748b; margin: 0; }
        .footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 24px; display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; }
        .footer-copy { font-size: 13px; color: #334155; }
      `}</style>
    </div>
  );
}
