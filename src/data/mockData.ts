export type CoverType = "landscape" | "square";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  slug: string;
  url: string;
  coverType: CoverType;
  categoryIds: string[];
  coverLandscape?: string;
  coverSquare?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

const STORAGE_KEY_TOOLS = "rita_tools";
const STORAGE_KEY_CATEGORIES = "rita_categories";
const STORAGE_KEY_POPULAR = "rita_popular_tool_ids";
const STORAGE_KEY_RECENT = "rita_recent_tool_ids";

const defaultCategories: Category[] = [
  { id: "ai-office", name: "AI 办公工具", icon: "Briefcase" },
  { id: "ai-image", name: "AI 图像工具", icon: "Image" },
  { id: "ai-video", name: "AI 视频工具", icon: "Film" },
  { id: "ai-audio", name: "AI 音频工具", icon: "Headphones" },
  { id: "ai-writing", name: "AI 写作工具", icon: "PenTool" },
  { id: "ai-code", name: "AI 编程工具", icon: "Code" },
];

const defaultTools: Tool[] = [
  { id: "1", title: "PDF 转 Word", description: "智能识别 PDF 内容并精准转换为可编辑的 Word 文档", icon: "📄", tags: ["文档", "转换"], slug: "pdf-to-word", url: "https://example.com/pdf-to-word", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "2", title: "AI 智能摘要", description: "一键提取长文档核心内容，生成结构化摘要", icon: "📝", tags: ["摘要", "效率"], slug: "ai-summary", url: "https://example.com/ai-summary", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "3", title: "会议纪要生成", description: "实时转录会议内容并自动生成要点纪要", icon: "🎙️", tags: ["会议", "转录"], slug: "meeting-notes", url: "https://example.com/meeting-notes", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "4", title: "智能翻译助手", description: "支持 100+ 语言的 AI 翻译，保持原文语境与风格", icon: "🌐", tags: ["翻译", "多语言"], slug: "ai-translator", url: "https://example.com/ai-translator", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "5", title: "数据分析助手", description: "上传数据表格，AI 自动生成可视化图表与分析报告", icon: "📊", tags: ["数据", "分析"], slug: "data-analyst", url: "https://example.com/data-analyst", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "6", title: "邮件撰写助手", description: "AI 辅助撰写专业商务邮件，支持多种语气风格", icon: "✉️", tags: ["邮件", "写作"], slug: "email-writer", url: "https://example.com/email-writer", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "7", title: "PPT 生成器", description: "输入主题即可自动生成专业演示文稿", icon: "📐", tags: ["演示", "自动化"], slug: "ppt-generator", url: "https://example.com/ppt-generator", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "8", title: "合同审查助手", description: "AI 智能识别合同风险条款并给出修改建议", icon: "📋", tags: ["法律", "审查"], slug: "contract-review", url: "https://example.com/contract-review", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "9", title: "日程智能规划", description: "AI 根据任务优先级自动安排每日工作日程", icon: "📅", tags: ["日程", "规划"], slug: "schedule-planner", url: "https://example.com/schedule-planner", coverType: "landscape", categoryIds: ["ai-office"] },
  { id: "10", title: "OCR 文字识别", description: "高精度识别图片和扫描件中的文字内容", icon: "🔍", tags: ["OCR", "识别"], slug: "ocr-tool", url: "https://example.com/ocr-tool", coverType: "landscape", categoryIds: ["ai-office"] },

  { id: "11", title: "AI 绘画", description: "输入文字描述即可生成高质量艺术画作", icon: "🎨", tags: ["绘画", "生成"], slug: "ai-painting", url: "https://example.com/ai-painting", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "12", title: "图片增强", description: "一键提升图片清晰度和画质，支持超分辨率放大", icon: "📸", tags: ["增强", "超分"], slug: "image-enhance", url: "https://example.com/image-enhance", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "13", title: "AI 抠图", description: "智能识别主体并一键去除背景，精准到发丝级别", icon: "✂️", tags: ["抠图", "背景"], slug: "bg-remover", url: "https://example.com/bg-remover", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "14", title: "风格迁移", description: "将照片转换为油画、水彩、素描等多种艺术风格", icon: "🖼️", tags: ["风格", "艺术"], slug: "style-transfer", url: "https://example.com/style-transfer", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "15", title: "AI 头像生成", description: "上传照片生成多种风格的精美 AI 头像", icon: "👤", tags: ["头像", "个性化"], slug: "avatar-gen", url: "https://example.com/avatar-gen", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "16", title: "图片修复", description: "智能修复老照片划痕、破损和褪色问题", icon: "🔧", tags: ["修复", "老照片"], slug: "image-repair", url: "https://example.com/image-repair", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "17", title: "Logo 设计", description: "AI 根据品牌描述自动生成多款 Logo 方案", icon: "💎", tags: ["Logo", "设计"], slug: "logo-design", url: "https://example.com/logo-design", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "18", title: "表情包生成", description: "AI 一键生成有趣的自定义表情包图片", icon: "😄", tags: ["表情", "趣味"], slug: "meme-gen", url: "https://example.com/meme-gen", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "19", title: "色彩提取", description: "从图片中智能提取主色调并生成配色方案", icon: "🎯", tags: ["色彩", "配色"], slug: "color-extract", url: "https://example.com/color-extract", coverType: "landscape", categoryIds: ["ai-image"] },
  { id: "20", title: "智能裁剪", description: "AI 识别图片重点区域并自动进行最佳裁剪", icon: "📏", tags: ["裁剪", "智能"], slug: "smart-crop", url: "https://example.com/smart-crop", coverType: "landscape", categoryIds: ["ai-image"] },

  { id: "21", title: "AI 视频生成", description: "输入文字脚本即可自动生成完整短视频", icon: "🎬", tags: ["视频", "生成"], slug: "video-gen", url: "https://example.com/video-gen", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "22", title: "智能剪辑", description: "AI 自动识别精彩片段并完成粗剪", icon: "✂️", tags: ["剪辑", "自动化"], slug: "smart-edit", url: "https://example.com/smart-edit", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "23", title: "字幕生成", description: "AI 语音识别自动生成多语言字幕文件", icon: "💬", tags: ["字幕", "翻译"], slug: "subtitle-gen", url: "https://example.com/subtitle-gen", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "24", title: "视频增强", description: "AI 提升视频画质，支持 4K 超分辨率处理", icon: "📈", tags: ["增强", "4K"], slug: "video-enhance", url: "https://example.com/video-enhance", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "25", title: "虚拟主播", description: "AI 驱动的虚拟数字人，支持实时直播互动", icon: "🤖", tags: ["数字人", "直播"], slug: "virtual-anchor", url: "https://example.com/virtual-anchor", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "26", title: "视频摘要", description: "AI 分析长视频并生成关键内容的文字摘要", icon: "📝", tags: ["摘要", "效率"], slug: "video-summary", url: "https://example.com/video-summary", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "27", title: "动画制作", description: "AI 辅助生成 2D/3D 动画短片", icon: "🎞️", tags: ["动画", "创意"], slug: "animation-maker", url: "https://example.com/animation-maker", coverType: "landscape", categoryIds: ["ai-video"] },
  { id: "28", title: "视频翻译", description: "AI 自动翻译视频中的语音和字幕内容", icon: "🌍", tags: ["翻译", "视频"], slug: "video-translate", url: "https://example.com/video-translate", coverType: "landscape", categoryIds: ["ai-video"] },

  { id: "29", title: "AI 配音", description: "多种逼真人声，支持情感语调调节", icon: "🔊", tags: ["配音", "语音"], slug: "ai-voiceover", url: "https://example.com/ai-voiceover", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "30", title: "音乐生成", description: "AI 根据描述自动作曲，支持多种音乐风格", icon: "🎵", tags: ["音乐", "创作"], slug: "music-gen", url: "https://example.com/music-gen", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "31", title: "语音转文字", description: "高精度语音识别，支持多种语言和方言", icon: "📝", tags: ["转录", "识别"], slug: "speech-to-text", url: "https://example.com/speech-to-text", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "32", title: "音频降噪", description: "AI 智能消除背景噪音，提升音频清晰度", icon: "🎧", tags: ["降噪", "增强"], slug: "noise-reduction", url: "https://example.com/noise-reduction", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "33", title: "声音克隆", description: "AI 学习声音特征并生成个性化语音", icon: "🎤", tags: ["克隆", "个性化"], slug: "voice-clone", url: "https://example.com/voice-clone", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "34", title: "播客剪辑", description: "AI 自动剪辑播客内容并优化音质", icon: "🎙️", tags: ["播客", "剪辑"], slug: "podcast-edit", url: "https://example.com/podcast-edit", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "35", title: "音效生成", description: "AI 根据场景描述生成匹配的音效素材", icon: "⚡", tags: ["音效", "素材"], slug: "sfx-gen", url: "https://example.com/sfx-gen", coverType: "landscape", categoryIds: ["ai-audio"] },
  { id: "36", title: "歌词生成", description: "AI 根据主题和风格自动创作歌词", icon: "✍️", tags: ["歌词", "创作"], slug: "lyrics-gen", url: "https://example.com/lyrics-gen", coverType: "landscape", categoryIds: ["ai-audio"] },

  { id: "37", title: "AI 文案助手", description: "一键生成营销文案、广告语和社媒内容", icon: "✍️", tags: ["文案", "营销"], slug: "copywriting", url: "https://example.com/copywriting", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "38", title: "小说创作", description: "AI 辅助构思情节、人物和世界观设定", icon: "📖", tags: ["小说", "创作"], slug: "novel-writer", url: "https://example.com/novel-writer", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "39", title: "论文助手", description: "AI 辅助论文选题、大纲生成和参考文献管理", icon: "🎓", tags: ["学术", "论文"], slug: "paper-assistant", url: "https://example.com/paper-assistant", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "40", title: "SEO 优化写作", description: "AI 生成 SEO 友好的文章并优化关键词布局", icon: "🔍", tags: ["SEO", "优化"], slug: "seo-writer", url: "https://example.com/seo-writer", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "41", title: "AI 改写润色", description: "智能改写文章风格，提升可读性和表达力", icon: "💡", tags: ["润色", "改写"], slug: "rewriter", url: "https://example.com/rewriter", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "42", title: "多语言写作", description: "AI 支持多种语言的内容创作和本地化", icon: "🌐", tags: ["多语言", "本地化"], slug: "multilang-writer", url: "https://example.com/multilang-writer", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "43", title: "剧本生成", description: "AI 辅助生成影视剧本和对话内容", icon: "🎭", tags: ["剧本", "影视"], slug: "script-writer", url: "https://example.com/script-writer", coverType: "landscape", categoryIds: ["ai-writing"] },
  { id: "44", title: "诗歌创作", description: "AI 根据主题和风格创作各类诗歌", icon: "🌸", tags: ["诗歌", "文学"], slug: "poetry-gen", url: "https://example.com/poetry-gen", coverType: "landscape", categoryIds: ["ai-writing"] },

  { id: "45", title: "代码生成", description: "AI 根据自然语言描述自动生成高质量代码", icon: "💻", tags: ["代码", "生成"], slug: "code-gen", url: "https://example.com/code-gen", coverType: "landscape", categoryIds: ["ai-code"] },
  { id: "46", title: "代码审查", description: "AI 自动检测代码 Bug 和潜在安全问题", icon: "🔍", tags: ["审查", "安全"], slug: "code-review", url: "https://example.com/code-review", coverType: "landscape", categoryIds: ["ai-code"] },
  { id: "47", title: "SQL 助手", description: "用自然语言生成复杂 SQL 查询语句", icon: "🗄️", tags: ["SQL", "数据库"], slug: "sql-assistant", url: "https://example.com/sql-assistant", coverType: "landscape", categoryIds: ["ai-code"] },
  { id: "48", title: "API 文档生成", description: "AI 根据代码自动生成标准化 API 文档", icon: "📋", tags: ["文档", "API"], slug: "api-doc-gen", url: "https://example.com/api-doc-gen", coverType: "landscape", categoryIds: ["ai-code"] },
  { id: "49", title: "正则生成器", description: "用自然语言描述规则即可生成正则表达式", icon: "🔣", tags: ["正则", "工具"], slug: "regex-gen", url: "https://example.com/regex-gen", coverType: "landscape", categoryIds: ["ai-code"] },
  { id: "50", title: "单元测试生成", description: "AI 自动为代码生成完整的单元测试用例", icon: "✅", tags: ["测试", "质量"], slug: "test-gen", url: "https://example.com/test-gen", coverType: "landscape", categoryIds: ["ai-code"] },
];

