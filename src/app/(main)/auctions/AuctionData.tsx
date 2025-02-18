import { IGetAuctionsPayload } from "@/interfaces/auctions.interfaces";
import { getAuctionsAction } from "./auctions.actions";
import PageError from "@/components/PageError";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";
import Pagination from "@/components/Pagination";
import AuctionsGrid from "./AuctionsGrid";

type AuctionsDataProps = {
  searchParams?: IGetAuctionsPayload;
};

export default async function AuctionData({ searchParams }: AuctionsDataProps) {
  const { data } = await getAuctionsAction(searchParams);

  if (!data) {
    return <PageError />;
  }
  if (data.data.length === 0 && searchParams?.page && searchParams.page > 1) {
    return notFound();
  }
  if (data.data.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        There are no auctions
      </Typography>
    );
  }

  return (
    <>
      <AuctionsGrid initialAuctions={data.data} />
      <Pagination totalPages={data.info.totalPages} />
    </>
  );
}
