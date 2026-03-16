"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/philosophy", key: "philosophy" },
  { href: "/insights", key: "insights" },
  { href: "/archive", key: "archive" },
  { href: "/research", key: "research" },
  { href: "/services", key: "services" },
  { href: "/track-record", key: "trackRecord" },
  { href: "/testimonials", key: "testimonials" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-navy-900/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container-main">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-heading"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md gold-gradient lg:h-10 lg:w-10">
                <span className="text-sm font-bold text-navy-900 lg:text-base">
                  CN
                </span>
              </div>
              <span className="text-lg font-semibold lg:text-xl">Cao Nhi</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-gold-400"
                      : "text-navy-200 hover:text-white"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={switchLocale}
                className="rounded-md border border-navy-400 px-3 py-1.5 text-xs font-semibold text-navy-200 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                {t("language")}
              </button>

              <Link
                href="/contact"
                className="hidden rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-navy-900 transition-transform hover:scale-105 sm:inline-block"
              >
                {t("bookConsultation")}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex flex-col gap-1.5 p-2 xl:hidden"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={
                    isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  className="block h-0.5 w-6 bg-white"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-6 bg-white"
                />
                <motion.span
                  animate={
                    isMobileOpen
                      ? { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-0.5 w-6 bg-white"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-lg xl:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "text-xl font-medium transition-colors",
                      pathname === link.href
                        ? "text-gold-400"
                        : "text-navy-200 hover:text-white"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-4 inline-block rounded-md gold-gradient px-6 py-3 text-lg font-semibold text-navy-900"
                >
                  {t("bookConsultation")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
