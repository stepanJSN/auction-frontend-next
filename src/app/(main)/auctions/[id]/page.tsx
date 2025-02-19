import PageError from "@/components/PageError";
import { auctionService } from "@/services/auctionService";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { notFound } from "next/navigation";
import CardData from "../_components/CardData";
import AuctionLiveData from "./_components/AuctionLiveData";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const auctionId = (await params).id;
  if (!auctionId) {
    notFound();
  }
  const { data: auctionData } = await auctionService.findOne(auctionId);
  if (!auctionData) {
    return <PageError />;
  }
  return (
    <Stack spacing={2}>
      <CardData data={auctionData.card} />
      <Divider />
      <AuctionLiveData auctionId={auctionId} initialAuctionData={auctionData} />
    </Stack>
  );
}
