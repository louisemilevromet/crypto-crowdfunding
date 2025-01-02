"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CrowdFundingContext } from "@/contexts/CrowdFundingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CrowdFundingCard() {
  const { createCampaign } = useContext(CrowdFundingContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCampaign(formData as any);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white/90 text-black">
          Create a campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
            Create your fundraising campaign
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your campaign title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign"
              className="min-h-[120px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Target Amount (ETH)</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-8"
                  value={formData.target}
                  onChange={(e) =>
                    setFormData({ ...formData, target: e.target.value })
                  }
                  required
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  viewBox="0 0 33 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3576 0L16 1.20844V36.2868L16.3576 36.6425L32.7153 27.0854L16.3576 0Z"
                    fill="currentColor"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16.3575 0L0 27.0854L16.3575 36.6425V19.6093V0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.3575 39.7064L16.1523 39.9563V52.3456L16.3575 52.9459L32.7254 30.1543L16.3575 39.7064Z"
                    fill="currentColor"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16.3575 52.9459V39.7064L0 30.1543L16.3575 52.9459Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.3575 36.6425L32.7152 27.0854L16.3575 19.6093V36.6425Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M0 27.0854L16.3575 36.6425V19.6093L0 27.0854Z"
                    fill="currentColor"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2B2BFF] hover:bg-[#2B2BFF]/90 text-white"
          >
            Create Campaign
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
