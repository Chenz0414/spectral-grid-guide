import { Tool } from "@/data/mockData";
import { Link } from "react-router-dom";

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

const covers = [cover01, cover02, cover03, cover04, cover05, cover06, cover07, cover08, cover09, cover10];

function getCover(id: string) {
  const num = parseInt(id, 10) || id.charCodeAt(0);
  return covers[num % covers.length];
}

interface PopularToolListProps {
  title: string;
  tools: Tool[];
}

function PopularToolCard({ tool }: { tool: Tool }) {
  const coverImg = getCover(tool.id);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="flex items-center gap-4 rounded-xl bg-card border border-border/60 p-3 card-hover gradient-border cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none z-10" />
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <img
          src={coverImg}
          alt={tool.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="relative flex-1 min-w-0">
        <h3 className="font-semibold text-title text-sm truncate">{tool.title}</h3>
        <p className="text-xs text-body-desc mt-1 line-clamp-2 leading-relaxed">{tool.description}</p>
      </div>
    </Link>
  );
}

export function PopularToolList({ title, tools }: PopularToolListProps) {
  return (
    <section className="px-4 md:px-8 mb-10">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-[#6FD6B4]" />
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
