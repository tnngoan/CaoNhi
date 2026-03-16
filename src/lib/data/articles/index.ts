import articlesData from "./data.json";
import type { Article, ArticleCategory } from "./types";

export type { Article, ArticleCategory };
export { categoryLabels } from "./types";

export const articles: Article[] = articlesData as Article[];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getArticlesByMonth(year: number, month: number): Article[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return articles.filter((a) => a.publishDate.startsWith(prefix));
}

export function getArticlesByYear(year: number): Article[] {
  return articles.filter((a) => a.publishDate.startsWith(`${year}-`));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category ||
          a.relatedStocks.some((s) => article.relatedStocks.includes(s)) ||
          a.tags.some((t) => article.tags.includes(t)))
    )
    .slice(0, limit);
}

/** Get unique year-month pairs for the archive navigation */
export function getArchiveMonths(): { year: number; month: number; count: number }[] {
  const map = new Map<string, number>();
  for (const a of articles) {
    const key = a.publishDate.slice(0, 7);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, count]) => ({
      year: parseInt(key.slice(0, 4)),
      month: parseInt(key.slice(5, 7)),
      count,
    }));
}

/** Get unique tags across all articles */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const a of articles) a.tags.forEach((t) => set.add(t));
  return Array.from(set).sort();
}
