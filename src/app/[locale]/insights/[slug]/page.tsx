import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { insights } from "@/lib/data/insights";
import InsightArticle from "./InsightArticle";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "vi";
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    notFound();
  }

  return <InsightArticle insight={insight} locale={locale} />;
}
