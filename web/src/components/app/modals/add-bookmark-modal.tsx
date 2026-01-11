import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Link01Icon,
  Add01Icon,
  Folder03Icon,
  CheckmarkCircle02Icon,
  MoreHorizontalIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TagPicker, Tag } from "@/components/ui/tag-picker";

export type { Tag } from "@/components/ui/tag-picker";

export interface Collection {
  id: number;
  name: string;
  color: string;
}

interface AddBookmarkModalProps {
  isOpen: boolean;
  collections?: Collection[];
  availableTags?: Tag[];
  onClose: () => void;
  onAdd: (bookmark: {
    title: string;
    url: string;
    description: string;
    tags: string[];
    collectionId?: number;
  }) => void;
  onCreateCollection?: (name: string) => void;
  onCreateTag?: (name: string) => void;
}

function CollectionPicker({
  collections,
  selectedId,
  onSelect,
  onCreateCollection,
}: {
  collections: Collection[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onCreateCollection?: (name: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const visible = collections.slice(0, 3);
  const hasMore = collections.length > 3;
  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
    if (newName.trim() && onCreateCollection) {
      onCreateCollection(newName.trim());
      setNewName("");
    }
  };

  const CollectionBtn = ({ c }: { c: Collection }) => {
    const sel = selectedId === c.id;
    return (
      <button
        type="button"
        onClick={() => onSelect(sel ? null : c.id)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all border ${
          sel ? "border-transparent" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
        }`}
        style={sel ? { backgroundColor: `${c.color}15`, color: c.color } : undefined}
      >
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{ backgroundColor: `${c.color}${sel ? "25" : "20"}` }}
        >
          <HugeiconsIcon
            icon={sel ? CheckmarkCircle02Icon : Folder03Icon}
            className={sel ? "w-4 h-4" : "w-3.5 h-3.5"}
            style={{ color: c.color }}
          />
        </div>
        <span style={sel ? { fontWeight: 500 } : undefined}>{c.name}</span>
      </button>
    );
  };

  const yOffset = position === "bottom" ? -8 : 8;

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 items-center">
        {visible.map((c) => <CollectionBtn key={c.id} c={c} />)}
        {hasMore && (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} className="w-4 h-4" />
            <span>{collections.length - 3} more</span>
          </button>
        )}
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
                placeholder="Search collections..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 mb-3">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-3">No collections found</p>
              ) : (
                filtered.map((c) => {
                  const sel = selectedId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelect(sel ? null : c.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
                        sel ? "" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={sel ? { backgroundColor: `${c.color}15`, color: c.color } : undefined}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}20` }}>
                        <HugeiconsIcon
                          icon={sel ? CheckmarkCircle02Icon : Folder03Icon}
                          className="w-4 h-4"
                          style={{ color: c.color }}
                        />
                      </div>
                      <span className={sel ? "font-medium" : ""}>{c.name}</span>
                    </button>
                  );
                })
              )}
            </div>
            {onCreateCollection && (
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCreate())}
                  placeholder="New collection name"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
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

export function AddBookmarkModal({
  isOpen,
  collections = [],
  availableTags = [],
  onClose,
  onAdd,
  onCreateCollection,
  onCreateTag,
}: AddBookmarkModalProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);

  const handleToggleTag = (name: string) => {
    setSelectedTags((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAdd({
      title: title.trim() || new URL(url).hostname,
      url: url.trim(),
      description: description.trim(),
      tags: selectedTags,
      collectionId: selectedCollectionId ?? undefined,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setSelectedTags([]);
    setSelectedCollectionId(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl w-full max-w-lg mx-4 p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Bookmark</h2>
              <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL</label>
                  <div className="relative">
                    <HugeiconsIcon icon={Link01Icon} className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Auto-detected from URL if empty"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description"
                    rows={2}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
                  />
                </div>

                {collections.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <CollectionPicker
                      collections={collections}
                      selectedId={selectedCollectionId}
                      onSelect={setSelectedCollectionId}
                      onCreateCollection={onCreateCollection}
                    />
                  </div>
                )}

                {availableTags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <TagPicker
                      availableTags={availableTags}
                      selectedTags={selectedTags}
                      onToggleTag={handleToggleTag}
                      onCreateTag={onCreateTag}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm"
                >
                  Add Bookmark
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
