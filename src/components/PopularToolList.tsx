import { Tool, recordRecentTool } from "@/data/mockData";
import { getDefaultCover } from "@/components/ToolCard";

interface PopularToolListProps {
  title: string;
  tools: Tool[];
}

function PopularToolCard({ tool }: { tool: Tool }) {
  const coverImg = tool.coverSquare || getDefaultCover(tool.id);

  const handleClick = () => {
    recordRecentTool(tool.id);
    if (tool.url) {
      window.location.href = tool.url;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 rounded-xl bg-card border border-border/60 p-3 card-hover gradient-border cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none z-10" />
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <img src={coverImg} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="relative flex-1 min-w-0">
        <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
        <p className="text-xs text-body-desc mt-1 line-clamp-2 leading-relaxed">{tool.description}</p>
      </div>
    </div>
  );
}

export function PopularToolList({ title, tools }: PopularToolListProps) {
  return (
    <section className="px-4 md:px-8 mb-10">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-glow-secondary" />
        <h2 className="text-base font-bold text-title">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <PopularToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
