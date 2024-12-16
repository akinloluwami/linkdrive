export interface BookmarkProps {
  href: string;
  title: string;
  favicon: string;
  description: string;
  ogImage: string;
  date: string;
}

export interface CollectionProps {
  id: string;
  name: string;
  lastUpdated: string;
  linksCount: number;
}
