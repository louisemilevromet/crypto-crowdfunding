import "./globals.css";
import localFont from "next/font/local";
import { Web3Provider } from "@/contexts/Web3Provider";
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
  title: "CryptoFund | CrowdFunding",
  description:
    "Support innovative blockchain-based projects and help shape the future.",
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "32x32" },
      { url: "/assets/icon.png", sizes: "192x192" },
    ],
    apple: [{ url: "/assets/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crypto-crowdfunding-three.vercel.app/",
    siteName: "CryptoFund | CrowdFunding",
    title: "CryptoFund | CrowdFunding",
    description:
      "Support innovative blockchain-based projects and help shape the future.",
    images: [
      {
        url: "https://crypto-crowdfunding-three.vercel.app/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptoFund Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoFund | CrowdFunding",
    description:
      "Support innovative blockchain-based projects and help shape the future.",
    creator: "@votrecompte",
    images: [
      "https://crypto-crowdfunding-three.vercel.app/assets/twitter-image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body data-rk className={neue.className}>
        <Web3Provider>
          <CrowdFundingProvider>{children}</CrowdFundingProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
