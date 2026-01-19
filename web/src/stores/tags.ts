import { create } from 'zustand';
import { generateId } from '@/lib/utils';

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

interface TagsState {
  tags: Tag[];
  addTag: (tag: Omit<Tag, 'id' | 'createdAt'>) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  getTagById: (id: string) => Tag | undefined;
}

const initialTags: Tag[] = [
  { id: "tag-1", name: "react", color: "#61dafb", createdAt: "2026-01-10" },
  { id: "tag-2", name: "typescript", color: "#3178c6", createdAt: "2026-01-09" },
  { id: "tag-3", name: "javascript", color: "#f7df1e", createdAt: "2026-01-08" },
  { id: "tag-4", name: "css", color: "#264de4", createdAt: "2026-01-07" },
  { id: "tag-5", name: "design", color: "#ff6b6b", createdAt: "2026-01-06" },
  { id: "tag-6", name: "tools", color: "#10b981", createdAt: "2026-01-05" },
  { id: "tag-7", name: "docs", color: "#8b5cf6", createdAt: "2026-01-04" },
  { id: "tag-8", name: "tutorial", color: "#f59e0b", createdAt: "2026-01-03" },
  { id: "tag-9", name: "api", color: "#ec4899", createdAt: "2026-01-02" },
  { id: "tag-10", name: "database", color: "#06b6d4", createdAt: "2026-01-01" },
  { id: "tag-11", name: "hosting", color: "#84cc16", createdAt: "2025-12-31" },
  { id: "tag-12", name: "security", color: "#ef4444", createdAt: "2025-12-30" },
];

export const useTags = create<TagsState>((set, get) => ({
  tags: initialTags,
  
  addTag: (tag) => {
    const newTag: Tag = {
      ...tag,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      tags: [...state.tags, newTag],
    }));
  },
  
  updateTag: (id, updates) => {
    set((state) => ({
      tags: state.tags.map((tag) =>
        tag.id === id ? { ...tag, ...updates } : tag
      ),
    }));
  },
  
  deleteTag: (id) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    }));
  },
  
  getTagById: (id) => {
    return get().tags.find((tag) => tag.id === id);
  },
}));