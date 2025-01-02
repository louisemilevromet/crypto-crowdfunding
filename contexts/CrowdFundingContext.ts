import { createContext } from "react";
import { Campaign } from "@/types";

export interface Donation {
  donator: string;
  donation: string;
}

export interface CrowdFundingContextType {
  titleData: string;
  currentAccount: string | null;
  createCampaign: (campaign: {
    title: string;
    description: string;
    target: string;
    deadline: Date;
  }) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (id: number, amount: string) => Promise<any>;
  getDonations: (id: number) => Promise<Donation[]>;
  connectWallet: () => Promise<void>;
}

// Create context with default values
export const CrowdFundingContext = createContext<CrowdFundingContextType>({
  titleData: "",
  currentAccount: null,
  createCampaign: async () => {},
  getCampaigns: async () => [],
  getUserCampaigns: async () => [],
  donate: async () => {},
  getDonations: async () => [],
  connectWallet: async () => {},
});

// Add this type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}
