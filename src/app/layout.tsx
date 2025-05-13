import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "슈퍼최저가몰",
  description: "판촉물 대량발주 전문업체 슈퍼최저가몰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
