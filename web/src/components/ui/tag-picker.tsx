import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Add01Icon,
  CheckmarkCircle02Icon,
  MoreHorizontalIcon,
  Search01Icon,
  LabelImportantIcon,
} from "@hugeicons/core-free-icons";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TagPickerProps {
  availableTags: Tag[];
  selectedTags: string[];
  onToggleTag: (name: string) => void;
  onCreateTag?: (name: string) => void;
}

export function TagPicker({
  availableTags,
  selectedTags,
  onToggleTag,
  onCreateTag,
}: TagPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const visible = availableTags.slice(0, 3);
  const hasMore = availableTags.length > 3;
  const filtered = availableTags.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  const customTags = selectedTags.filter((t) => !availableTags.find((at) => at.name === t));

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const popoverHeight = 320;
    const spaceBottom = window.innerHeight - rect.bottom;
    const spaceTop = rect.top;
    setPosition(spaceBottom < popoverHeight && spaceTop > popoverHeight ? "top" : "bottom");
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
        setSearch("");
      }
    };
    if (isExpanded) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) calculatePosition();
  }, [isExpanded, calculatePosition]);

  const handleToggle = () => {
    if (!isExpanded) calculatePosition();
    setIsExpanded(!isExpanded);
  };

  const handleCreate = () => {
    const tag = newName.trim().toLowerCase();
    if (tag && onCreateTag) {
      onCreateTag(tag);
      onToggleTag(tag);
      setNewName("");
    }
  };

  const TagBtn = ({ t }: { t: Tag }) => {
    const sel = selectedTags.includes(t.name);
    return (
      <button
        type="button"
        onClick={() => onToggleTag(t.name)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all border ${
          sel ? "border-transparent" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
        }`}
        style={sel ? { backgroundColor: `${t.color}15`, color: t.color } : undefined}
      >
        <HugeiconsIcon
          icon={sel ? CheckmarkCircle02Icon : LabelImportantIcon}
          className={sel ? "w-4 h-4" : "w-3.5 h-3.5"}
          style={{ color: t.color }}
        />
        <span style={sel ? { fontWeight: 500 } : undefined}>#{t.name}</span>
      </button>
    );
  };

  const yOffset = position === "bottom" ? -8 : 8;

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 items-center">
        {visible.map((t) => <TagBtn key={t.id} t={t} />)}
        {hasMore && (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} className="w-4 h-4" />
            <span>{availableTags.length - 3} more</span>
          </button>
        )}
        {customTags.map((name) => (
          <span key={name} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm bg-gray-100 text-gray-700">
            #{name}
            <button type="button" onClick={() => onToggleTag(name)} className="p-0.5 hover:bg-gray-200 rounded">
              <HugeiconsIcon icon={Cancel01Icon} className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: yOffset, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 ${position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"} w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-30`}
          >
            <div className="relative mb-3">
              <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tags..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 mb-3">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-3">No tags found</p>
              ) : (
                filtered.map((t) => {
                  const sel = selectedTags.includes(t.name);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onToggleTag(t.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
                        sel ? "" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={sel ? { backgroundColor: `${t.color}15`, color: t.color } : undefined}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}20` }}>
                        <HugeiconsIcon
                          icon={sel ? CheckmarkCircle02Icon : LabelImportantIcon}
                          className="w-4 h-4"
                          style={{ color: t.color }}
                        />
                      </div>
                      <span className={sel ? "font-medium" : ""}>#{t.name}</span>
                    </button>
                  );
                })
              )}
            </div>
            {onCreateTag && (
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">#</span>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCreate())}
                    placeholder="new-tag"
                    className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  className="px-3 py-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white rounded-xl"
                >
                  <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
