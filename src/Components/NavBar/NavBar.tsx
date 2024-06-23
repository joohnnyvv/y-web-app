import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// @ts-ignore
import AppLogo from "../../Assets/AppLogo/app-logo.png";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import { ActiveBadge } from "../ActiveBadge/ActiveBadge";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom, themeAtom } from "../../utils/Atoms";
import {
  loggedMenuSettings,
  notLoggedMenuSettings,
} from "../../Consts/ProfileMenu";
import SettingsMenuModal from "../Reusable/SettingsMenuModal/SettingsMenuModal";
import { useState } from "react";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [settingsMenuCase, setSettingsMenuCase] = useState<
    "Profile" | "Logout" | "Log in" | "Sign in"
  >("Log in");
  const [isSettingsMenuModalOpen, setIsSettingsMenuModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [theme] = useAtom(themeAtom);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingsMenuModalClose = () => {
    setIsSettingsMenuModalOpen(false);
  };

  const handleUserMenuItemClick = (
    menuItem: "Profile" | "Logout" | "Log in" | "Sign in"
  ) => {
    switch (menuItem) {
      case "Log in":
        setSettingsMenuCase(menuItem);
        setIsSettingsMenuModalOpen(true);
        break;
      case "Sign in":
        setSettingsMenuCase(menuItem);
        setIsSettingsMenuModalOpen(true);
        break;
      case "Profile":
        setSettingsMenuCase(menuItem);
        break;
      case "Logout":
        setIsLoggedIn(false);
        setLoggedUser(null);
        break;
    }
  };

  return (
    <AppBar position="fixed" sx={{ padding: "2px" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", width: "50%", gap: "50px" }}>
            <Link to="/">
              <img
                src={AppLogo}
                alt="y-logo"
                style={{ height: "3rem", borderRadius: "16px" }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitch />
            <Tooltip title="Open profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {loggedUser ? (
                  <Avatar
                    alt={loggedUser.name + " " + loggedUser.lastName}
                    sx={{ bgcolor: loggedUser.avatarColor }}
                  >
                    {loggedUser.name.charAt(0) + loggedUser.lastName.charAt(0)}
                  </Avatar>
                ) : (
                  <Avatar alt="Remy Sharp" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn
                ? Object.values(loggedMenuSettings).map((setting) =>
                    setting === "Profile" ? (
                      <Link
                        to={`/profile/${loggedUser?.id}`}
                        style={{
                          padding: 0,
                          textDecoration: "none",
                        }}
                      >
                        <MenuItem
                          key={setting}
                          onClick={() => handleUserMenuItemClick(setting)}
                        >
                          <Typography
                            textAlign="center"
                            sx={
                              theme === "dark"
                                ? { color: "white" }
                                : { color: "black" }
                            }
                          >
                            {setting}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ) : (
                      <MenuItem
                        key={setting}
                        onClick={() => handleUserMenuItemClick(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    )
                  )
                : Object.values(notLoggedMenuSettings).map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenuItemClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
        <SettingsMenuModal
          isOpen={isSettingsMenuModalOpen}
          case={settingsMenuCase}
          handleClose={handleSettingsMenuModalClose}
        />
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
