"use client";

import {
  Button,
  Grid2,
  Grid2Props,
  styled,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Menu from "./Menu";
import ProfileMenu from "./ProfileMenu";
import MenuIcon from "@mui/icons-material/Menu";
import useMenu from "./useMenu";
import HeaderFooterContainer from "../HeaderFooterContainer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/features/user/userSlice";
import { Role } from "@/enums/role.enum";
import { adminMenu, userMenu } from "@/config/menuConfig";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import {
  showOnlyOnBigScreenStyles,
  showOnlyOnSmallScreenStyles,
} from "@/globalSxStyles";

const HeaderStyled = styled(Grid2)<Grid2Props>(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1, 0),
}));

const logoStyles: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: {
    xs: theme.typography.subtitle1.fontSize,
    md: theme.typography.h6.fontSize,
  },
});

const logoGridStyles: Grid2Props = {
  size: {
    xs: "grow",
    md: 2,
  },
};

export default function Header() {
  const { role, status, name, surname, balance, rating } =
    useSelector(selectUser);
  const { anchorMenuEl, isMenuOpen, handleMenuClick, handleMenuClose } =
    useMenu();

  const menuItems = useMemo(
    () => (role === Role.USER ? userMenu : adminMenu),
    [role],
  );

  return (
    <HeaderFooterContainer>
      <HeaderStyled
        container
        component="header"
        alignItems="center"
        spacing={2}
      >
        <Grid2 {...logoGridStyles}>
          <Typography sx={logoStyles}>Rick & Morty cards</Typography>
        </Grid2>
        <Grid2 sx={showOnlyOnBigScreenStyles} size={8}>
          <Menu menuItems={menuItems} />
        </Grid2>
        <Grid2 display="flex" justifyContent="end" size="grow">
          <Button
            sx={showOnlyOnSmallScreenStyles}
            variant="contained"
            color="secondary"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </Button>
          <Button
            sx={showOnlyOnBigScreenStyles}
            variant="contained"
            color="secondary"
            onClick={handleMenuClick}
          >
            Profile
          </Button>
        </Grid2>
        <ProfileMenu
          isMenuOpen={isMenuOpen}
          handleClose={handleMenuClose}
          anchorMenuEl={anchorMenuEl}
          menuItems={menuItems}
          isUserDataLoaded={status === QueryStatusEnum.SUCCESS}
          username={`${name} ${surname}`}
          balance={balance!}
          rating={rating}
          isAdmin={role === Role.ADMIN}
        />
      </HeaderStyled>
    </HeaderFooterContainer>
  );
}
