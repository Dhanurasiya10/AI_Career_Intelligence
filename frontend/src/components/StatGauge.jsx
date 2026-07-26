import React from 'react';

export default function StatGauge({ score, label, subtext, color = "blue", size = "md" }) {
  const colorMap = {
    blue: "stroke-blue-500 text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "stroke-emerald-500 text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    purple: "stroke-purple-500 text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "stroke-amber-500 text-amber-400 bg-amber-500/10 border-amber-500/20",
    rose: "stroke-rose-500 text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  const strokeColor = colorMap[color]?.split(" ")[0] || "stroke-blue-500";
  const textColor = colorMap[color]?.split(" ")[1] || "text-blue-400";
  const badgeClass = colorMap[color]?.split(" ").slice(2).join(" ") || "bg-blue-500/10 border-blue-500/20";

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center p-3">
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`${strokeColor} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-xl font-black ${textColor}`}>{score}%</span>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-200">{label}</p>
      {subtext && <p className="text-[10px] text-slate-400 mt-0.5">{subtext}</p>}
    </div>
  );
}
