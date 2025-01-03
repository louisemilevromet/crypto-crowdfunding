"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="max-w-[1082px] mx-auto">
        <div className="flex mx-4 items-center justify-between p-2 border border-border rounded-full mt-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={30} height={30} />

            <span className="text-xl text-foreground">CryptoFund</span>
          </Link>
          <div className="flex items-center gap-4">
            <ConnectButton accountStatus="address" showBalance={false} />
          </div>
        </div>
      </div>
    </header>
  );
}
