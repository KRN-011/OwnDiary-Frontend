


// Get All Expenses Api Response
export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  imageAttachments: string[]; 
  userId: string;
  category: {
    id: string;
    name: string;
    icon?: string;
  };
  categoryId: string;
  parentId: string | null;
  createdAt: string; 
  updatedAt: string; 
}