"use client";
import { Dialog, IconButton, SxProps } from "@mui/material";
import { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

type ModalPageProps = {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

const closeIconStyles: SxProps = {
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: "common.white",
};

export default function ModalPage({
  children,
  maxWidth = "lg",
}: ModalPageProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Dialog open maxWidth={maxWidth} onClose={handleClose}>
      <IconButton onClick={handleClose} aria-label="close" sx={closeIconStyles}>
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
}
