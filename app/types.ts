export interface BookmarkProps {
  id: string;
  url: string;
  title: string;
  favicon: string;
  description: string;
  ogImage: string;
  createdAt: string;
}

export interface CollectionProps {
  id: string;
  name: string;
  lastUpdated: string;
  linksCount: number;
}
