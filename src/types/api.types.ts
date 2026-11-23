export interface CaseStudy {
  title: string;
  /** search result title (≤ 42 chars, the layout adds " | Blueport Studio") and meta description (140–160 chars) */
  seo: { title: string; description: string };
  client: string;
  industry: string;
  context: string;
  challenge: string;
  strategy: string;
  implementation: string;
  stack: string;
  results: string;
  lessons: string;
}
