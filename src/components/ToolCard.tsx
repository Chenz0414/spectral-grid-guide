import { Tool } from "@/data/mockData";
import { Link } from "react-router-dom";

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export function ToolCard({ tool, compact }: ToolCardProps) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className={`block rounded-xl bg-card border border-border/60 card-hover gradient-border cursor-pointer group relative overflow-hidden ${
        compact ? "p-3" : "p-4"
      }`}
    >
      {/* Subtle shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />

      <div className="relative flex items-start gap-3">
        <div className="text-2xl shrink-0 w-10 h-10 rounded-lg bg-card-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {tool.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-title truncate ${compact ? "text-sm" : "text-sm"}`}>
            {tool.title}
          </h3>
          {!compact && (
            <p className="text-xs text-body-desc mt-1 line-clamp-2 leading-relaxed">{tool.description}</p>
          )}
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
      </div>
    </Link>
  );
}
