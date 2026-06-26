export type Author = {
  name: string;
  role: string;
  initials: string;
};

export type BlogMeta = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  readTime: string;
};

export type BlogBodyProps = { styles: Record<string, string> };
