"use client";

import { ROUTES } from "@/config/routesConfig";
import { Role } from "@/enums/role.enum";
import { ICardSummary } from "@/interfaces/cards.interface";
import { selectUser } from "@/lib/features/user/userSlice";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

interface CardActionsProps {
  card: ICardSummary;
}

export default function CardActions({ card }: CardActionsProps) {
  const { role } = useSelector(selectUser);

  if (role !== Role.ADMIN) return null;

  return (
    <>
      <Button
        size="small"
        color="success"
        component={Link}
        disabled={!card.is_active}
        href={ROUTES.CREATE_AUCTION(card.id)}
      >
        Sell
      </Button>
      <Button component={Link} href={ROUTES.EDIT_CARD(card.id)} size="small">
        Manage
      </Button>
    </>
  );
}
