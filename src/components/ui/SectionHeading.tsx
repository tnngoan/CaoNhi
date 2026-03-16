import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={centered ? "text-center" : ""}>
      <h2
        className={`font-heading text-3xl font-bold md:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full gold-gradient" />
      {subtitle && (
        <p
          className={`mx-auto mt-6 max-w-2xl text-base md:text-lg ${
            light ? "text-navy-300" : "text-navy-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
