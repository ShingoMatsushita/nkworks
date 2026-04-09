import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "直樹バイク | バイク修理・整備・中古車販売",
    template: "%s | 直樹バイク",
  },
  description: "バイク修理・整備、中古車販売を行っています。確かな技術と丁寧なサービスで、お客様のバイクライフをサポートします。",
  keywords: ["バイク", "修理", "整備", "中古車", "カスタム", "直樹バイク"],
  authors: [{ name: "直樹バイク" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "直樹バイク",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
