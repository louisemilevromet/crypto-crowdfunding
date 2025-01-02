"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { useContext } from "react";
import { CrowdFundingContext } from "@/contexts/CrowdFundingContext";

export default function Navbar() {
  const { connectWallet, currentAccount } = useContext(CrowdFundingContext);

  return (
    <header className="w-full px-4 lg:px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="max-w-[1082px] w-full mx-auto flex items-center justify-between p-2 border border-border rounded-full mt-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={30} height={30} />

          <span className="text-xl text-foreground">CryptoFund</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={connectWallet}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full"
          >
            {currentAccount
              ? `0x${currentAccount.slice(2, 6)}...${currentAccount.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
