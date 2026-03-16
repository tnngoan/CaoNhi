export type ArticleCategory =
  | "market-outlook"
  | "stock-pick"
  | "portfolio-strategy"
  | "sector-report";

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: ArticleCategory;
  publishDate: string;
  summary: string;
  content: string;
  tags: string[];
  relatedStocks: string[];
  readTime: number;
  views: number;
  likes: number;
}

export const categoryLabels: Record<ArticleCategory, { en: string; vi: string }> = {
  "market-outlook": { en: "Market Outlook", vi: "Nhận định thị trường" },
  "stock-pick": { en: "Stock Pick", vi: "Cổ phiếu nổi bật" },
  "portfolio-strategy": { en: "Portfolio Strategy", vi: "Chiến lược danh mục" },
  "sector-report": { en: "Sector Report", vi: "Báo cáo ngành" },
};
