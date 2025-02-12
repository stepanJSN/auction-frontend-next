import { cardsService } from "@/services/cardsService";
import NoCards from "./NoCards";
import { ICardSummary } from "@/interfaces/cards.interface";
import { Button } from "@mui/material";
import Link from "next/link";
import { ROUTES } from "@/config/routesConfig";
import Pagination from "@/components/Pagination";
import CardsGrid from "@/components/CardsGrid";
import PageError from "@/components/PageError";

type CardsDataProps = {
  currentPage: number;
};

export default async function CardsData({ currentPage }: CardsDataProps) {
  const { data } = await cardsService.getAll({
    page: currentPage,
    onlyUserCards: true,
  });

  if (!data) {
    return <PageError />;
  }
  if (data.data.length === 0) {
    return <NoCards />;
  }

  const cardActions = (card: ICardSummary) => (
    <>
      <Button
        size="small"
        color="success"
        component={Link}
        href={ROUTES.CREATE_AUCTION(card.id)}
      >
        Sell
      </Button>
    </>
  );

  return (
    <>
      <CardsGrid cards={data.data} cardActions={cardActions} />
      <Pagination totalPages={data.info.totalPages} />
    </>
  );
}
