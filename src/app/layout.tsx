import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cao Nhi — Stock Broker | MB Securities (MBS)",
    template: "%s | Cao Nhi — MBS",
  },
  description:
    "Cao Nhi — Chuyên viên môi giới chứng khoán tại MB Securities (MBS) với 5+ năm kinh nghiệm. Tư vấn đầu tư chuyên nghiệp, phân tích cổ phiếu, nghiên cứu thị trường Việt Nam.",
  keywords: [
    "Vietnam stock broker",
    "Vietnam equity advisor",
    "MBS broker",
    "Vietnam stock market investment",
    "Cao Nhi MBS",
    "chứng khoán Việt Nam",
    "môi giới chứng khoán",
    "tư vấn đầu tư",
  ],
  authors: [{ name: "Cao Nhi" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "Cao Nhi — MBS Stock Broker",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
