import { useState } from "react";
import {
  Type,
  Hash,
  Code2,
  Palette,
  Key,
  AlignLeft,
  ToggleLeft,
  RotateCcw,
  Copy,
  Ruler,
  Percent,
  Dices,
  Lock,
  Link,
  Droplet,
  Search,
  ChevronRight,
  Zap,
} from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────
type Tool = { title: string; desc: string; icon: React.ElementType; tag: string };
type Category = { id: string; label: string; icon: React.ElementType; tools: Tool[] };

// ─── data ────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: "text",
    label: "Text Tools",
    icon: Type,
    tools: [
      { title: "Word Counter", desc: "Words, characters & lines", icon: AlignLeft, tag: "Count" },
      { title: "Case Converter", desc: "UPPER, lower, Title Case", icon: ToggleLeft, tag: "Transform" },
      { title: "Text Reverser", desc: "Reverse any string instantly", icon: RotateCcw, tag: "Transform" },
      { title: "Duplicate Remover", desc: "Remove repeated lines", icon: Copy, tag: "Clean" },
    ],
  },
  {
    id: "number",
    label: "Number Tools",
    icon: Hash,
    tools: [
      { title: "Unit Converter", desc: "Length, weight, temperature", icon: Ruler, tag: "Convert" },
      { title: "Percentage Calc", desc: "Calculate percentages fast", icon: Percent, tag: "Math" },
      { title: "Random Number", desc: "Generate in any range", icon: Dices, tag: "Generate" },
    ],
  },
  {
    id: "encode",
    label: "Encode / Decode",
    icon: Code2,
    tools: [
      { title: "Base64", desc: "Encode and decode strings", icon: Lock, tag: "Encode" },
      { title: "URL Encoder", desc: "Encode and decode URLs", icon: Link, tag: "Encode" },
    ],
  },
  {
    id: "color",
    label: "Color Tools",
    icon: Palette,
    tools: [
      { title: "HEX ↔ RGB", desc: "Convert color formats", icon: Droplet, tag: "Convert" },
      { title: "Color Picker", desc: "Visual color selector", icon: Palette, tag: "Pick" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: Key,
    tools: [
      { title: "Password Gen", desc: "Secure, customizable passwords", icon: Key, tag: "Generate" },
    ],
  },
];

const ALL_TOOLS = CATEGORIES.flatMap((c) =>
  c.tools.map((t) => ({ ...t, category: c.label, categoryId: c.id }))
);

// ─── tag color map ────────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  Count:     "bg-[#0e3a4a] text-[#22d3ee]",
  Transform: "bg-[#1a2a4a] text-[#60a5fa]",
  Clean:     "bg-[#2a1a3a] text-[#c084fc]",
  Convert:   "bg-[#0e3a2a] text-[#4ade80]",
  Math:      "bg-[#3a2a0e] text-[#facc15]",
  Generate:  "bg-[#3a1a0e] text-[#fb923c]",
  Encode:    "bg-[#0e3a4a] text-[#22d3ee]",
  Pick:      "bg-[#2a1a3a] text-[#e879f9]",
};

