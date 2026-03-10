import { Tool } from "@/data/mockData";
import { Link } from "react-router-dom";

// Deterministic gradient backgrounds based on tool id for visual variety
const gradients = [
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-600",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-cyan-400 to-sky-500",
  "from-fuchsia-400 to-purple-500",
  "from-lime-400 to-green-500",
  "from-orange-400 to-red-500",
  "from-indigo-400 to-blue-600",
  "from-teal-400 to-cyan-600",
  "from-pink-400 to-rose-500",
];

function getGradient(id: string) {
  const num = parseInt(id, 10) || id.charCodeAt(0);
  return gradients[num % gradients.length];
}

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export function ToolCard({ tool, compact }: ToolCardProps) {
  const gradient = getGradient(tool.id);

  if (compact) {
    return (
      <Link
        to={`/tools/${tool.slug}`}
        className="block rounded-xl bg-card border border-border/60 card-hover gradient-border cursor-pointer group relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
        <div className={`relative h-24 rounded-t-xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          <span className="text-4xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {tool.icon}
          </span>
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
        </div>
        <div className="relative p-3">
          <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
          <p className="text-[11px] text-body-desc mt-0.5 truncate">{tool.description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="block rounded-xl bg-card border border-border/60 card-hover gradient-border cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />

      {/* Visual preview area */}
      <div className={`relative h-32 rounded-t-xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300 select-none">
          {tool.icon}
        </span>
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative p-3.5">
        <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
        <p className="text-xs text-body-desc mt-1 line-clamp-1 leading-relaxed">{tool.description}</p>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-card-secondary text-body2 font-medium border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
