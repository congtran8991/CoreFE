import React, { memo, useMemo } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { Home, ChevronLeft, SupervisorAccount } from "@mui/icons-material";
import { Link, useMatch } from "react-router-dom";
import { useUser } from "@hooks/user";

const menuItems = [
  {
    text: "PIPELINES",
    key: "PIPELINES",
    icon: <Home />,
    path: "/pipelines",
  },
  { text: "ADMIN", key: "ADMIN", icon: <SupervisorAccount />, path: "/admin" },
];

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const match = useMatch("/*");
  const path = match?.pathname;
  const { data: user } = useUser();

  const _menuItems = useMemo(() => {
    return menuItems.filter((x) => {
      if (x.key !== "ADMIN") {
        return true;
      }
      return user?.is_super_admin;
    });
  }, [user?.is_super_admin]);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 80, // Khi đóng, chỉ hiển thị icon
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 80,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      {/* Nút Toggle Sidebar */}
      <Stack
        display={"flex"}
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
        borderBottom={"1px solid #cb8609"}
        minHeight={"4rem"}
      >
        {open && (
          <Box paddingLeft={"1.25rem"} color="#ff79c6" fontWeight={"bold"}>
            YAML
          </Box>
        )}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ margin: 1, outline: "none", "&:focus": { outline: "none" } }}
          disableRipple
        >
          {open ? (
            <ChevronLeft />
          ) : (
            <Box fontSize={"14px"} fontWeight={"bold"} color="#ff79c6">
              YAML
            </Box>
          )}
        </IconButton>
      </Stack>

      <List>
        {_menuItems.map((item) => {
          const isPath = path?.includes(item.path);
          return (
            <ListItem
              key={item.key}
              disablePadding
              sx={{
                "&:hover": { background: "#eadabe" },
                background: isPath ? "#eadabe" : "",
              }}
            >
              <ListItemButton component={Link} to={item.path}>
                <Box paddingLeft={1}>
                  <ListItemIcon sx={{ color: "#cb8609" }}>
                    {item.icon}
                  </ListItemIcon>
                </Box>
                <Box>
                  {open && (
                    <ListItemText
                      primary={
                        <Box
                          fontFamily={"Times"}
                          fontSize={"1rem"}
                          color="#cb8609"
                        >
                          {item.text}
                        </Box>
                      }
                    />
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default memo(Sidebar);
