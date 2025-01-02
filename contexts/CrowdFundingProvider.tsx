"use client";

import { useState, useEffect, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers, BrowserProvider } from "ethers";
import { CrowdFundingAddress, CrowdFundingABI } from "./contant";
import { CrowdFundingContext, Donation } from "./CrowdFundingContext";
import { Campaign } from "@/types";

interface Props {
  children: ReactNode;
}

const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingProvider = ({ children }: Props) => {
  const titleData = "CrowdFunding contract";
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");

  const createCampaign = async (campaign: {
    title: string;
    description: string;
    target: string;
    deadline: Date;
  }) => {
    try {
      const { title, description, target, deadline } = campaign;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      if (!currentAccount) throw new Error("No account connected");

      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.parseUnits(target, 18),
        Math.floor(new Date(deadline).getTime() / 1000),
        {
          gasLimit: 1000000,
          from: currentAccount,
        }
      );

      const receipt = await transaction.wait();
      console.log("Transaction successful", receipt);
      return receipt;
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
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

      // Sort campaigns : non funded first, then by deadline
      return formattedCampaigns.sort((a: Campaign, b: Campaign) => {
        // If one is funded and the other is not, put the non-funded first
        if (a.isFullyFunded && !b.isFullyFunded) return 1;
        if (!a.isFullyFunded && b.isFullyFunded) return -1;
        // If both have the same funding status, sort by deadline
        return Number(a.deadline) - Number(b.deadline);
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const allCampaigns = await contract.getCampaigns();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const filteredCampaigns = allCampaigns.filter((campaign: any) => {
        console.log("Comparing:", {
          campaignOwner: campaign.owner.toLowerCase(),
          currentAccount: currentAccount?.toLowerCase(),
        });
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
        return Number(a.deadline) - Number(b.deadline);
      });
    } catch (error) {
      console.error("Error getting user campaigns:", error);
      return [];
    }
  };

  const donate = async (id: number, amount: string) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const campaignData = await contract.donateToCampaign(id, {
        value: ethers.parseEther(amount),
      });

      await campaignData.wait();
      location.reload();
      return campaignData;
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const getDonations = async (id: number): Promise<Donation[]> => {
    try {
      const provider = new ethers.JsonRpcProvider();
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
      console.error("Error getting donations:", error);
      return [];
    }
  };

  const checkWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        setOpenError(true);
        setError("Please install Metamask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    checkWalletConnected();
  }, []);

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
