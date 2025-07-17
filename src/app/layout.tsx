import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이담리테일",
  description: "단 한 개도 도매 가격에, 이담리테일",
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
