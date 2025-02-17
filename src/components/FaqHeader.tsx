"use client";
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  SxProps,
  Button,
  Grid2,
} from "@mui/material";
import { useCallback } from "react";
import { ROUTES } from "../config/routesConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/features/user/userSlice";
import { Role } from "@/enums/role.enum";

type FaqHeaderProps = {
  currentPage: string;
};

const containerStyles: SxProps = {
  mb: 2,
  alignItems: "center",
};

export default function FaqHeader({ currentPage }: FaqHeaderProps) {
  const router = useRouter();
  const { role } = useSelector(selectUser);

  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
      router.push(newAlignment);
    },
    [router],
  );

  return (
    <Grid2 container spacing={1} sx={containerStyles}>
      <Typography variant="h4">FAQ</Typography>
      <ToggleButtonGroup
        color="primary"
        value={currentPage}
        onChange={handleChange}
        size="small"
        exclusive
        aria-label="FAQ"
      >
        <ToggleButton value={ROUTES.CARDS}>Cards</ToggleButton>
        <ToggleButton value={ROUTES.SETS}>Sets</ToggleButton>
      </ToggleButtonGroup>
      {role === Role.ADMIN && (
        <Button
          component={Link}
          href={
            currentPage === ROUTES.CARDS
              ? ROUTES.CREATE_CARD
              : ROUTES.CREATE_SET
          }
          variant="outlined"
        >
          {currentPage === ROUTES.CARDS ? "Create card" : "Create set"}
        </Button>
      )}
    </Grid2>
  );
}
