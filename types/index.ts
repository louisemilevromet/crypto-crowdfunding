// Types definitions
export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  id: number;
  isFullyFunded: boolean;
}
