export type DocBodyProps = { styles: Record<string, string>; goTo: (id: string) => void };

export type DocMeta = {
  section: string;
  title: string;
  lead: string;
  toc: string[];
};
