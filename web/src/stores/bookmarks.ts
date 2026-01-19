import { create } from 'zustand';
import { generateId } from '@/lib/utils';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  favicon: string;
  tags: string[];
  collectionId?: string;
  isFavorite: boolean;
  createdAt: string;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;
  getBookmarkById: (id: string) => Bookmark | undefined;
  getBookmarksByCollection: (collectionId: string) => Bookmark[];
  toggleFavorite: (id: string) => void;
  addToCollection: (id: string, collectionId: string) => void;
  removeFromCollection: (id: string) => void;
}

const initialBookmarks: Bookmark[] = [
  {
    id: "bm-1",
    title: "React Documentation",
    url: "https://react.dev",
    description: "The library for web and native user interfaces",
    favicon: "https://react.dev/favicon.ico",
    tags: ["react", "docs"],
    collectionId: "coll-1",
    isFavorite: false,
    createdAt: "2026-01-10",
  },
  {
    id: "bm-2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Rapidly build modern websites without ever leaving your HTML",
    favicon: "https://tailwindcss.com/favicons/favicon.ico",
    tags: ["css", "design"],
    collectionId: "coll-2",
    isFavorite: true,
    createdAt: "2026-01-09",
  },
  {
    id: "bm-3",
    title: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software",
    favicon: "https://github.com/favicon.ico",
    tags: ["dev", "git"],
    isFavorite: false,
    createdAt: "2026-01-08",
  },
  {
    id: "bm-4",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook",
    description: "The TypeScript Handbook is a comprehensive guide to the TypeScript language",
    favicon: "https://www.typescriptlang.org/favicon.ico",
    tags: ["typescript", "docs"],
    collectionId: "coll-1",
    isFavorite: false,
    createdAt: "2026-01-07",
  },
  {
    id: "bm-5",
    title: "Vercel",
    url: "https://vercel.com",
    description: "Develop. Preview. Ship.",
    favicon: "https://vercel.com/favicon.ico",
    tags: ["hosting", "deploy"],
    collectionId: "coll-3",
    isFavorite: true,
    createdAt: "2026-01-06",
  },
];

export const useBookmarks = create<BookmarksState>((set, get) => ({
  bookmarks: initialBookmarks,
  
  addBookmark: (bookmark) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      bookmarks: [...state.bookmarks, newBookmark],
    }));
  },
  
  updateBookmark: (id, updates) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      ),
    }));
  },
  
  deleteBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    }));
  },
  
  getBookmarkById: (id) => {
    return get().bookmarks.find((bookmark) => bookmark.id === id);
  },
  
  getBookmarksByCollection: (collectionId) => {
    return get().bookmarks.filter((bookmark) => bookmark.collectionId === collectionId);
  },
  
  toggleFavorite: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, isFavorite: !bookmark.isFavorite } : bookmark
      ),
    }));
  },
  
  addToCollection: (id, collectionId) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, collectionId } : bookmark
      ),
    }));
  },
  
  removeFromCollection: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, collectionId: undefined } : bookmark
      ),
    }));
  },
}));