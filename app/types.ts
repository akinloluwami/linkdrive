export interface BookmarkProps {
  href: string;
  title: string;
  favicon: string;
  description: string;
  image: string;
  date: string;
}

export interface CollectionProps {
  id: string;
  name: string;
  lastUpdated: string;
  linksCount: number;
}
