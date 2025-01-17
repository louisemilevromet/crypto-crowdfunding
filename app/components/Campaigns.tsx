"use client";

import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "@/contexts/CrowdFundingContext";
import { Campaign } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonationModal } from "./DonationModal";

const Campaigns = () => {
  const { getCampaigns, getUserCampaigns } = useContext(CrowdFundingContext);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [visibleCampaigns, setVisibleCampaigns] = useState(4);
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const fetchedCampaigns = await getCampaigns();
        setCampaigns(fetchedCampaigns);
        const fetchedMyCampaigns = await getUserCampaigns();
        setMyCampaigns(fetchedMyCampaigns);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch campaigns"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [getCampaigns, getUserCampaigns]);

  const toggleCampaignsVisibility = () => {
    if (showAllCampaigns) {
      setVisibleCampaigns(4);
      setShowAllCampaigns(false);
    } else {
      setVisibleCampaigns(campaigns.length);
      setShowAllCampaigns(true);
    }
  };

  if (loading)
    return (
      <section className="w-full py-16 px-4 lg:px-6">
        <div className="max-w-[1082px] mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            Loading campaigns...
          </h2>
        </div>
      </section>
    );
  if (error)
    return (
      <section className="w-full py-16 px-4 lg:px-6">
        <div className="max-w-[1082px] mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            Error: {error}
          </h2>
        </div>
      </section>
    );
  if (campaigns.length === 0)
    return (
      <section className="w-full py-16 px-4 lg:px-6">
        <div className="max-w-[1082px] mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            No campaigns found
          </h2>
        </div>
      </section>
    );

  return (
    <section className="w-full py-16 px-4 lg:px-6">
      <div className="max-w-[1082px] mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          All Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.slice(0, visibleCampaigns).map((campaign) => (
            <Card
              key={campaign.id}
              className="w-full overflow-hidden transition-all duration-300 bg-[#f7f6f6] rounded-xl border border-[#e5e7eb]"
            >
              <CardHeader className="p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-foreground uppercase truncate">
                    {campaign.title}
                  </CardTitle>
                  <div className="text-sm bg-[#2B2BFF] bg-opacity-20 text-[#2B2BFF] px-3 py-1 rounded-full flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {Math.max(
                      0,
                      Math.ceil(
                        (Number(campaign.deadline) * 1000 - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{" "}
                    {Math.ceil(
                      (Number(campaign.deadline) * 1000 - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    ) === 1
                      ? "Day"
                      : "Days"}{" "}
                    left
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {campaign.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Progress</span>
                    <span className="text-foreground">
                      {(
                        (Number(campaign.amountCollected) /
                          Number(campaign.target)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (Number(campaign.amountCollected) /
                        Number(campaign.target)) *
                      100
                    }
                    className="h-2 bg-secondary"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {campaign.amountCollected} ETH
                    </span>
                    <span className="text-muted-foreground">
                      {campaign.target} ETH
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground truncate">
                    <span className="font-medium">Owner:</span> {campaign.owner}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setIsModalOpen(true);
                  }}
                  disabled={
                    campaign.amountCollected === campaign.target ? true : false
                  }
                  className="w-full bg-[#2B2BFF] hover:bg-[#2B2BFF]/90 text-white"
                >
                  {campaign.amountCollected === campaign.target
                    ? "Campaign Completed"
                    : "Donate"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {campaigns.length > 4 && (
          <div className="mt-8 text-center">
            <Button
              onClick={toggleCampaignsVisibility}
              className="bg-[#2B2BFF] hover:bg-[#2B2BFF]/90 text-white"
            >
              {showAllCampaigns ? "See Less" : "See More"}
            </Button>
          </div>
        )}
      </div>
      {selectedCampaign && (
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaign={selectedCampaign}
        />
      )}
      <div className="max-w-[1082px] mx-auto mt-24">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          My Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="w-full overflow-hidden transition-all duration-300 bg-[#f7f6f6] rounded-xl"
            >
              <CardHeader className="p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-foreground uppercase truncate">
                    {campaign.title}
                  </CardTitle>
                  <div className="text-sm bg-[#2B2BFF] bg-opacity-20 text-[#2B2BFF] px-3 py-1 rounded-full flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {Math.max(
                      0,
                      Math.ceil(
                        (Number(campaign.deadline) * 1000 - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{" "}
                    {Math.ceil(
                      (Number(campaign.deadline) * 1000 - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    ) === 1
                      ? "Day"
                      : "Days"}{" "}
                    left
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {campaign.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Progress</span>
                    <span className="text-foreground">
                      {(
                        (Number(campaign.amountCollected) /
                          Number(campaign.target)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (Number(campaign.amountCollected) /
                        Number(campaign.target)) *
                      100
                    }
                    className="h-2 bg-secondary"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {campaign.amountCollected} ETH
                    </span>
                    <span className="text-muted-foreground">
                      {campaign.target} ETH
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground truncate">
                    <span className="font-medium">Owner:</span> {campaign.owner}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
