import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "lucide-react";
import {
  Tool,
  Category,
  CoverType,
  getTools,
  getCategories,
  getPopularIds,
  addTool,
  updateTool,
  deleteTool,
  addCategory,
  updateCategory,
  deleteCategory,
  savePopularIds,
  resetToDefaults,
} from "@/data/mockData";
import { useTools, useCategories, usePopularIds } from "@/hooks/useData";
import { ArrowLeft, Plus, Pencil, Trash2, Star, StarOff, RotateCcw, X, ExternalLink, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// ─── Tool Form Dialog ───

interface ToolFormProps {
  tool?: Tool;
  onSave: (tool: Tool) => void;
  onCancel: () => void;
  categories: Category[];
}

function ToolForm({ tool, onSave, onCancel, categories }: ToolFormProps) {
  const isEdit = !!tool;
  const [form, setForm] = useState<Tool>(
    tool || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      icon: "🛠️",
      tags: [],
      slug: "",
      url: "",
      coverType: "landscape" as CoverType,
      categoryIds: [],
      coverLandscape: "",
      coverSquare: "",
    }
  );
  const [tagInput, setTagInput] = useState(tool?.tags.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("请填写工具名称"); return; }
    if (!form.url.trim()) { toast.error("请填写跳转 URL"); return; }
    if (form.categoryIds.length === 0) { toast.error("请至少选择一个分类"); return; }
    if (!form.coverLandscape) { toast.error("请上传长图封面"); return; }
    if (!form.coverSquare) { toast.error("请上传方图封面"); return; }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const tags = tagInput.split(/[,，]/).map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, slug, tags });
  };

  const toggleCategory = (catId: string) => {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  const handleImageUpload = (field: "coverLandscape" | "coverSquare") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("请选择图片文件"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("图片大小不能超过 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-card border border-border/60 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-title">{isEdit ? "编辑工具" : "新建工具"}</h2>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer"><X size={18} className="text-body2" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
            <label className="text-sm text-body2">图标</label>
            <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="emoji" className="w-20" />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">名称 *</label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="工具名称" />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">描述</label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="工具描述" rows={2} />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">跳转 URL *</label>
            <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">Slug</label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="自动生成" />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">标签（逗号分隔）</label>
            <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="标签1, 标签2" />
          </div>
          {/* Cover image uploads */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-body2 mb-1 block">长图封面 *</label>
              <label className="block cursor-pointer">
                {form.coverLandscape ? (
                  <div className="relative group rounded-lg overflow-hidden border border-border/60">
                    <img src={form.coverLandscape} alt="长图预览" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                      点击更换
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs text-body-desc hover:border-primary hover:text-primary transition-colors">
                    16:9 长图
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload("coverLandscape")} />
              </label>
            </div>
            <div>
              <label className="text-sm text-body2 mb-1 block">方图封面 *</label>
              <label className="block cursor-pointer">
                {form.coverSquare ? (
                  <div className="relative group rounded-lg overflow-hidden border border-border/60">
                    <img src={form.coverSquare} alt="方图预览" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                      点击更换
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs text-body-desc hover:border-primary hover:text-primary transition-colors">
                    1:1 方图
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload("coverSquare")} />
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">关联分类 *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                    form.categoryIds.includes(cat.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-body2 hover:bg-hover-bg"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">{isEdit ? "保存" : "创建"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Category Form Dialog ───

interface CategoryFormProps {
  category?: Category;
  onSave: (cat: Category) => void;
  onCancel: () => void;
}

function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const isEdit = !!category;
  const [form, setForm] = useState<Category>(
    category || { id: "", name: "", icon: "Briefcase" }
  );

  const iconOptions = ["Briefcase", "Image", "Film", "Headphones", "PenTool", "Code", "Globe", "Zap", "Layers", "Cpu", "MessageSquare", "BookOpen", "Palette", "Music", "Video", "Camera"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("请填写分类名称"); return; }
    const id = form.id || crypto.randomUUID();
    onSave({ ...form, id });
  };

  const renderIcon = (name: string, size = 18) => {
    const Icon = icons[name as keyof typeof icons];
    return Icon ? <Icon size={size} /> : null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-card border border-border/60 rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-title">{isEdit ? "编辑分类" : "新建分类"}</h2>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer"><X size={18} className="text-body2" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-body2 mb-1 block">名称 *</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="分类名称" />
          </div>
          <div>
            <label className="text-sm text-body2 mb-1 block">图标</label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setForm({ ...form, icon: ic })}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    form.icon === ic
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-body2 hover:bg-hover-bg"
                  }`}
                  title={ic}
                >
                  {renderIcon(ic)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">{isEdit ? "保存" : "创建"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Popular Manager with Drag & Drop ───

interface PopularManagerProps {
  tools: Tool[];
  popularIds: string[];
  togglePopular: (id: string) => void;
  getCategoryNames: (ids: string[]) => string;
  onReorder: (ids: string[]) => void;
}

function PopularManager({ tools, popularIds, togglePopular, getCategoryNames, onReorder }: PopularManagerProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const popularTools = popularIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as Tool[];
  const nonPopularTools = tools.filter((t) => !popularIds.includes(t.id));

  const handleDragStart = (id: string) => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragId && dragId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setDragOverId(null); return; }
    const oldIndex = popularIds.indexOf(dragId);
    const newIndex = popularIds.indexOf(targetId);
    if (oldIndex === -1 || newIndex === -1) { setDragId(null); setDragOverId(null); return; }
    const newIds = [...popularIds];
    newIds.splice(oldIndex, 1);
    newIds.splice(newIndex, 0, dragId);
    onReorder(newIds);
    setDragId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDragId(null);
    setDragOverId(null);
  };

  return (
    <div className="space-y-6">
      {/* Popular section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <h3 className="text-sm font-semibold text-title">热门工具（{popularTools.length}）</h3>
          <span className="text-xs text-body-desc">拖拽排序 · 影响前台展示顺序</span>
        </div>
        {popularTools.length === 0 ? (
          <div className="text-center py-8 text-sm text-body-desc border border-dashed border-border rounded-xl">
            暂无热门工具，从下方列表中点击添加
          </div>
        ) : (
          <div className="space-y-1.5">
            {popularTools.map((tool, index) => (
              <div
                key={tool.id}
                draggable
                onDragStart={() => handleDragStart(tool.id)}
                onDragOver={(e) => handleDragOver(e, tool.id)}
                onDrop={() => handleDrop(tool.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                  dragOverId === tool.id
                    ? "border-primary bg-primary/10"
                    : dragId === tool.id
                    ? "opacity-50 border-border/40 bg-card"
                    : "bg-primary/5 border-primary/30"
                }`}
              >
                <GripVertical size={14} className="text-body-desc cursor-grab shrink-0" />
                <span className="text-xs text-body-desc w-5 text-center shrink-0">{index + 1}</span>
                <span className="text-lg shrink-0">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-title truncate">{tool.title}</p>
                  <p className="text-xs text-body-desc truncate">{getCategoryNames(tool.categoryIds)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); togglePopular(tool.id); }}
                  className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer shrink-0"
                  title="取消热门"
                >
                  <Star size={15} className="text-yellow-500 fill-yellow-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Non-popular section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <StarOff size={16} className="text-body-desc" />
          <h3 className="text-sm font-semibold text-title">未加入热门（{nonPopularTools.length}）</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {nonPopularTools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-3 p-3 rounded-xl border bg-card border-border/60 hover:bg-hover-bg transition-all"
            >
              <span className="text-lg">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-title truncate">{tool.title}</p>
                <p className="text-xs text-body-desc truncate">{getCategoryNames(tool.categoryIds)}</p>
              </div>
              <button
                onClick={() => togglePopular(tool.id)}
                className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer shrink-0"
                title="设为热门"
              >
                <StarOff size={15} className="text-body-desc" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin Page ───

type Tab = "tools" | "categories" | "popular";

const AdminPage = () => {
  const navigate = useNavigate();
  const tools = useTools();
  const categories = useCategories();
  const popularIds = usePopularIds();

  const [tab, setTab] = useState<Tab>("tools");
  const [toolForm, setToolForm] = useState<{ open: boolean; tool?: Tool }>({ open: false });
  const [catForm, setCatForm] = useState<{ open: boolean; cat?: Category }>({ open: false });
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSaveTool = (tool: Tool) => {
    const exists = tools.find((t) => t.id === tool.id);
    if (exists) {
      updateTool(tool);
      toast.success("工具已更新");
    } else {
      addTool(tool);
      toast.success("工具已创建");
    }
    setToolForm({ open: false });
  };

  const handleDeleteTool = (id: string) => {
    if (!confirm("确定删除此工具？")) return;
    deleteTool(id);
    toast.success("工具已删除");
  };

  const handleSaveCategory = (cat: Category) => {
    const exists = categories.find((c) => c.id === cat.id);
    if (exists) {
      updateCategory(cat);
      toast.success("分类已更新");
    } else {
      addCategory(cat);
      toast.success("分类已创建");
    }
    setCatForm({ open: false });
  };

  const handleDeleteCategory = (id: string) => {
    if (!confirm("确定删除此分类？相关工具的分类关联将被移除。")) return;
    deleteCategory(id);
    toast.success("分类已删除");
  };

  const togglePopular = (toolId: string) => {
    const newIds = popularIds.includes(toolId)
      ? popularIds.filter((id) => id !== toolId)
      : [...popularIds, toolId];
    savePopularIds(newIds);
    toast.success(popularIds.includes(toolId) ? "已取消热门" : "已设为热门");
  };

  const handleReset = () => {
    if (!confirm("确定恢复默认数据？所有自定义配置将丢失。")) return;
    resetToDefaults();
    toast.success("已恢复默认数据");
  };

  const getCategoryNames = (ids: string[]) =>
    ids.map((id) => categories.find((c) => c.id === id)?.name || id).join(", ");

  const tabs: { key: Tab; label: string }[] = [
    { key: "tools", label: "工具管理" },
    { key: "categories", label: "分类管理" },
    { key: "popular", label: "热门配置" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 glass border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-hover-bg cursor-pointer">
            <ArrowLeft size={20} className="text-title" />
          </button>
          <h1 className="text-lg font-bold text-title">管理配置</h1>
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw size={14} />
              恢复默认
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-card-secondary rounded-lg w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? "bg-card text-title shadow-sm"
                  : "text-body2 hover:text-title"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tools Tab */}
        {tab === "tools" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Input
                placeholder="搜索工具..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={() => setToolForm({ open: true })} className="gap-1.5">
                <Plus size={16} />
                新建工具
              </Button>
            </div>
            <div className="border border-border/60 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-card-secondary/50 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-body2">工具</th>
                    <th className="px-4 py-3 text-xs font-semibold text-body2 hidden md:table-cell">分类</th>
                    <th className="px-4 py-3 text-xs font-semibold text-body2 hidden lg:table-cell">URL</th>
                    <th className="px-4 py-3 text-xs font-semibold text-body2 hidden sm:table-cell">封面</th>
                    <th className="px-4 py-3 text-xs font-semibold text-body2 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTools.map((tool) => (
                    <tr key={tool.id} className="border-t border-border/40 hover:bg-hover-bg/50 transition-colors h-16">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{tool.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-title">{tool.title}</p>
                            <p className="text-xs text-body-desc truncate max-w-[200px]">{tool.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        <p className="text-xs text-body2">{getCategoryNames(tool.categoryIds)}</p>
                      </td>
                      <td className="px-4 py-2 hidden lg:table-cell">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                          {tool.url.replace(/^https?:\/\//, "").slice(0, 30)}
                          <ExternalLink size={10} />
                        </a>
                      </td>
                      <td className="px-4 py-2 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          {tool.coverLandscape ? (
                            <img src={tool.coverLandscape} alt="长图" className="w-16 h-9 object-cover rounded border border-border/40 flex-shrink-0" />
                          ) : (
                            <div className="w-16 h-9 rounded border border-dashed border-border/60 flex items-center justify-center text-[9px] text-body-desc flex-shrink-0">长图</div>
                          )}
                          {tool.coverSquare ? (
                            <img src={tool.coverSquare} alt="方图" className="w-9 h-9 object-cover rounded border border-border/40 flex-shrink-0" />
                          ) : (
                            <div className="w-9 h-9 rounded border border-dashed border-border/60 flex items-center justify-center text-[9px] text-body-desc flex-shrink-0">方图</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => togglePopular(tool.id)}
                            className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer"
                            title={popularIds.includes(tool.id) ? "取消热门" : "设为热门"}
                          >
                            {popularIds.includes(tool.id) ? (
                              <Star size={15} className="text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff size={15} className="text-body-desc" />
                            )}
                          </button>
                          <button
                            onClick={() => setToolForm({ open: true, tool })}
                            className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer"
                          >
                            <Pencil size={15} className="text-body2" />
                          </button>
                          <button
                            onClick={() => handleDeleteTool(tool.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer"
                          >
                            <Trash2 size={15} className="text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTools.length === 0 && (
                <div className="py-12 text-center text-body-desc text-sm">暂无工具</div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {tab === "categories" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Button onClick={() => setCatForm({ open: true })} className="gap-1.5">
                <Plus size={16} />
                新建分类
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const toolCount = tools.filter((t) => t.categoryIds.includes(cat.id)).length;
                return (
                  <div key={cat.id} className="bg-card border border-border/60 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-title">{cat.name}</p>
                      <p className="text-xs text-body-desc mt-0.5">{cat.icon} · {toolCount} 个工具</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setCatForm({ open: true, cat })} className="p-1.5 rounded-lg hover:bg-hover-bg cursor-pointer">
                        <Pencil size={15} className="text-body2" />
                      </button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer">
                        <Trash2 size={15} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Tab */}
        {tab === "popular" && (
          <PopularManager
            tools={tools}
            popularIds={popularIds}
            togglePopular={togglePopular}
            getCategoryNames={getCategoryNames}
            onReorder={(ids) => { savePopularIds(ids); toast.success("排序已更新"); }}
          />
        )}
      </div>

      {/* Dialogs */}
      {toolForm.open && (
        <ToolForm
          tool={toolForm.tool}
          categories={categories}
          onSave={handleSaveTool}
          onCancel={() => setToolForm({ open: false })}
        />
      )}
      {catForm.open && (
        <CategoryForm
          category={catForm.cat}
          onSave={handleSaveCategory}
          onCancel={() => setCatForm({ open: false })}
        />
      )}
    </div>
  );
};

export default AdminPage;
