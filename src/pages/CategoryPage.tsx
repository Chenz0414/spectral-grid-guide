import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { CategorySidebar } from "@/components/CategorySidebar";
import { MobileNav } from "@/components/MobileNav";
import { HeroSection } from "@/components/HeroSection";
import { ToolCard } from "@/components/ToolCard";
import { ArrowLeft } from "lucide-react";

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

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId]
  );

  const activeCategory = categoryId || categories[0].id;

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
        onCategoryClick={() => {}}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav activeCategory={activeCategory} onCategoryClick={() => {}} />
        <main className="flex-1 overflow-y-auto pb-12">
          <HeroSection />

          {/* Tools grid */}
          <section className="px-4 md:px-8 mt-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-body2 mb-4">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-title transition-colors">
                <ArrowLeft size={14} />
                首页
              </Link>
              <span className="text-border">/</span>
              <span className="font-medium text-title">{category.name}</span>
            </div>

            <p className="text-sm text-body2 mb-5">
              共 <span className="font-semibold text-title">{category.tools.length}</span> 款工具
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
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