const defaultPopularIds = ["11", "2", "21", "37", "30", "5", "13", "45"];
const defaultRecentIds = ["1", "11", "23", "29", "37", "45"];

// --- localStorage helpers ---

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return fallback;
}

function saveJSON<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- State management ---

let _tools: Tool[] = loadJSON(STORAGE_KEY_TOOLS, defaultTools);
let _categories: Category[] = loadJSON(STORAGE_KEY_CATEGORIES, defaultCategories);
let _popularIds: string[] = loadJSON(STORAGE_KEY_POPULAR, defaultPopularIds);
let _recentIds: string[] = loadJSON(STORAGE_KEY_RECENT, defaultRecentIds);

// Listeners for React re-renders
type Listener = () => void;
const listeners: Set<Listener> = new Set();
function notify() { listeners.forEach((l) => l()); }
export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

// --- Getters ---

export function getTools(): Tool[] { return _tools; }
export function getCategories(): Category[] { return _categories; }
export function getPopularIds(): string[] { return _popularIds; }
export function getRecentIds(): string[] { return _recentIds; }

export function getToolById(id: string): Tool | undefined {
  return _tools.find((t) => t.id === id);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return _tools.filter((t) => t.categoryIds.includes(categoryId));
}

export function getPopularTools(): Tool[] {
  return _popularIds.map((id) => _tools.find((t) => t.id === id)).filter(Boolean) as Tool[];
}

