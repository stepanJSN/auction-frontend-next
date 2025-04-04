import { List, ListItem, SxProps } from "@mui/material";
import { MenuLink } from "./MenuLink";

type MenuProps = {
  menuItems: {
    label: string;
    path: string;
  }[];
};

const listStyles: SxProps = {
  p: 0,
  display: {
    xs: "block",
    lg: "flex",
  },
};

const itemStyles: SxProps = {
  justifyContent: {
    xs: "initial",
    lg: "center",
  },
};

export default function Menu({ menuItems }: MenuProps) {
  return (
    <List sx={listStyles}>
      {menuItems.map((item) => (
        <ListItem key={item.label} sx={itemStyles}>
          <MenuLink href={item.path}>{item.label}</MenuLink>
        </ListItem>
      ))}
    </List>
  );
}
