"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

export default function StatCard({
  value,
  suffix = "+",
  prefix = "",
  label,
  delay = 0,
}: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <AnimatedSection delay={delay}>
      <div
        ref={ref}
        className="rounded-xl border border-navy-200 bg-white p-6 text-center shadow-sm"
      >
        <div className="font-heading text-3xl font-bold text-gold-600 md:text-4xl">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </div>
        <p className="mt-2 text-sm text-navy-600">{label}</p>
      </div>
    </AnimatedSection>
  );
}
