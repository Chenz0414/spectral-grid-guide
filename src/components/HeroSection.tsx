import { Search } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative px-4 md:px-8 pt-10 pb-8 md:pt-16 md:pb-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-title tracking-tight mb-3">
          探索最佳 <span className="gradient-text">AI 工具</span>
        </h1>
        <p className="text-body2 text-sm md:text-base mb-8 leading-relaxed">
          Rita 为你精选数百款优质 AI 工具，助力工作效率提升
        </p>
        <div className="relative max-w-lg mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-body-desc" />
          <input
            type="text"
            placeholder="搜索 AI 工具..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-card-secondary border border-border text-title text-sm placeholder:text-body-desc focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
        </div>
      </div>
    </section>
  );
}
