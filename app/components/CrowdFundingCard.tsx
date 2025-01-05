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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function CrowdFundingCard() {
  const { createCampaign } = useContext(CrowdFundingContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createCampaign(formData as any);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4">
            <div className="loader" />
            <p className="text-lg font-medium text-center">
              After the transaction is confirmed, the campaign will be created,
              this may take a few seconds.
            </p>
          </div>
        ) : (
          <>
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
                      step="0.001"
                      min="0.001"
                      placeholder="0.001"
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !date && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Choose a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          setFormData({
                            ...formData,
                            deadline: newDate
                              ? format(newDate, "yyyy-MM-dd")
                              : "",
                          });
                        }}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2B2BFF] hover:bg-[#2B2BFF]/90 text-white"
                disabled={isLoading}
              >
                Create Campaign
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
