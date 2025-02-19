import PageError from "@/components/PageError";
import { Alert, Stack, Typography } from "@mui/material";
import React from "react";
import CardData from "../../_components/CardData";
import { auctionService } from "@/services/auctionService";
import { notFound } from "next/navigation";
import EditAuctionForm from "./_components/EditAuctionForm";

export default async function CreateAuctionPage({
  params,
}: {
  params: Promise<{ auctionId?: string }>;
}) {
  const auctionId = (await params).auctionId;
  if (!auctionId) {
    notFound();
  }
  const { data: auctionData } = await auctionService.findOne(auctionId);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit auction
      </Typography>
      {!auctionData && <PageError />}
      {auctionData && (
        <Stack spacing={1}>
          <CardData data={auctionData.card} />
          <Alert severity="info">The system fee is 10%</Alert>
          <EditAuctionForm
            auctionId={auctionId}
            isFormInactive={auctionData.is_completed}
            auctionData={auctionData}
          />
        </Stack>
      )}
    </>
  );
}
