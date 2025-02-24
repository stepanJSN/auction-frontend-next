import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  SxProps,
  Typography,
  Menu as MuiMenu,
  styled,
  Box,
} from "@mui/material";
import { MenuLink } from "./MenuLink";
import Menu from "./Menu";
import Link from "next/link";
import { ROUTES } from "@/config/routesConfig";
import { logoutAction } from "@/actions";
import { showOnlyOnSmallScreenStyles } from "@/globalSxStyles";

type ProfileMenuProps = {
  isMenuOpen: boolean;
  handleClose: () => void;
  anchorMenuEl: null | HTMLElement;
  isUserDataLoaded: boolean;
  username: string;
  isAdmin: boolean;
  menuItems: { label: string; path: string }[];
  balance: {
    available: number;
    total: number;
  };
  rating: number | null;
};

const containerStyles: SxProps = {
  backgroundColor: "primary.main",
  color: "common.white",
  width: 250,
};
const dividerStyles = {
  backgroundColor: "common.white",
};
const balanceItemStyles = {
  display: "block",
};

const StyledMenu = styled(MuiMenu)(() => ({
  "& .MuiMenu-list": {
    padding: "0",
  },
}));

export default function ProfileMenu({
  username,
  balance,
  rating,
  isUserDataLoaded,
  isAdmin,
  menuItems,
  isMenuOpen,
  handleClose,
  anchorMenuEl,
}: ProfileMenuProps) {
  return (
    <StyledMenu anchorEl={anchorMenuEl} open={isMenuOpen} onClose={handleClose}>
      <List sx={containerStyles} dense>
        <Box onClick={handleClose} sx={showOnlyOnSmallScreenStyles}>
          <Menu menuItems={menuItems} />
          <Divider sx={dividerStyles} component="li" />
        </Box>
        {!isUserDataLoaded && <CircularProgress />}
        {isUserDataLoaded && (
          <>
            <ListItem>
              <Typography>Hi, {username}</Typography>
            </ListItem>
            <Divider sx={dividerStyles} component="li" />
            {rating !== null && (
              <>
                <ListItem>
                  <Typography>Rating: {rating}</Typography>
                </ListItem>
                <Divider sx={dividerStyles} component="li" />
              </>
            )}
            <ListItem sx={balanceItemStyles}>
              <Typography>Balance:</Typography>
              <List dense disablePadding>
                <ListItem>Available: {balance.available} CP</ListItem>
                <ListItem>Total: {balance.total} CP</ListItem>
              </List>
              <Button
                variant="contained"
                component={Link}
                href={ROUTES.TRANSACTIONS}
                color="success"
                size="small"
                onClick={handleClose}
                fullWidth
              >
                Top up / withdraw
              </Button>
            </ListItem>
            <Divider sx={dividerStyles} component="li" />
          </>
        )}
        <ListItem>
          <MenuLink href={ROUTES.PROFILE} onClick={handleClose}>
            Update personal information
          </MenuLink>
        </ListItem>
        {isAdmin && (
          <ListItem>
            <Button
              variant="contained"
              component={Link}
              href={ROUTES.SYSTEM_SETTINGS}
              color="warning"
              size="small"
              onClick={handleClose}
              fullWidth
            >
              System settings
            </Button>
          </ListItem>
        )}
        <ListItem>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={logoutAction}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </StyledMenu>
  );
}