export function getRecentTools(): Tool[] {
  return _recentIds.map((id) => _tools.find((t) => t.id === id)).filter(Boolean) as Tool[];
}

// Legacy compat: categories with tools
export interface CategoryWithTools extends Category {
  tools: Tool[];
}

export function getCategoriesWithTools(): CategoryWithTools[] {
  return _categories.map((cat) => ({
    ...cat,
    tools: getToolsByCategory(cat.id),
  }));
}

// --- Mutations ---

export function saveTools(tools: Tool[]) {
  _tools = tools;
  saveJSON(STORAGE_KEY_TOOLS, tools);
  notify();
}

export function saveCategories(cats: Category[]) {
  _categories = cats;
  saveJSON(STORAGE_KEY_CATEGORIES, cats);
  notify();
}

export function savePopularIds(ids: string[]) {
  _popularIds = ids;
  saveJSON(STORAGE_KEY_POPULAR, ids);
  notify();
}

export function saveRecentIds(ids: string[]) {
  _recentIds = ids;
  saveJSON(STORAGE_KEY_RECENT, ids);
  notify();
}

const MAX_RECENT = 20;
export function recordRecentTool(toolId: string) {
  _recentIds = [toolId, ..._recentIds.filter((id) => id !== toolId)].slice(0, MAX_RECENT);
  saveJSON(STORAGE_KEY_RECENT, _recentIds);
  notify();
}

