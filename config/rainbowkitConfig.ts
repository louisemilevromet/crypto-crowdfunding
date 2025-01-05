import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Crypto Crowdfunding",
  projectId: "7281077402896999f4b3348d77b83d3f",
  chains: [sepolia],
  ssr: true,
});
