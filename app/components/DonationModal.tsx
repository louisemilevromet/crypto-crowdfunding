import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Campaign } from "@/types";
import { CrowdFundingContext } from "@/contexts/CrowdFundingContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

export function DonationModal({
  isOpen,
  onClose,
  campaign,
}: DonationModalProps) {
  const { donate } = useContext(CrowdFundingContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const remaining =
      Number(campaign.target) - Number(campaign.amountCollected);
    setRemainingAmount(remaining);
    if (Number(amount) > remaining) {
      setAmount(remaining.toString());
    }
  }, [campaign.amountCollected, campaign.target, amount]);

  const handleDonate = async (id: number, amount: string) => {
    if (Number(amount) > remainingAmount) {
      setError(`You can't donate more than ${remainingAmount} ETH`);
      return;
    }
    setError(null);
    try {
      await donate(id, amount);
      onClose();
    } catch (error) {
      console.error("Error donating to campaign:", error);
      setError(
        "An error occurred while processing your donation. Please try again."
      );
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDonate(campaign.id, amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Support this campaign
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make a donation to "{campaign.title}"
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-6 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Amount (ETH)
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError(null); // Clear error when input changes
                  }}
                  className="pl-8"
                  placeholder="0.00"
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
              <Label className="text-foreground">Campaign Details</Label>
              <p className="text-sm text-muted-foreground">
                {campaign.description}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Campaign Owner</Label>
              <p className="text-sm text-muted-foreground">{campaign.owner}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#2B2BFF] hover:bg-[#2B2BFF]/90 text-white"
            >
              Donate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
