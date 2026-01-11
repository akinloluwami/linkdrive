import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  LabelImportantIcon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Tag {
  name: string;
  color: string;
}

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tags: Tag[]) => void;
}

const colors = [
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
  "#f97316",
];

export function CreateTagModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTagModalProps) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [tags, setTags] = useState<Tag[]>([]);

  const addTag = () => {
    const tagName = name.trim().replace(/^#/, "");
    if (!tagName) return;
    if (tags.some((t) => t.name.toLowerCase() === tagName.toLowerCase())) return;

    setTags((prev) => [...prev, { name: tagName, color: selectedColor }]);
    setName("");
    // Cycle to next color for convenience
    const currentIndex = colors.indexOf(selectedColor);
    setSelectedColor(colors[(currentIndex + 1) % colors.length]);
  };

  const removeTag = (tagName: string) => {
    setTags((prev) => prev.filter((t) => t.name !== tagName));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add current input if there's text
    const finalTags = [...tags];
    const tagName = name.trim().replace(/^#/, "");
    if (tagName && !tags.some((t) => t.name.toLowerCase() === tagName.toLowerCase())) {
      finalTags.push({ name: tagName, color: selectedColor });
    }

    if (finalTags.length === 0) return;

    onCreate(finalTags);
    setName("");
    setSelectedColor(colors[0]);
    setTags([]);
    onClose();
  };

  const handleClose = () => {
    setName("");
    setSelectedColor(colors[0]);
    setTags([]);
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
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative bg-white rounded-3xl w-full max-w-md mx-4 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Tags</h2>
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
                    Tag Name
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        #
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="tag-name"
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        autoFocus
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!name.trim()}
                      className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                    >
                      <HugeiconsIcon
                        icon={Add01Icon}
                        className="w-4 h-4 text-gray-600"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Press Enter or click + to add multiple tags
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <motion.button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-8 h-8 rounded-lg transition-shadow ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-gray-400"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {tags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags to create ({tags.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {tags.map((tag) => (
                          <motion.div
                            key={tag.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            layout
                            className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg text-sm"
                            style={{ backgroundColor: `${tag.color}20` }}
                          >
                            <HugeiconsIcon
                              icon={LabelImportantIcon}
                              className="w-3.5 h-3.5"
                              style={{ color: tag.color }}
                            />
                            <span
                              className="font-medium"
                              style={{ color: tag.color }}
                            >
                              #{tag.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag.name)}
                              className="p-0.5 hover:bg-black/10 rounded transition-colors ml-1"
                            >
                              <HugeiconsIcon
                                icon={Cancel01Icon}
                                className="w-3.5 h-3.5"
                                style={{ color: tag.color }}
                              />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
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
                  disabled={tags.length === 0 && !name.trim()}
                  className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium text-sm"
                >
                  Create {tags.length > 0 ? `${tags.length} Tag${tags.length > 1 ? "s" : ""}` : "Tag"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
