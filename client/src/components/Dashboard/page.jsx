import { color } from "@chakra-ui/react";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Content</h1>
      <p className=" text-lg font-semibold text-muted-foreground color-foreground">
        dashboard content goes here.
      </p>
      <p style={color='red'}>hello</p>
    </div>
  );
}

export default DashboardPage;
