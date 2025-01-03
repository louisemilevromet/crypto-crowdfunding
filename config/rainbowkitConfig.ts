import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "viem";
const localHardhat: Chain = {
  id: 31337,
  name: "Hardhat Local",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: "Crypto Crowdfunding",
  projectId: "7281077402896999f4b3348d77b83d3f",
  chains: [localHardhat],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
