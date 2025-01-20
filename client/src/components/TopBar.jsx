"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const TopBar = ({ isOpen }) => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Retrieve the userInfo from localStorage
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        // Parse the userInfo JSON string
        const parsedUserInfo = JSON.parse(userInfo);

        // Set the user state with the user data if it exists
        if (parsedUserInfo.data && parsedUserInfo.data.user) {
          setUser(parsedUserInfo.data.user);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to generate a background color based on the first letter of the username
  const getColorFromLetter = (letter) => {
    const colors = [
      "#F44336",
      "#2196F3",
      "#4CAF50",
      "#FFEB3B",
      "#9C27B0",
      "#FF5722",
      "#607D8B",
      "#8BC34A",
      "#CDDC39",
      "#FF9800",
      "#795548",
      "#3F51B5",
      "#00BCD4",
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Function to logout user
  const logout = () => {
    // Remove userInfo from localStorage
    localStorage.removeItem("userInfo");

    // Redirect to login page
    window.location.href = "/login";
  };

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <div
      className={`fixed top-0 bg-background border border-b-muted-foreground shadow-sm p-4 flex justify-between items-center transition-all duration-300 ${
        isOpen ? "left-64" : "left-20"
      } right-0 ${isScrolled ? "bg-opacity-100 bg-white" : "bg-opacity-75"}`} // Change background based on scroll position
      style={{ backgroundColor: isScrolled ? "#ffffff" : "transparent" }}
    >
      <div className="flex items-center">
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-foreground">
            {user?.username
              ? `Welcome, ${user.username}! 👋🏾`
              : "Hello Guest 👋🏾"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Your finances, simplified and under control.
          </p>
        </div>
      </div>

      <div className="flex items-center mr-10 cursor-pointer gap-4">
        {/* If the user is logged in, display user info */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* User Info First */}
            <div className="flex flex-col">
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm">{user.email}</p>
            </div>

            {/* Profile Circle with Dropdown */}
            <Dropdown overlay={<Menu items={items} />} trigger={["hover"]}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                style={{
                  backgroundColor: getColorFromLetter(user.username[0]), // Dynamically set background color based on the first letter
                }}
              >
                {user.username[0].toUpperCase()}{" "}
                {/* Show first letter of username */}
              </div>
            </Dropdown>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TopBar;
