import { Link } from "@/i18n/navigation";
import AnimatedSection from "./AnimatedSection";

interface InsightCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  readMore: string;
  delay?: number;
}

export default function InsightCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  slug,
  readMore,
  delay = 0,
}: InsightCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Link href={`/insights/${slug}`} className="group block">
        <article className="rounded-xl border border-navy-200 bg-white overflow-hidden shadow-sm transition-all hover:border-gold-400 hover:shadow-md">
          {/* Color bar header */}
          <div className="h-2 gold-gradient" />
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-navy-100 px-3 py-1 font-medium text-navy-600">
                {category}
              </span>
              <span className="text-navy-400">
                {date} · {readTime}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 transition-colors group-hover:text-gold-600">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600 line-clamp-3">
              {excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-500 transition-colors group-hover:text-gold-600">
              {readMore}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </article>
      </Link>
    </AnimatedSection>
  );
}
