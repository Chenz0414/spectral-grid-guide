import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useCategories, useTools } from "@/hooks/useData";
import { HeroSection } from "@/components/HeroSection";
import { ToolCard } from "@/components/ToolCard";
import { isToolEnabled } from "@/data/mockData";

const categoryMeta: Record<string, { title: string; description: string; seoHeading: string; seoParagraphs: string[] }> = {
  "ai-office": {
    title: "AI 办公工具",
    description: "Rita 精选了市面上最常用好用的 AI 办公工具和平台，涵盖文档处理、翻译、日程管理、OCR 识别等多个场景，帮助打工人提高 90% 的办公效率。",
    seoHeading: "AI 办公工具 — 让工作效率倍增",
    seoParagraphs: [
      "AI 办公工具利用人工智能技术，帮助用户自动化处理文档转换、会议纪要、数据分析等日常办公任务。",
      "Rita 精选了市面上最优质的 AI 办公助手，涵盖文档处理、翻译、日程管理、OCR 识别等多个场景。",
    ],
  },
  "ai-image": {
    title: "AI 图像工具",
    description: "AI 工具箱汇聚了全球最常用好用的 AI 图像工具和平台。",
    seoHeading: "AI 图像工具 — 释放视觉创造力",
    seoParagraphs: ["AI 图像工具为设计师、内容创作者和普通用户提供强大的图像生成与编辑能力。"],
  },
  "ai-video": {
    title: "AI 视频工具",
    description: "Rita 汇集了最前沿的 AI 视频工具。",
    seoHeading: "AI 视频工具 — 高效视频内容创作",
    seoParagraphs: ["AI 视频工具正在改变内容创作的方式。"],
  },
  "ai-audio": {
    title: "AI 音频工具",
    description: "Rita 精选的 AI 音频工具涵盖配音、音乐生成、语音识别和音频降噪等功能。",
    seoHeading: "AI 音频工具 — 声音的无限可能",
    seoParagraphs: ["AI 音频工具涵盖配音、音乐生成、语音识别和音频降噪等功能。"],
  },
  "ai-writing": {
    title: "AI 写作工具",
    description: "AI 写作工具利用大语言模型技术辅助用户完成多种写作任务。",
    seoHeading: "AI 写作工具 — 文字创作的智能伙伴",
    seoParagraphs: ["AI 写作工具利用大语言模型技术辅助用户完成多种写作任务。"],
  },
  "ai-code": {
    title: "AI 编程工具",
    description: "Rita 汇集了最实用的 AI 编程助手。",
    seoHeading: "AI 编程工具 — 开发者的效率加速器",
    seoParagraphs: ["AI 编程工具帮助开发者自动生成代码、检测 Bug。"],
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categories = useCategories();
  const tools = useTools();

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId, categories]
  );

  const categoryTools = useMemo(
    () =>
      categoryId
        ? tools.filter((tool) => tool.categoryIds.includes(categoryId) && isToolEnabled(tool))
        : [],
    [categoryId, tools]
  );

  const meta = categoryId ? categoryMeta[categoryId] : null;

  if (!category) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-title mb-2">分类未找到</h1>
          <Link to="/" className="text-primary hover:underline text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <section className="px-4 md:px-8 mt-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-title tracking-tight mb-3">
          {meta?.title || category.name}
        </h1>
        {meta && (
          <p className="text-sm md:text-base text-body2 leading-relaxed mb-8">{meta.description}</p>
        )}
      </section>
      <section className="px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
      {meta && (
        <section className="px-4 md:px-8 mt-16 mb-8 max-w-3xl">
          <div className="border-t border-border/50 pt-8">
            <h2 className="text-lg font-bold text-title mb-4">{meta.seoHeading}</h2>
            {meta.seoParagraphs.map((p, i) => (
              <p key={i} className="text-sm text-body2 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CategoryPage;
