import { SxProps, Typography } from "@mui/material";
import HeaderFooterContainer from "./HeaderFooterContainer";

const typographyStyles: SxProps = {
  color: "common.white",
  py: 1,
};

export default function Footer() {
  return (
    <HeaderFooterContainer>
      <Typography textAlign="center" sx={typographyStyles}>
        Rick & Morty cards | 2025
      </Typography>
    </HeaderFooterContainer>
  );
}
