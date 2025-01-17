"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="icon">
          <InfoIcon className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight text-foreground">
            How to Try This Project for Free
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Follow these steps to get started with my project on the Sepolia
            test network.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg">
            <p className="text-sm sm:text-base text-yellow-800 dark:text-yellow-200 font-medium">
              ⚠️ Warning: Please don&apos;t send real money. This is a test
              environment using Sepolia test network only.
            </p>
          </div>
          <ol className="list-decimal list-inside space-y-3 sm:space-y-4">
            <li className="flex items-center space-x-2">
              <span className="text-sm sm:text-base flex-grow">
                Install a wallet (e.g. MetaMask)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-sm sm:text-base flex-grow">
                Connect your wallet to my dApp and change the network to Sepolia
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-sm sm:text-base flex-grow">
                Go to{" "}
                <Link
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  Google Cloud Faucet
                </Link>{" "}
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-sm sm:text-base flex-grow">
                Request test ETH from the faucet
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-sm sm:text-base flex-grow">
                Start interacting with the project!
              </span>
            </li>
          </ol>

          <div className="mt-6">
            <a
              href="https://sepolia.etherscan.io/address/0xeF1459053a78BAFA6e1c80d034E7A68743176827"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-blue-500 hover:text-blue-600 flex items-center gap-2"
            >
              View contract on Etherscan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
