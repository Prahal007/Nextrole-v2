"use client";
interface Props { score: number }

export function AtsScore({ score }: Props) {
  const color = score >= 80 ? "#4ade80" : score >= 60 ? "#facc15" : "#f87171";
  const pct = score / 100;
  const r = 40; const circ = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fill={color} fontSize="20" fontWeight="600">
          {score}
        </text>
      </svg>
      <p className="text-xs text-slate-500">ATS Score</p>
    </div>
  );
}
