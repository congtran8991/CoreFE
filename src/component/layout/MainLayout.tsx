import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import Header from "./AppBar";
import { Outlet } from "react-router-dom";
import BreadcrumbsNav from "./BreadcrumbsNav";

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box display="flex">
      <Sidebar open={open} setOpen={setOpen} />

      <Box
        style={{ width: open ? "calc(100vw - 240px)" : "calc(100vw - 80px)" }}
        sx={{
          margin: 0,
          marginTop: "60px",
        }}
      >
        <Header open={open} setOpen={setOpen} />
        <BreadcrumbsNav />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