export function GioxRefined() {
  const [activeId, setActiveId] = useState("text");
  const [query, setQuery] = useState("");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const filtered = query.trim()
    ? ALL_TOOLS.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.desc.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const activeCategory = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#0b0f1a" }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className="flex flex-col w-56 shrink-0 h-full border-r"
        style={{ background: "#0d1120", borderColor: "#1a2035" }}
      >
        {/* logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: "#1a2035" }}>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" }}
          >
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold text-white tracking-tight">Giox Tool</span>
        </div>

        {/* search */}
        <div className="px-3 pt-4 pb-2">
          <div
            className="flex items-center gap-2 px-3 h-8 rounded-md"
            style={{ background: "#131929", border: "1px solid #1e2840" }}
          >
            <Search className="w-3 h-3 shrink-0" style={{ color: "#4a5a7a" }} />
            <input
              className="bg-transparent text-xs outline-none w-full placeholder:text-[#4a5a7a]"
              style={{ color: "#94a3b8" }}
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto">
          <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#2d3f5f" }}>
            Categories
          </p>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveId(cat.id); setQuery(""); }}
                className="w-full flex items-center gap-2.5 px-3 h-9 rounded-md text-left transition-all duration-150 relative"
                style={{
                  background: isActive ? "#13203a" : "transparent",
                  color: isActive ? "#e2e8f0" : "#64748b",
                  borderLeft: isActive ? "2px solid #06b6d4" : "2px solid transparent",
                }}
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: isActive ? "#06b6d4" : "#475569" }}
                />
                <span className="text-xs font-medium truncate">{cat.label}</span>
                {isActive && (
                  <ChevronRight
                    className="w-3 h-3 ml-auto shrink-0"
                    style={{ color: "#06b6d4" }}
                  />
                )}
                <span
                  className="ml-auto text-[10px] font-medium rounded-full px-1.5 py-0.5"
                  style={{
                    background: isActive ? "#0e2a3a" : "#131929",
                    color: isActive ? "#22d3ee" : "#334155",
                    marginLeft: isActive ? "0" : "auto",
                  }}
                >
                  {cat.tools.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* footer */}
        <div className="px-5 py-4 border-t" style={{ borderColor: "#1a2035" }}>
          <p className="text-[10px]" style={{ color: "#2d3f5f" }}>
            {ALL_TOOLS.length} tools available
          </p>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* topbar */}
        <header
          className="flex items-center justify-between px-8 h-14 border-b shrink-0"
          style={{ borderColor: "#1a2035", background: "#0b0f1a" }}
        >
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">
              {filtered ? "Search Results" : activeCategory.label}
            </h1>
            <p className="text-[11px]" style={{ color: "#3a4f70" }}>
              {filtered
                ? `${filtered.length} tool${filtered.length !== 1 ? "s" : ""} found`
                : `${activeCategory.tools.length} tool${activeCategory.tools.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 h-8 rounded-md w-52"
            style={{ background: "#0d1120", border: "1px solid #1a2035" }}
          >
            <Search className="w-3 h-3 shrink-0" style={{ color: "#3a4f70" }} />
            <input
              className="bg-transparent text-xs outline-none w-full placeholder:text-[#3a4f70]"
              style={{ color: "#94a3b8" }}
              placeholder="Quick search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </header>

        {/* grid */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {filtered && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <Search className="w-8 h-8" style={{ color: "#1e2840" }} />
              <p className="text-sm" style={{ color: "#3a4f70" }}>No tools found for "{query}"</p>
            </div>
          )}

          {filtered ? (
            <div className="grid grid-cols-3 gap-3">
              {filtered.map((tool) => (
                <ToolCard
                  key={tool.title}
                  tool={tool}
                  isHovered={hoveredTool === tool.title}
                  onHover={setHoveredTool}
                />
              ))}
            </div>
          ) : (
            <>
              {/* active category header pill */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "#0e1e30", border: "1px solid #0e3050", color: "#06b6d4" }}
                >
                  {(() => { const Icon = activeCategory.icon; return <Icon className="w-3 h-3" />; })()}
                  {activeCategory.label}
                </div>
                <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1a2a40 0%, transparent 100%)" }} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {activeCategory.tools.map((tool) => (
                  <ToolCard
                    key={tool.title}
                    tool={{ ...tool, category: activeCategory.label, categoryId: activeCategory.id }}
                    isHovered={hoveredTool === tool.title}
                    onHover={setHoveredTool}
                  />
                ))}
              </div>

              {/* Other categories preview */}
              {CATEGORIES.filter((c) => c.id !== activeId).map((cat) => (
                <div key={cat.id} className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      className="flex items-center gap-2 text-xs font-medium transition-colors"
                      style={{ color: "#3a4f70" }}
                      onClick={() => setActiveId(cat.id)}
                    >
                      {(() => { const Icon = cat.icon; return <Icon className="w-3 h-3" />; })()}
                      {cat.label}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #131929 0%, transparent 100%)" }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {cat.tools.slice(0, 3).map((tool) => (
                      <ToolCard
                        key={tool.title}
                        tool={{ ...tool, category: cat.label, categoryId: cat.id }}
                        isHovered={hoveredTool === tool.title}
                        onHover={setHoveredTool}
                        dimmed
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Tool Card ────────────────────────────────────────────────────────────────
function ToolCard({
  tool,
  isHovered,
  onHover,
  dimmed = false,
}: {
  tool: Tool & { category: string; categoryId: string };
  isHovered: boolean;
  onHover: (t: string | null) => void;
  dimmed?: boolean;
}) {
  const Icon = tool.icon;
  const tagClass = TAG_COLORS[tool.tag] ?? "bg-[#0e3a4a] text-[#22d3ee]";

  return (
    <button
      className="text-left p-4 rounded-xl transition-all duration-200"
      style={{
        background: isHovered ? "#111827" : dimmed ? "#0c1018" : "#0d1322",
        border: `1px solid ${isHovered ? "#1e3a5a" : dimmed ? "#131929" : "#1a2540"}`,
        opacity: dimmed && !isHovered ? 0.65 : 1,
        transform: isHovered ? "translateY(-1px)" : "none",
        boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(6,182,212,0.08)" : "none",
      }}
      onMouseEnter={() => onHover(tool.title)}
      onMouseLeave={() => onHover(null)}
    >
      {/* icon + tag row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.15) 100%)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${isHovered ? "rgba(6,182,212,0.25)" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: isHovered ? "#06b6d4" : "#4a5a7a" }}
            strokeWidth={1.75}
          />
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagClass}`}>
          {tool.tag}
        </span>
      </div>

      {/* title */}
      <p
        className="text-sm font-semibold mb-1 leading-tight"
        style={{ color: isHovered ? "#e2e8f0" : "#94a3b8" }}
      >
        {tool.title}
      </p>

      {/* desc */}
      <p className="text-[11px] leading-relaxed" style={{ color: isHovered ? "#4a5a7a" : "#2d3f5f" }}>
        {tool.desc}
      </p>

      {/* arrow */}
      {isHovered && (
        <div className="flex items-center gap-1 mt-3">
          <span className="text-[11px] font-medium" style={{ color: "#06b6d4" }}>
            Open tool
          </span>
          <ChevronRight className="w-3 h-3" style={{ color: "#06b6d4" }} />
        </div>
      )}
    </button>
  );
}
