import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/data/articles";
import ArchiveArticleView from "./ArchiveArticleView";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArchiveArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "vi";
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <ArchiveArticleView article={article} related={related} locale={locale} />
  );
}
