import { create } from "zustand";
import { Transaction, UserRole, Theme } from "@/types";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "premium";
  duration?: number;
}

interface StoreState {
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

  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;

  searchQuery: string;
  selectedCategory: string | null;
  transactionType: "all" | "income" | "expense";
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setTransactionType: (type: "all" | "income" | "expense") => void;
  resetFilters: () => void;

  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  theme: Theme;
  toggleTheme: () => void;

  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;

  toasts: Toast[];
  addToast: (
    message: string,
    type: "success" | "error" | "info",
    duration?: number,
  ) => void;
  removeToast: (id: string) => void;

  isSubscribed: boolean;
  setIsSubscribed: (subscribed: boolean) => void;

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
 
  isAuthenticated: false,
  currentUser: null,

  login: (email, password, role) => {
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

  transactions: DEFAULT_TRANSACTIONS,
  searchQuery: "",
  selectedCategory: null,
  transactionType: "all",
  userRole: "viewer",
  theme: "light",
  currentPage: 1,
  itemsPerPage: 10,
  toasts: [],
  isSubscribed: false,

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

  setUserRole: (role) => set({ userRole: role }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setCurrentPage: (page) => set({ currentPage: page }),

  addToast: (message, type, duration) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Date.now().toString(),
          message,
          type,
          duration: duration || 4000,
        },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  setIsSubscribed: (subscribed) => set({ isSubscribed: subscribed }),

  loadFromLocalStorage: () => {
    if (typeof window !== "undefined") {
  
      const authData = localStorage.getItem("currentUser");
      if (authData) {
        const { user, isAuthenticated } = JSON.parse(authData);
        set({
          isAuthenticated,
          currentUser: user,
          userRole: user.role,
        });
      }

      const stored = localStorage.getItem("financeStore");
      if (stored) {
        const { transactions, userRole, theme, isSubscribed } =
          JSON.parse(stored);
        set({
          transactions: transactions || DEFAULT_TRANSACTIONS,
          userRole: userRole || "viewer",
          theme: theme || "light",
          isSubscribed: isSubscribed || false,
        });
      }
    }
  },

  saveToLocalStorage: () => {
    if (typeof window !== "undefined") {
      const { transactions, userRole, theme, isSubscribed } = get();
      localStorage.setItem(
        "financeStore",
        JSON.stringify({ transactions, userRole, theme, isSubscribed }),
      );
    }
  },
}));
