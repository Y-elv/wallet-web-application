import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Receipt,
  Settings,
  Briefcase,
} from "lucide-react";

// Define the menu items without TypeScript interfaces
export const menuItems = [
  {
    icon: LayoutDashboard,
    text: "Overview",
    category: "Menu",
    path: "/overview",
  },
  { icon: Wallet, text: "Accounts", category: "Menu", path: "/accounts" },
  { icon: PiggyBank, text: "Budget", category: "Menu", path: "/budget" },
  { icon: Briefcase, text: "Categories", category: "Menu", path: "/categories" },
  {
    icon: Receipt,
    text: "Transactions",
    category: "Menu",
    path: "/transactions",
  },
  { icon: Settings, text: "Settings", category: "Others", path: "/settings" },
];
