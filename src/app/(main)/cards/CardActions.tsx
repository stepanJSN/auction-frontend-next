import { ROUTES } from "@/config/routesConfig";
import { Role } from "@/enums/role.enum";
import { ICardSummary } from "@/interfaces/cards.interface";
import { userService } from "@/services/userService";
import { Button } from "@mui/material";
import Link from "next/link";

interface CardActionsProps {
  card: ICardSummary;
}

export default async function CardActions({ card }: CardActionsProps) {
  const { data: userData } = await userService.getCurrent();

  return (
    userData?.role === Role.ADMIN && (
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
    )
  );
}
