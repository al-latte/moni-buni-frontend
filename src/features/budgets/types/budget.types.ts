export interface CategoryAllocation {
  categoryId: {
    _id: string;
    title: string;
    icon: string;
  };
  limit: number;
  spent: number;
}

export interface Budget {
  _id: string;
  userId: string;
  name: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  categories: CategoryAllocation[];
  isActive: boolean;
  remainingAmount: number;
  totalSpent: number;
}
