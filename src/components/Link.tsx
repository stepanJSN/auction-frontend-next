import { Link as MuiLink, LinkProps } from "@mui/material";
import NextLink from "next/link";

export default function Link(props: LinkProps & { href: string }) {
  return (
    <MuiLink component={NextLink} {...props}>
      {props.children}
    </MuiLink>
  );
}
