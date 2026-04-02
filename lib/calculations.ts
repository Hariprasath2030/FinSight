import {
  Transaction,
  CategorySpending,
  BalanceTrendData,
  MonthlyComparison,
} from "@/types";

export function calculateDashboardStats(transactions: Transaction[]) {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });

  const totalBalance = totalIncome - totalExpenses;
  const savingsPercentage =
    totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0;

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    savingsPercentage: Math.round(savingsPercentage),
  };
}

export function getCategorySpending(
  transactions: Transaction[],
): CategorySpending[] {
  const categoryMap: Record<string, number> = {};
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      totalExpenses += t.amount;
    }
  });

  return Object.entries(categoryMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getBalanceTrend(
  transactions: Transaction[],
): BalanceTrendData[] {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let runningBalance = 0;
  const trend: BalanceTrendData[] = [];
  const seen = new Set<string>();

  sortedTransactions.forEach((t) => {
    if (t.type === "income") {
      runningBalance += t.amount;
    } else {
      runningBalance -= t.amount;
    }

    if (!seen.has(t.date)) {
      trend.push({
        date: new Date(t.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        balance: runningBalance,
      });
      seen.add(t.date);
    }
  });

  return trend;
}

export function getMonthlyComparison(
  transactions: Transaction[],
): MonthlyComparison[] {
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0 };
    }

    if (t.type === "income") {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expenses += t.amount;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      ...data,
    }))
    .sort((a, b) => {
      const aDate = new Date(a.month);
      const bDate = new Date(b.month);
      return aDate.getTime() - bDate.getTime();
    });
}

export function getHighestSpendingCategory(
  transactions: Transaction[],
): string {
  const categorySpending = getCategorySpending(transactions);
  return categorySpending[0]?.name || "N/A";
}

export function getSavingsRate(transactions: Transaction[]): number {
  const { totalBalance, totalIncome } = calculateDashboardStats(transactions);
  return totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0;
}

export function filterTransactions(
  transactions: Transaction[],
  searchQuery: string,
  selectedCategory: string | null,
  transactionType: "all" | "income" | "expense",
): Transaction[] {
  return transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || t.category === selectedCategory;
    const matchesType = transactionType === "all" || t.type === transactionType;

    return matchesSearch && matchesCategory && matchesType;
  });
}

export function getUniqueCategories(transactions: Transaction[]): string[] {
  return Array.from(new Set(transactions.map((t) => t.category))).sort();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
