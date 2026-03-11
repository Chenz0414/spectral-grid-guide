import { Tool, recordRecentTool } from "@/data/mockData";

import cover01 from "@/assets/tool-covers/cover-01.jpg";
import cover02 from "@/assets/tool-covers/cover-02.jpg";
import cover03 from "@/assets/tool-covers/cover-03.jpg";
import cover04 from "@/assets/tool-covers/cover-04.jpg";
import cover05 from "@/assets/tool-covers/cover-05.jpg";
import cover06 from "@/assets/tool-covers/cover-06.jpg";
import cover07 from "@/assets/tool-covers/cover-07.jpg";
import cover08 from "@/assets/tool-covers/cover-08.jpg";
import cover09 from "@/assets/tool-covers/cover-09.jpg";
import cover10 from "@/assets/tool-covers/cover-10.jpg";

export const covers = [cover01, cover02, cover03, cover04, cover05, cover06, cover07, cover08, cover09, cover10];

export function getDefaultCover(id: string) {
  const num = parseInt(id, 10) || id.charCodeAt(0);
  return covers[num % covers.length];
}

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export function ToolCard({ tool, compact }: ToolCardProps) {
  // Use uploaded cover if available, otherwise fallback to default
  const coverImg = tool.coverLandscape || getDefaultCover(tool.id);

  const handleClick = () => {
    recordRecentTool(tool.id);
    if (tool.url) {
      window.open(tool.url, "_blank", "noopener,noreferrer");
    }
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className="block rounded-xl bg-card border border-border/60 card-hover gradient-border cursor-pointer group relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none z-10" />
        <div className="relative h-28 rounded-t-xl overflow-hidden">
          <img src={coverImg} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="relative p-3">
          <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
          <p className="text-[11px] text-body-desc mt-0.5 truncate">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="block rounded-xl bg-card border border-border/60 card-hover gradient-border cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none z-10" />
      <div className="relative h-36 rounded-t-xl overflow-hidden">
        <img src={coverImg} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="relative p-3.5">
        <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
        <p className="text-xs text-body-desc mt-1 line-clamp-1 leading-relaxed">{tool.description}</p>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-card-secondary text-body2 font-medium border border-border/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
