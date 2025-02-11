import { cardsService } from "@/services/cardsService";
import { ICardSummary } from "@/interfaces/cards.interface";
import { Typography } from "@mui/material";
import { ROUTES } from "@/config/routesConfig";
import Pagination from "@/components/Pagination";
import CardsGrid from "@/components/CardsGrid";
import PageError from "@/components/PageError";
import CardActions from "./CardActions";

type CardsDataProps = {
  currentPage: number;
};

export default async function CardsData({ currentPage }: CardsDataProps) {
  const { data } = await cardsService.getAll({
    page: currentPage,
  });

  if (!data) {
    return <PageError />;
  }
  if (data.data.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        There are no active cards
      </Typography>
    );
  }

  return (
    <>
      <CardsGrid
        cards={data.data}
        cardActions={(card: ICardSummary) => <CardActions card={card} />}
        cardPagePath={ROUTES.USER_CARDS_DETAILS}
      />
      <Pagination totalPages={data.info.totalPages} />
    </>
  );
}
