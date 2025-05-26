// components/ui/DashboardLayout.jsx
"use client";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}