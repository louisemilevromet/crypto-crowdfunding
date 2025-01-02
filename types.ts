export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  id: number;
  isFullyFunded: boolean;
}
