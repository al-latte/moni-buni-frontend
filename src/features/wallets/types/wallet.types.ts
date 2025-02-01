export interface Wallet {
  _id: string;
  userId: string;
  title: string;
  balance: number;
  description?: string;
  setAsDefault: boolean;
}
