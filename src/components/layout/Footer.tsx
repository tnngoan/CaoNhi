import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const quickLinks = [
  { href: "/about", key: "about" },
  { href: "/philosophy", key: "philosophy" },
  { href: "/insights", key: "insights" },
  { href: "/research", key: "research" },
  { href: "/track-record", key: "trackRecord" },
] as const;

const serviceLinks = [
  { key: "stockBrokerage" },
  { key: "portfolioAdvisory" },
  { key: "marketResearch" },
  { key: "sectorAnalysis" },
  { key: "investorEducation" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="container-main py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2 font-heading">
              <div className="flex h-8 w-8 items-center justify-center rounded-md gold-gradient">
                <span className="text-sm font-bold text-navy-900">CN</span>
              </div>
              <span className="text-lg font-semibold text-white">Cao Nhi</span>
            </div>
            <p className="text-sm leading-relaxed text-navy-300">
              {t("about")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 transition-colors hover:text-gold-400"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <span className="text-sm text-navy-300">{t(link.key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-3 text-sm text-navy-300">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                nhi.ncpn@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                MB Securities — Q.1, TP.HCM
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="text-navy-400 transition-colors hover:text-gold-400"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-navy-400 transition-colors hover:text-gold-400"
                  aria-label="Zalo"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                    <text
                      x="12"
                      y="16"
                      textAnchor="middle"
                      fontSize="10"
                      fill="currentColor"
                      fontWeight="bold"
                    >
                      Z
                    </text>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="container-main py-6">
          <p className="text-center text-xs text-navy-400">{t("copyright")}</p>
          <p className="mt-2 text-center text-xs text-navy-500">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
