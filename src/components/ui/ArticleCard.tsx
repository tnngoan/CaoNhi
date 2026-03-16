import { Link } from "@/i18n/navigation";
import AnimatedSection from "./AnimatedSection";
import type { ArticleCategory } from "@/lib/data/articles/types";
import { categoryLabels } from "@/lib/data/articles/types";

interface ArticleCardProps {
  title: string;
  summary: string;
  category: ArticleCategory;
  publishDate: string;
  readTime: number;
  slug: string;
  views: number;
  likes: number;
  tags: string[];
  relatedStocks: string[];
  locale: "en" | "vi";
  delay?: number;
}

const categoryColors: Record<ArticleCategory, string> = {
  "market-outlook": "bg-blue-100 text-blue-700",
  "stock-pick": "bg-emerald-100 text-emerald-700",
  "portfolio-strategy": "bg-purple-100 text-purple-700",
  "sector-report": "bg-amber-100 text-amber-700",
};

export default function ArticleCard({
  title,
  summary,
  category,
  publishDate,
  readTime,
  slug,
  views,
  likes,
  tags,
  relatedStocks,
  locale,
  delay = 0,
}: ArticleCardProps) {
  const dateFormatted = new Intl.DateTimeFormat(
    locale === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  ).format(new Date(publishDate));

  return (
    <AnimatedSection delay={delay}>
      <Link href={`/archive/${slug}`} className="group block">
        <article className="rounded-xl border border-navy-200 bg-white p-5 shadow-sm transition-all hover:border-gold-400 hover:shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${categoryColors[category]}`}
            >
              {categoryLabels[category][locale]}
            </span>
            <span className="text-navy-400">{dateFormatted}</span>
            <span className="text-navy-300">·</span>
            <span className="text-navy-400">{readTime} phút đọc</span>
          </div>

          {/* Title */}
          <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-gold-600">
            {title}
          </h3>

          {/* Summary */}
          <p className="mt-2 text-sm leading-relaxed text-navy-600 line-clamp-2">
            {summary}
          </p>

          {/* Stock tickers */}
          {relatedStocks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {relatedStocks.map((ticker) => (
                <span
                  key={ticker}
                  className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold text-navy-500"
                >
                  {ticker}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-navy-100 pt-3">
            <div className="flex items-center gap-3 text-xs text-navy-400">
              {/* Views */}
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {views}
              </span>
              {/* Likes */}
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                {likes}
              </span>
            </div>
            <span className="text-xs font-medium text-gold-500 transition-colors group-hover:text-gold-600">
              Đọc tiếp →
            </span>
          </div>
        </article>
      </Link>
    </AnimatedSection>
  );
}
