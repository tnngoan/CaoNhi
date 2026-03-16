import AnimatedSection from "./AnimatedSection";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  delay = 0,
}: ServiceCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group rounded-xl border border-navy-200 bg-white p-6 shadow-sm transition-all hover:border-gold-400 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-gold-500 transition-colors group-hover:gold-gradient group-hover:text-navy-900">
          {icon}
        </div>
        <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-600">
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
}
