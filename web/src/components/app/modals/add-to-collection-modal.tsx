import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Folder03Icon,
  Add01Icon,
  CheckmarkCircle02Icon,
  MoreHorizontalIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Bookmark } from "@/stores/bookmarks";
import type { Collection } from "@/stores/collections";

interface AddToCollectionModalProps {
  isOpen: boolean;
  bookmark: Bookmark | null;
  collections: Collection[];
  onClose: () => void;
  onAddToCollection: (bookmarkId: string, collectionId: string) => void;
  onCreateCollection?: (name: string) => void;
}

function CollectionPicker({
  collections,
  selectedId,
  onSelect,
  onCreateCollection,
}: {
  collections: Collection[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onCreateCollection?: (name: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const visible = collections.slice(0, 10);
  const hasMore = collections.length > 10;
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
            <span>{collections.length - 10} more</span>
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

export function AddToCollectionModal({
  isOpen,
  bookmark,
  collections,
  onClose,
  onAddToCollection,
  onCreateCollection,
}: AddToCollectionModalProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookmark || !selectedCollectionId) return;
    onAddToCollection(bookmark.id, selectedCollectionId);
    setSelectedCollectionId(null);
    onClose();
  };

  const handleClose = () => {
    setSelectedCollectionId(null);
    onClose();
  };

  const isChanging = bookmark?.collectionId;
  const title = isChanging ? "Change Collection" : "Add to Collection";

  return (
    <AnimatePresence>
      {isOpen && bookmark && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl w-full max-w-md p-6 shadow-xl z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center shrink-0">
                    <img
                      src={bookmark.favicon}
                      alt=""
                      className="w-4 h-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{bookmark.title}</p>
                    <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Collection
                  </label>
                  <CollectionPicker
                    collections={collections}
                    selectedId={selectedCollectionId}
                    onSelect={setSelectedCollectionId}
                    onCreateCollection={onCreateCollection}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedCollectionId}
                    className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm"
                  >
                    {isChanging ? "Change" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}