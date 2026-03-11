import { useState, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { CategorySidebar } from "@/components/CategorySidebar";
import { MobileNav } from "@/components/MobileNav";
import { ToolCard } from "@/components/ToolCard";
import { Search, ArrowLeft } from "lucide-react";

const seoDescriptions: Record<string, { heading: string; paragraphs: string[] }> = {
  "ai-office": {
    heading: "AI 办公工具 — 让工作效率倍增",
    paragraphs: [
      "AI 办公工具利用人工智能技术，帮助用户自动化处理文档转换、会议纪要、数据分析等日常办公任务。无论是将 PDF 转换为可编辑文档，还是一键生成结构化摘要，这些工具都能大幅提升您的工作效率。",
      "Rita 精选了市面上最优质的 AI 办公助手，涵盖文档处理、翻译、日程管理、OCR 识别等多个场景，帮助您在繁忙的工作中节省宝贵时间。",
    ],
  },
  "ai-image": {
    heading: "AI 图像工具 — 释放视觉创造力",
    paragraphs: [
      "AI 图像工具为设计师、内容创作者和普通用户提供强大的图像生成与编辑能力。从文字生成绘画、智能抠图到风格迁移，AI 让专业级图像处理变得触手可及。",
      "无论您需要生成创意插画、修复老照片还是设计品牌 Logo，Rita 收录的 AI 图像工具都能帮您高效完成，无需专业设计技能。",
    ],
  },
  "ai-video": {
    heading: "AI 视频工具 — 高效视频内容创作",
    paragraphs: [
      "AI 视频工具正在改变内容创作的方式。从自动生成短视频、智能剪辑到多语言字幕生成，AI 帮助创作者以更低的门槛制作高质量视频内容。",
      "Rita 汇集了最前沿的 AI 视频工具，覆盖视频生成、增强、翻译和虚拟主播等场景，助力您的视频创作之旅。",
    ],
  },
  "ai-audio": {
    heading: "AI 音频工具 — 声音的无限可能",
    paragraphs: [
      "AI 音频工具涵盖配音、音乐生成、语音识别和音频降噪等功能，为播客主播、音乐人和内容创作者提供全方位的音频处理解决方案。",
      "从逼真的 AI 配音到个性化声音克隆，Rita 精选的音频工具帮助您轻松制作专业级音频内容。",
    ],
  },
  "ai-writing": {
    heading: "AI 写作工具 — 文字创作的智能伙伴",
    paragraphs: [
      "AI 写作工具利用大语言模型技术，辅助用户完成营销文案、学术论文、小说创作等多种写作任务。智能改写、SEO 优化和多语言支持让内容创作更加高效。",
      "无论是职场写作还是文学创作，Rita 收录的 AI 写作助手都能为您提供灵感和专业支持。",
    ],
  },
  "ai-code": {
    heading: "AI 编程工具 — 开发者的效率加速器",
    paragraphs: [
      "AI 编程工具帮助开发者自动生成代码、检测 Bug、编写测试用例和生成 API 文档。借助自然语言交互，即使是复杂的 SQL 查询和正则表达式也能轻松生成。",
      "Rita 汇集了最实用的 AI 编程助手，助力开发者提升编码效率和代码质量。",
    ],
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId]
  );

  const activeCategory = categoryId || categories[0].id;

  const handleCategoryClick = useCallback((id: string) => {
    // Navigate handled by Link in sidebar
  }, []);

  const filteredTools = useMemo(() => {
    if (!category) return [];
    if (!query.trim()) return category.tools;
    const q = query.toLowerCase();
    return category.tools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [category, query]);

  const seo = categoryId ? seoDescriptions[categoryId] : null;

  if (!category) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-title mb-2">分类未找到</h1>
          <Link to="/" className="text-primary hover:underline text-sm">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CategorySidebar
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <main className="flex-1 overflow-y-auto pb-12">
          {/* Search area */}
          <section className="relative px-4 md:px-8 pt-8 pb-6 hero-gradient overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-sm text-body2 hover:text-title transition-colors"
                >
                  <ArrowLeft size={16} />
                  首页
                </Link>
                <span className="text-border">/</span>
                <span className="text-sm font-medium text-title">{category.name}</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-title tracking-tight mb-6">
                {category.icon && <span className="mr-2">{categories.find(c => c.id === category.id)?.tools[0]?.icon}</span>}
                {category.name}
              </h1>

              <div className="relative max-w-lg group">
                <div className="absolute -inset-1 rounded-2xl blur-lg opacity-100"
                  style={{ background: 'linear-gradient(135deg, rgba(82,82,229,0.35), rgba(111,214,180,0.35))' }}
                />
                <div className="relative p-[1.5px] rounded-xl search-border-animate overflow-hidden">
                  <div className="relative rounded-[10px] bg-card/90 glass-card">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder={`在 ${category.name} 中搜索...`}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-[10px] bg-transparent text-title text-sm placeholder:text-body-desc focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools grid */}
          <section className="px-4 md:px-8 mt-8">
            <p className="text-sm text-body2 mb-5">
              共 <span className="font-semibold text-title">{filteredTools.length}</span> 款工具
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            {filteredTools.length === 0 && (
              <div className="text-center py-16 text-body-desc text-sm">
                未找到匹配的工具
              </div>
            )}
          </section>

          {/* SEO content */}
          {seo && (
            <section className="px-4 md:px-8 mt-16 mb-8 max-w-3xl">
              <div className="border-t border-border/50 pt-8">
                <h2 className="text-lg font-bold text-title mb-4">{seo.heading}</h2>
                {seo.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-body2 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
