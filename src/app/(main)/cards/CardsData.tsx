import { cardsService } from "@/services/cardsService";
import { ICardSummary } from "@/interfaces/cards.interface";
import { Typography } from "@mui/material";
import Pagination from "@/components/Pagination";
import CardsGrid from "@/components/CardsGrid";
import PageError from "@/components/PageError";
import CardActions from "./CardActions";
import { notFound } from "next/navigation";

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
  if (data.data.length === 0 && currentPage > 1) {
    return notFound();
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
      />
      <Pagination totalPages={data.info.totalPages} />
    </>
  );
}
