import { Category } from "@/data/mockData";
import { ToolCard } from "./ToolCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CategoryFloorProps {
  category: Category;
}

export function CategoryFloor({ category }: CategoryFloorProps) {
  const displayTools = category.tools.slice(0, 10);

  return (
    <section id={category.id} className="px-4 md:px-8 mb-10 scroll-mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-title">{category.name}</h2>
        <Link
          to={`/category/${category.id}`}
          className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          查看更多 <ChevronRight size={14} />
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
