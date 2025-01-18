"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLocation, Link } from "react-router-dom"; 
import { menuItems } from "../components/models/menuItems";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Get the current location (pathname)
  const [activeItem, setActiveItem] = useState("Overview");

  useEffect(() => {
    // Find the active item based on current pathname
    const activeItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (activeItem) {
      setActiveItem(activeItem.text);
    }
  }, [location.pathname]); // Re-run when pathname changes

  const handleItemClick = (item) => {
    setActiveItem(item.text);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-background border-r-muted-foreground shadow-sm border text-foreground transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
      style={{ zIndex: 1 }}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} className="text-foreground">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="mt-24">
        {["Menu", "Others"].map((category) => (
          <div key={category} className="mb-10">
            {isOpen && (
              <h2 className="px-4 py-2 text-sm font-semibold">{category}</h2>
            )}
            {menuItems
              .filter((item) => item.category === category)
              .map((item, index) => (
                <Link
                  key={index}
                  to={item.path} // Use the 'to' prop for navigation in React Router
                  className={`flex items-center px-4 py-4 font-bold text-lg ${
                    activeItem === item.text
                      ? " text-background bg-foreground"
                      : " hover:bg-foreground text-muted-foreground hover:text-background"
                  }`}
                  onClick={() => handleItemClick(item)} // Update active item on click
                >
                  <item.icon size={24} />
                  {isOpen && <span className="ml-4">{item.text}</span>}
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
