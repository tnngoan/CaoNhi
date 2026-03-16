import AnimatedSection from "./AnimatedSection";

interface StockCardProps {
  company: string;
  ticker: string;
  sector: string;
  sectorColor: string;
  thesis: string;
  risks: string;
  delay?: number;
}

export default function StockCard({
  company,
  ticker,
  sector,
  sectorColor,
  thesis,
  risks,
  delay = 0,
}: StockCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group rounded-xl border border-navy-200 bg-white p-6 shadow-sm transition-all hover:border-gold-400 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-navy-900">
              {company}
            </h3>
            <span className="font-mono text-sm font-semibold text-gold-500">
              {ticker}
            </span>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${sectorColor}`}
          >
            {sector}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-navy-700">Investment Thesis</p>
          <p className="mt-1 text-sm text-navy-600">{thesis}</p>
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-red-600">Key Risks</p>
          <p className="mt-1 text-sm text-navy-500">{risks}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}
