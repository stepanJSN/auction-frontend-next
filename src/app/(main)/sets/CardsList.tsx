import CardsGrid from "@/components/CardsGrid";
import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { ICardSummary } from "@/interfaces/cards.interface";
import { SxProps, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import CardListPagination from "./CardListPagination";
import CardListAction from "./CardListAction";
import useCardList from "./useCardList";

type CardsListProps = {
  cardsInSet: ICardSummary[];
  handleAddCard: (value: ICardSummary) => void;
};

const headerStyles: SxProps = {
  mt: 2,
  mb: 1,
};
const inputStyles: SxProps = {
  mb: 1,
};

export default function CardsList({
  handleAddCard,
  cardsInSet,
}: CardsListProps) {
  const {
    data,
    isLoading,
    isError,
    handleFilterChange,
    handlePageChange,
    page,
  } = useCardList();

  const cardActions = useCallback(
    (card: ICardSummary) => (
      <CardListAction
        card={card}
        cardsInSet={cardsInSet}
        handleAddCard={handleAddCard}
      />
    ),
    [handleAddCard, cardsInSet],
  );

  return (
    <>
      <Typography variant="h5" sx={headerStyles}>
        Cards List
      </Typography>
      <TextField
        label="Card Name"
        onChange={handleFilterChange}
        size="small"
        fullWidth
        sx={inputStyles}
      />
      {isLoading && <PageLoader />}
      {isError && <PageError />}
      {data?.data && data?.data.length !== 0 && (
        <>
          <CardsGrid cards={data.data} cardActions={cardActions} />
          <CardListPagination
            currentPage={page}
            totalPages={data!.info.totalPages}
            handleChange={handlePageChange}
          />
        </>
      )}
      {data?.data && data.data.length === 0 && (
        <Typography variant="h6">No cards found</Typography>
      )}
    </>
  );
}
