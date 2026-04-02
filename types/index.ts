export type TransactionType = "income" | "expense";
export type UserRole = "viewer" | "admin";
export type Theme = "light" | "dark";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsPercentage: number;
}

export interface CategorySpending {
  name: string;
  value: number;
  percentage: number;
}

export interface BalanceTrendData {
  date: string;
  balance: number;
}

export interface MonthlyComparison {
  month: string;
  income: number;
  expenses: number;
}
