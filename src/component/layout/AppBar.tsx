import React, { memo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useUser } from "@hooks/user";
import { StorageEnhance } from "@hooks/lib/storage";
import { showPopupLogin, showPopupRegister } from "./helpers";
import KLabel from "libs1/uikit/Label";

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
  const { data: user } = useUser();

  return (
    <AppBar
      sx={{
        width: open ? "calc(100vw - 240px)" : "calc(100vw - 80px)",
        background: "#ffffff",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => {
              setOpen(!open);
            }} // Gọi hàm toggle sidebar
            sx={{ mr: 2, color: "#cb8609", "&:focus": { outline: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <KLabel.Text
            typo="Text2xLgMedium"
            style={{ color: "#cb8609" }}
            textTransform="uppercase"
            placementTooltip="right"
          >
            Convert to yaml
          </KLabel.Text>
        </Box>

        <Box display={"flex"} alignItems={"center"}>
          {!!user && <Box color={"#cb8609"}>{user?.email}</Box>}
          {!user && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#cb8609",
                marginRight: "0.5rem",
                "&:focus": { outline: "none" },
              }}
              onClick={showPopupLogin}
            >
              Login
            </Button>
          )}

          {!user && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#ff79c6",
                "&:focus": { outline: "none" },
                marginLeft: "0.5rem",
              }}
              onClick={showPopupRegister}
            >
              Register
            </Button>
          )}

          {!!user && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#ff79c6",
                "&:focus": { outline: "none" },
                marginLeft: "0.5rem",
              }}
              onClick={() => {
                StorageEnhance.clear();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default memo(Header);
