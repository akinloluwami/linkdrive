import { create } from 'zustand';
import { generateId } from '@/lib/utils';

export interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  isPublic: boolean;
  createdAt: string;
}

interface CollectionsState {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  getCollectionById: (id: string) => Collection | undefined;
}

const initialCollections: Collection[] = [
  {
    id: "coll-1",
    name: "Development",
    description: "Programming resources and documentation",
    color: "#3b82f6",
    isPublic: false,
    createdAt: "2026-01-10",
  },
  {
    id: "coll-2",
    name: "Design",
    description: "UI/UX inspiration and design tools",
    color: "#ec4899",
    isPublic: true,
    createdAt: "2026-01-09",
  },
  {
    id: "coll-3",
    name: "Tools",
    description: "Useful development and productivity tools",
    color: "#10b981",
    isPublic: false,
    createdAt: "2026-01-08",
  },
  {
    id: "coll-4",
    name: "Learning",
    description: "Educational resources and tutorials",
    color: "#f59e0b",
    isPublic: true,
    createdAt: "2026-01-07",
  },
  {
    id: "coll-5",
    name: "Inspiration",
    description: "Creative inspiration and ideas",
    color: "#8b5cf6",
    isPublic: false,
    createdAt: "2026-01-06",
  },
  {
    id: "coll-6",
    name: "Marketing",
    description: "Marketing strategies and resources",
    color: "#ef4444",
    isPublic: true,
    createdAt: "2026-01-05",
  },
  {
    id: "coll-7",
    name: "Business",
    description: "Business and entrepreneurship resources",
    color: "#06b6d4",
    isPublic: false,
    createdAt: "2026-01-04",
  },
  {
    id: "coll-8",
    name: "Health",
    description: "Health and wellness resources",
    color: "#84cc16",
    isPublic: true,
    createdAt: "2026-01-03",
  },
  {
    id: "coll-9",
    name: "Finance",
    description: "Financial planning and investment resources",
    color: "#f97316",
    isPublic: false,
    createdAt: "2026-01-02",
  },
  {
    id: "coll-10",
    name: "Travel",
    description: "Travel guides and destination inspiration",
    color: "#6366f1",
    isPublic: true,
    createdAt: "2026-01-01",
  },
  {
    id: "coll-11",
    name: "Photography",
    description: "Photography techniques and inspiration",
    color: "#db2777",
    isPublic: false,
    createdAt: "2025-12-31",
  },
  {
    id: "coll-12",
    name: "Music",
    description: "Music production and discovery resources",
    color: "#059669",
    isPublic: true,
    createdAt: "2025-12-30",
  },
  {
    id: "coll-13",
    name: "Gaming",
    description: "Gaming news and reviews",
    color: "#dc2626",
    isPublic: false,
    createdAt: "2025-12-29",
  },
  {
    id: "coll-14",
    name: "Science",
    description: "Scientific articles and research",
    color: "#0891b2",
    isPublic: true,
    createdAt: "2025-12-28",
  },
  {
    id: "coll-15",
    name: "Cooking",
    description: "Recipes and cooking techniques",
    color: "#65a30d",
    isPublic: false,
    createdAt: "2025-12-27",
  },
];

export const useCollections = create<CollectionsState>((set, get) => ({
  collections: initialCollections,
  
  addCollection: (collection) => {
    const newCollection: Collection = {
      ...collection,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      collections: [...state.collections, newCollection],
    }));
  },
  
  updateCollection: (id, updates) => {
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === id ? { ...collection, ...updates } : collection
      ),
    }));
  },
  
  deleteCollection: (id) => {
    set((state) => ({
      collections: state.collections.filter((collection) => collection.id !== id),
    }));
  },
  
  getCollectionById: (id) => {
    return get().collections.find((collection) => collection.id === id);
  },
}));