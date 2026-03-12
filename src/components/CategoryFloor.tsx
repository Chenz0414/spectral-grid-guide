import { CategoryWithTools } from "@/data/mockData";
import { ToolCard } from "./ToolCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryFloorProps {
  category: CategoryWithTools;
}

export function CategoryFloor({ category }: CategoryFloorProps) {
  const displayTools = category.tools.slice(0, 10);

  return (
    <section id={category.id} className="px-4 md:px-8 mb-12 scroll-mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-glow-secondary" />
          <h2 className="text-base font-bold text-title">{category.name}</h2>
        </div>
        <Link
          to={`/category/${category.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
        >
          查看更多
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
