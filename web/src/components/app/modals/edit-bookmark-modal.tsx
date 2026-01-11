import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Link01Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Bookmark } from "@/components/app/bookmark-card";
import { TagPicker, Tag } from "@/components/ui/tag-picker";

interface EditBookmarkModalProps {
  isOpen: boolean;
  bookmark: Bookmark | null;
  availableTags?: Tag[];
  onClose: () => void;
  onSave: (bookmark: Bookmark) => void;
  onCreateTag?: (name: string) => void;
}

export function EditBookmarkModal({
  isOpen,
  bookmark,
  availableTags = [],
  onClose,
  onSave,
  onCreateTag,
}: EditBookmarkModalProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title);
      setUrl(bookmark.url);
      setDescription(bookmark.description);
      setTags([...bookmark.tags]);
    }
  }, [bookmark]);

  const handleToggleTag = (tagName: string) => {
    setTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !bookmark) return;

    onSave({
      ...bookmark,
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      tags,
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && bookmark && (
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
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative bg-white rounded-3xl w-full max-w-lg mx-4 p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Bookmark</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="w-5 h-5 text-gray-500"
                />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bookmark title"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    URL
                  </label>
                  <div className="relative">
                    <HugeiconsIcon
                      icon={Link01Icon}
                      className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                  />
                </div>

                {availableTags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <TagPicker
                      availableTags={availableTags}
                      selectedTags={tags}
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
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || !url.trim()}
                  className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
