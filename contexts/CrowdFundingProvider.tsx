"use client";

import { useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { CrowdFundingAddress, CrowdFundingABI } from "./contant";
import { CrowdFundingContext, Donation } from "./CrowdFundingContext";
import { Campaign } from "@/types";
import { useAccount, useWalletClient } from "wagmi";
interface Props {
  children: ReactNode;
}

const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const titleData = "CrowdFunding contract";
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { address, isConnected, status } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // JsonRpcProvider is used to read only
  // BrowserProvider is used to write

  // Function to create a campaign
  const createCampaign = async (campaign: {
    title: string;
    description: string;
    target: string;
    deadline: Date;
  }) => {
    if (!walletClient) {
      alert("You must connect your wallet to create a campaign.");
      return;
    }

    try {
      const { title, description, target, deadline } = campaign;

      const provider = new ethers.BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.createCampaign(
        await signer.getAddress(),
        title,
        description,
        ethers.parseUnits(target, 18),
        Math.floor(new Date(deadline).getTime() / 1000),
        {
          gasLimit: 1000000,
        }
      );

      const receipt = await transaction.wait();
      return receipt;
    } catch (error) {
      return null;
    }
  };

  // Function to get all campaigns
  const getCampaigns = async (): Promise<Campaign[]> => {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_API_URL as string
    );
    const contract = fetchContract(provider);

    try {
      const campaigns = await contract.getCampaigns();
      const formattedCampaigns = campaigns.map(
        (campaign: any, index: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.formatEther(campaign.target.toString()),
          deadline: Number(campaign.deadline),
          amountCollected: ethers.formatEther(
            campaign.amountCollected.toString()
          ),
          id: index,
          isFullyFunded:
            Number(ethers.formatEther(campaign.amountCollected.toString())) >=
            Number(ethers.formatEther(campaign.target.toString())),
        })
      );

      // Sort campaigns: non funded first, then by deadline
      return formattedCampaigns.sort((a: Campaign, b: Campaign) => {
        // If one is funded and the other isn't, put the non-funded one first
        if (a.isFullyFunded && !b.isFullyFunded) return 1;
        if (!a.isFullyFunded && b.isFullyFunded) return -1;
        // If both have the same funding status, sort by deadline
        return a.deadline - b.deadline;
      });
    } catch (error) {
      throw error;
    }
  };

  // Function to get user campaigns
  const getUserCampaigns = async (): Promise<Campaign[]> => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_API_URL as string
      );
      const contract = fetchContract(provider);

      const allCampaigns = await contract.getCampaigns();

      const filteredCampaigns = allCampaigns.filter((campaign: any) => {
        return campaign.owner.toLowerCase() === currentAccount?.toLowerCase();
      });

      const formattedCampaigns = filteredCampaigns.map(
        (campaign: any, index: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.formatEther(campaign.target.toString()),
          deadline: Number(campaign.deadline),
          amountCollected: ethers.formatEther(
            campaign.amountCollected.toString()
          ),
          id: index,
          isFullyFunded:
            Number(ethers.formatEther(campaign.amountCollected.toString())) >=
            Number(ethers.formatEther(campaign.target.toString())),
        })
      );

      return formattedCampaigns.sort((a: Campaign, b: Campaign) => {
        if (a.isFullyFunded && !b.isFullyFunded) return 1;
        if (!a.isFullyFunded && b.isFullyFunded) return -1;
        return a.deadline - b.deadline;
      });
    } catch (error) {
      throw error;
    }
  };

  // Function to donate to a campaign
  const donate = async (id: number, amount: string) => {
    if (!signer) throw new Error("Signer non disponible");

    try {
      const contract = fetchContract(signer);

      const campaignData = await contract.donateToCampaign(id, {
        value: ethers.parseEther(amount),
      });

      await campaignData.wait();
      location.reload();
      return campaignData;
    } catch (error) {
      throw null;
    }
  };

  // Function to get donations for a campaign
  const getDonations = async (id: number): Promise<Donation[]> => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_API_URL as string
      );
      const contract = fetchContract(provider);

      const donations = await contract.getDonations(id);
      const parsedDonations: Donation[] = [];

      for (let i = 0; i < donations[0].length; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      throw error;
    }
  };

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      throw null;
    }
  };

  // Check wallet connection on mount
  useEffect(() => {
    if (isConnected && address) {
      setCurrentAccount(address);
    }
  }, [isConnected, address, status]);

  useEffect(() => {
    if (walletClient) {
      const browserProvider = new ethers.BrowserProvider(walletClient);
      setProvider(browserProvider);
      browserProvider.getSigner().then(setSigner);
    }
  }, [walletClient]);

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
