"use client";
import { ICreateAuction } from "@/interfaces/auctions.interfaces";
import { Button, Grid2 } from "@mui/material";
import { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import AuctionFormFields from "../../../_components/AuctionFormFields";
import useErrorMessage from "@/hooks/useErrorMessage";
import { createAuctionErrorMessages } from "../createAuctionErrorMessages";
import { useCallback, useEffect } from "react";
import { delay } from "@/helpers/delay";
import { createAuctionAction } from "../../../auctions.actions";
import { useSnackbar } from "notistack";

export type CreateAuctionFormType = Omit<
  { [K in keyof ICreateAuction]: string },
  "cardId" | "endTime"
> & { endTime: Dayjs };

type AuctionFormProps = {
  cardId: string;
};

export default function AuctionForm({ cardId }: AuctionFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<CreateAuctionFormType>();
  const getErrorMessage = useErrorMessage(createAuctionErrorMessages);
  const { enqueueSnackbar } = useSnackbar();

  const createAuction = useCallback(
    async (data: CreateAuctionFormType) => {
      const result = await createAuctionAction({
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        cardId,
        endTime: data.endTime.toISOString(),
      });
      if (result?.errorCode) {
        setError("root.serverError", { type: result.errorCode.toString() });
        enqueueSnackbar(getErrorMessage(+result.errorCode), {
          variant: "error",
        });
      }
    },
    [cardId, setError, enqueueSnackbar, getErrorMessage],
  );

  useEffect(() => {
    async function resetForm() {
      enqueueSnackbar("Auction was created successfully", {
        variant: "success",
      });
      await delay(2000);
      reset();
    }
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [reset, isSubmitSuccessful, enqueueSnackbar]);

  return (
    <Grid2
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(createAuction)}
    >
      <AuctionFormFields control={control} />
      <Grid2 size={12}>
        <Button
          disabled={isSubmitting || isSubmitSuccessful}
          type="submit"
          variant="contained"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </Grid2>
    </Grid2>
  );
}
