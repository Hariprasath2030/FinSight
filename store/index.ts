import { create } from "zustand";
import { Transaction, UserRole, Theme } from "@/types";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface StoreState {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (
    email: string,
    password: string,
    role: UserRole,
    name: string,
  ) => void;
  logout: () => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;

  // Filters
  searchQuery: string;
  selectedCategory: string | null;
  transactionType: "all" | "income" | "expense";
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setTransactionType: (type: "all" | "income" | "expense") => void;
  resetFilters: () => void;

  // Role Management
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Pagination
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;

  // Persistence
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2024-03-20",
    description: "Salary",
    amount: 5000,
    category: "Income",
    type: "income",
  },
  {
    id: "2",
    date: "2024-03-18",
    description: "Grocery Store",
    amount: 150,
    category: "Food",
    type: "expense",
  },
  {
    id: "3",
    date: "2024-03-15",
    description: "Electric Bill",
    amount: 120,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "4",
    date: "2024-03-10",
    description: "Freelance Project",
    amount: 800,
    category: "Income",
    type: "income",
  },
  {
    id: "5",
    date: "2024-03-08",
    description: "Gas Station",
    amount: 60,
    category: "Transportation",
    type: "expense",
  },
];

export const useStore = create<StoreState>((set, get) => ({
  // Authentication state
  isAuthenticated: false,
  currentUser: null,

  // Authentication actions
  login: (email, password, role) => {
    // Simulate login - in real app, verify credentials
    const user: User = {
      id: Date.now().toString(),
      email,
      role,
      name: email.split("@")[0],
    };
    set({ isAuthenticated: true, currentUser: user, userRole: role });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ user, isAuthenticated: true }),
    );
  },

  signup: (email, password, role, name) => {
    // Simulate signup - in real app, would create account
    const user: User = {
      id: Date.now().toString(),
      email,
      role,
      name,
    };
    set({ isAuthenticated: true, currentUser: user, userRole: role });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ user, isAuthenticated: true }),
    );
  },

  logout: () => {
    set({ isAuthenticated: false, currentUser: null, userRole: "viewer" });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("financeStore");
  },

  // Initial state
  transactions: DEFAULT_TRANSACTIONS,
  searchQuery: "",
  selectedCategory: null,
  transactionType: "all",
  userRole: "viewer",
  theme: "light",
  currentPage: 1,
  itemsPerPage: 10,

  // Transaction actions
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        { ...transaction, id: Date.now().toString() },
        ...state.transactions,
      ],
    })),

  editTransaction: (id, transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...transaction, id } : t,
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // Filter actions
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, currentPage: 1 }),
  setTransactionType: (type) => set({ transactionType: type, currentPage: 1 }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: null,
      transactionType: "all",
      currentPage: 1,
    }),

  // Role actions
  setUserRole: (role) => set({ userRole: role }),

  // Theme actions
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  // Pagination
  setCurrentPage: (page) => set({ currentPage: page }),

  // Persistence
  loadFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      // Load auth data
      const authData = localStorage.getItem("currentUser");
      if (authData) {
        const { user, isAuthenticated } = JSON.parse(authData);
        set({
          isAuthenticated,
          currentUser: user,
          userRole: user.role,
        });
      }

      // Load finance data
      const stored = localStorage.getItem("financeStore");
      if (stored) {
        const { transactions, userRole, theme } = JSON.parse(stored);
        set({
          transactions: transactions || DEFAULT_TRANSACTIONS,
          userRole: userRole || "viewer",
          theme: theme || "light",
        });
      }
    }
  },

  saveToLocalStorage: () => {
    if (typeof window !== "undefined") {
      const { transactions, userRole, theme } = get();
      localStorage.setItem(
        "financeStore",
        JSON.stringify({ transactions, userRole, theme }),
      );
    }
  },
}));
