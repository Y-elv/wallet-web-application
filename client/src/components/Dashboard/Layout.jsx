"use client";

import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 mt-16`}
        style={{
          marginLeft: sidebarOpen ? "16rem" : "5rem",
        }}
      >
        <TopBar isOpen={sidebarOpen} />
        <main className="p-8 mt-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
