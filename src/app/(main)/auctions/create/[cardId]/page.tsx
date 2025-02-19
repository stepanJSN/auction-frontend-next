import PageError from "@/components/PageError";
import { cardsService } from "@/services/cardsService";
import { Alert, Stack, Typography } from "@mui/material";
import React from "react";
import CardData from "../../_components/CardData";
import AuctionForm from "./_components/AuctionForm";

export default async function CreateAuctionPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const cardId = (await params).cardId;
  const { data: cardData } = await cardsService.getOne(cardId);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create auction
      </Typography>
      {!cardData && <PageError />}
      {cardData && (
        <Stack spacing={1}>
          <CardData data={cardData} />
          <Alert severity="info">The system fee is 10%</Alert>
          <AuctionForm cardId={cardId} />
        </Stack>
      )}
    </>
  );
}
