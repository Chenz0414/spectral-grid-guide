import { Tool } from "@/data/mockData";
import { ToolCard } from "./ToolCard";
import { ChevronRight } from "lucide-react";

interface HorizontalToolListProps {
  title: string;
  tools: Tool[];
}

export function HorizontalToolList({ title, tools }: HorizontalToolListProps) {
  return (
    <section className="px-4 md:px-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-title">{title}</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {tools.map((tool) => (
          <div key={tool.id} className="min-w-[180px] md:min-w-[220px] shrink-0">
            <ToolCard tool={tool} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
