import "./globals.css";
import localFont from "next/font/local";
import { CrowdFundingProvider } from "@/contexts/CrowdFundingProvider";
const neue = localFont({
  src: [
    {
      path: "../public/fonts/woff2/FTRegolaNeue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/woff/FTRegolaNeue-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/FTRegolaNeue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/woff/FTRegolaNeue-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "CryptoFund - Invest in the Future of Cryptocurrencies",
  description:
    "Support innovative blockchain-based projects and help shape the future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CrowdFundingProvider>
        <body data-rk className={neue.className}>
          {children}
        </body>
      </CrowdFundingProvider>
    </html>
  );
}
