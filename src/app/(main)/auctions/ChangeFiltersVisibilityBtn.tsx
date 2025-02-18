import { Button, IconButton, SxProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const closeButtonStyles: SxProps = {
  alignSelf: "flex-end",
};

type ChangeFiltersVisibilityBtnProps = {
  isSidebarOpen: boolean;
  toggleSidebarVisibility: () => void;
};

export default function ChangeFiltersVisibilityBtn({
  isSidebarOpen,
  toggleSidebarVisibility,
}: ChangeFiltersVisibilityBtnProps) {
  return isSidebarOpen ? (
    <IconButton
      onClick={toggleSidebarVisibility}
      aria-label="close"
      sx={closeButtonStyles}
    >
      <CloseIcon />
    </IconButton>
  ) : (
    <Button
      onClick={toggleSidebarVisibility}
      sx={closeButtonStyles}
      variant="outlined"
    >
      Filters
    </Button>
  );
}
