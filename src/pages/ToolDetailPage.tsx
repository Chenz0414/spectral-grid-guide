import { useParams, Link, useNavigate } from "react-router-dom";
import { getToolsByCategory, recordRecentTool, isToolEnabled } from "@/data/mockData";
import { getDefaultCover } from "@/components/ToolCard";
import { ToolCard } from "@/components/ToolCard";
import { useTools, useCategories } from "@/hooks/useData";
import { ArrowLeft, ExternalLink, Star, Users, Zap, Clock, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const toolDetails: Record<string, {
  rating: number;
  users: string;
  features: string[];
  highlights: { icon: string; title: string; desc: string }[];
}> = {
  "11": {
    rating: 4.8,
    users: "128万+",
    features: [
      "支持文生图、图生图多种模式",
      "200+ 预设艺术风格模板",
      "高清 4K 分辨率输出",
      "批量生成与历史记录管理",
      "支持负向提示词精准控制",
      "ControlNet 姿态与构图引导",
    ],
    highlights: [
      { icon: "Zap", title: "极速生成", desc: "平均 3 秒出图，GPU 集群加速" },
      { icon: "Shield", title: "版权安全", desc: "内置内容审核，商用授权清晰" },
      { icon: "Sparkles", title: "风格丰富", desc: "涵盖写实、动漫、水彩等 200+ 风格" },
      { icon: "Users", title: "社区活跃", desc: "百万创作者分享 prompt 与作品" },
    ],
  },
};

const iconMap: Record<string, React.ElementType> = { Zap, Shield, Sparkles, Users };

function getDetail(id: string) {
  return toolDetails[id] || {
    rating: 4.5,
    users: "10万+",
    features: [
      "AI 驱动的智能处理",
      "多种输出格式支持",
      "云端存储与同步",
      "团队协作功能",
    ],
    highlights: [
      { icon: "Zap", title: "高效处理", desc: "AI 算法加速，秒级响应" },
      { icon: "Shield", title: "安全可靠", desc: "数据加密传输与存储" },
      { icon: "Sparkles", title: "智能优化", desc: "持续学习，越用越好" },
      { icon: "Users", title: "广泛使用", desc: "服务全球数百万用户" },
    ],
  };
}

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tools = useTools();
  const categories = useCategories();
  const tool = tools.find((t) => t.slug === slug);

  useEffect(() => {
    if (tool && isToolEnabled(tool)) recordRecentTool(tool.id);
  }, [tool]);

  if (!tool || !isToolEnabled(tool)) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">未找到该工具</p>
          <Button variant="outline" onClick={() => navigate("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  const detail = getDetail(tool.id);
  const coverImg = tool.coverLandscape || getDefaultCover(tool.id);
  const toolCategories = categories.filter((c) => tool.categoryIds.includes(c.id));
  const relatedTools = tool.categoryIds.length > 0
    ? getToolsByCategory(tool.categoryIds[0]).filter((t) => t.id !== tool.id && isToolEnabled(t)).slice(0, 5)
    : [];

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 px-4 md:px-8 pt-5 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-body2 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
        </div>

        <div className="relative z-10 px-4 md:px-8 pt-6 pb-12 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-[420px] shrink-0 rounded-2xl overflow-hidden border border-border/60 glow-sm">
              <div className="relative aspect-[16/10]">
                <img src={coverImg} alt={tool.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-3 flex-wrap">
                {toolCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{tool.icon}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-title">{tool.title}</h1>
              </div>

              <p className="text-body2 text-sm md:text-base leading-relaxed mb-5 max-w-xl">
                {tool.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="text-primary fill-primary" />
                  <span className="text-sm font-semibold text-title">{detail.rating}</span>
                  <span className="text-xs text-body-desc">评分</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-primary" />
                  <span className="text-sm font-semibold text-title">{detail.users}</span>
                  <span className="text-xs text-body-desc">用户</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-muted-foreground" />
                  <span className="text-xs text-body-desc">更新于 3 天前</span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-6">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium border border-border/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {}}
                  className="gap-2 px-6 rounded-xl"
                >
                  <ExternalLink size={15} />
                  立即使用
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 px-6 rounded-xl"
                  onClick={() => {
                    navigator.clipboard?.writeText(tool.url || window.location.href);
                  }}
                >
                  分享工具
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <section className="mb-12">
          <h2 className="text-lg font-bold text-title mb-5 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-glow-secondary" />
            核心亮点
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || Zap;
              return (
                <div key={i} className="group relative rounded-xl border border-border/60 bg-card p-5 gradient-border card-hover overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-title text-sm mb-1">{h.title}</h3>
                    <p className="text-xs text-body-desc leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-title mb-5 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-glow-secondary" />
            功能特性
          </h2>
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden divide-y divide-border/40">
            {detail.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4 hover:bg-accent/50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles size={12} className="text-primary" />
                </div>
                <span className="text-sm text-foreground">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {relatedTools.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-title mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-glow-secondary" />
              同类推荐
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {relatedTools.map((t) => (
                <Link key={t.id} to={t.url}>
                  <ToolCard tool={t} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
