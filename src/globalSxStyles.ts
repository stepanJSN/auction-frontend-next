import { SxProps } from "@mui/system";

export const showOnlyOnBigScreenStyles: SxProps = {
  display: {
    xs: "none",
    lg: "initial",
  },
};
export const showOnlyOnSmallScreenStyles: SxProps = {
  display: {
    lg: "none",
  },
};
