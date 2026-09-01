export type ServiceSection = {
  title: string;
  body: string;
};

export type Service = {
  order: number;
  slug: string;
  label: string;
  cardHeadline: string;
  preview: string;
  summary: string;
  detailDescription: string;
  tagline: string;
  accent: string;
  image: string;
  imagePosition?: string;
  sections: ServiceSection[];
};
