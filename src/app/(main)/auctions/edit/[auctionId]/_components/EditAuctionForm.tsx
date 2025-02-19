"use client";
import { IAuction, ICreateAuction } from "@/interfaces/auctions.interfaces";
import { Button, Grid2, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import AuctionFormFields from "../../../_components/AuctionFormFields";
import useErrorMessage from "@/hooks/useErrorMessage";
import { useCallback } from "react";
import { updateAuctionAction } from "../../../auctions.actions";
import { useSnackbar } from "notistack";
import { editAuctionErrorMessages } from "../editAuctionErrorMessage";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import DeleteAuctionButton from "./DeleteAuctionButton";

export type CreateAuctionFormType = Omit<
  { [K in keyof ICreateAuction]: string },
  "cardId" | "endTime"
> & { endTime: Dayjs };

type EditAuctionFormProps = {
  auctionId: string;
  isFormInactive: boolean;
  auctionData: Omit<
    IAuction,
    "highest_bid" | "is_completed" | "card" | "is_this_user_auction"
  >;
};

export default function EditAuctionForm({
  auctionId,
  isFormInactive,
  auctionData,
}: EditAuctionFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<CreateAuctionFormType>({
    defaultValues: {
      startingBid: auctionData.starting_bid.toString(),
      minBidStep: auctionData.min_bid_step.toString(),
      minLength: auctionData.min_length.toString(),
      endTime: dayjs(auctionData.end_time),
      maxBid: auctionData.max_bid ? auctionData.max_bid.toString() : undefined,
    },
  });
  const getErrorMessage = useErrorMessage(editAuctionErrorMessages);
  const { enqueueSnackbar } = useSnackbar();

  const updateAuction = useCallback(
    async (data: CreateAuctionFormType) => {
      const result = await updateAuctionAction(auctionId, {
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        endTime: data.endTime.toISOString(),
      });
      if (result?.errorCode) {
        setError("root.serverError", { type: result.errorCode.toString() });
        enqueueSnackbar(getErrorMessage(+result.errorCode), {
          variant: "error",
        });
        return;
      }
      if (result.status === MutationStatusEnum.SUCCESS) {
        enqueueSnackbar("Auction was updated successfully", {
          variant: "success",
        });
      }
    },
    [auctionId, enqueueSnackbar, getErrorMessage, setError],
  );

  return (
    <Grid2
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(updateAuction)}
    >
      <AuctionFormFields control={control} isFormInactive={isFormInactive} />
      <Grid2 size={12}>
        <Stack direction="row" spacing={1}>
          <Button
            disabled={isSubmitting || isFormInactive}
            type="submit"
            variant="contained"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
          <DeleteAuctionButton auctionId={auctionId} />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