export function addTool(tool: Tool) {
  _tools = [..._tools, tool];
  saveJSON(STORAGE_KEY_TOOLS, _tools);
  notify();
}

export function updateTool(tool: Tool) {
  _tools = _tools.map((t) => (t.id === tool.id ? tool : t));
  saveJSON(STORAGE_KEY_TOOLS, _tools);
  notify();
}

export function deleteTool(id: string) {
  _tools = _tools.filter((t) => t.id !== id);
  _popularIds = _popularIds.filter((pid) => pid !== id);
  _recentIds = _recentIds.filter((rid) => rid !== id);
  saveJSON(STORAGE_KEY_TOOLS, _tools);
  saveJSON(STORAGE_KEY_POPULAR, _popularIds);
  saveJSON(STORAGE_KEY_RECENT, _recentIds);
  notify();
}

export function addCategory(cat: Category) {
  _categories = [..._categories, cat];
  saveJSON(STORAGE_KEY_CATEGORIES, _categories);
  notify();
}

export function updateCategory(cat: Category) {
  _categories = _categories.map((c) => (c.id === cat.id ? cat : c));
  saveJSON(STORAGE_KEY_CATEGORIES, _categories);
  notify();
}

export function deleteCategory(id: string) {
  _categories = _categories.filter((c) => c.id !== id);
  // Remove category from tools
  _tools = _tools.map((t) => ({ ...t, categoryIds: t.categoryIds.filter((cid) => cid !== id) }));
  saveJSON(STORAGE_KEY_CATEGORIES, _categories);
  saveJSON(STORAGE_KEY_TOOLS, _tools);
  notify();
}

export function resetToDefaults() {
  _tools = defaultTools;
  _categories = defaultCategories;
  _popularIds = defaultPopularIds;
  _recentIds = defaultRecentIds;
  saveJSON(STORAGE_KEY_TOOLS, _tools);
  saveJSON(STORAGE_KEY_CATEGORIES, _categories);
  saveJSON(STORAGE_KEY_POPULAR, _popularIds);
  saveJSON(STORAGE_KEY_RECENT, _recentIds);
  notify();
}
