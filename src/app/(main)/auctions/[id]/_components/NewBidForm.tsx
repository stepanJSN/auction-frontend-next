import FormInput from "@/components/FormInput";
import { Button } from "@mui/material";
import { Stack, SxProps } from "@mui/system";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createBidAction } from "../../auctions.actions";
import { useSnackbar } from "notistack";
import useErrorMessage from "@/hooks/useErrorMessage";
import { createBidErrorMessages } from "./createBidErrorMessages";
import { MutationStatusEnum } from "@/enums/mutationStatus";

const buttonStyles: SxProps = {
  height: "max-content",
};
const containerStyles: SxProps = {
  maxWidth: "350px",
};

type NewBidFormProps = {
  auctionId: string;
  isFormInactive: boolean;
  min: number;
  max?: number;
};

export default function NewBidForm({
  auctionId,
  isFormInactive,
  min,
  max,
}: NewBidFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ bid: string }>();
  const getErrorMessage = useErrorMessage(createBidErrorMessages);
  const { enqueueSnackbar } = useSnackbar();
  const rules = useMemo(
    () => ({
      required: true,
      pattern: /^\d+$/,
      min,
      max,
    }),
    [max, min],
  );

  const createBid = useCallback(
    async (data: { bid: string }) => {
      const response = await createBidAction({
        auctionId,
        bidAmount: +data.bid,
      });
      if (response?.errorCode) {
        enqueueSnackbar(getErrorMessage(+response.errorCode), {
          variant: "error",
        });
      }
      if (response.status === MutationStatusEnum.SUCCESS) {
        enqueueSnackbar("Bid was created successfully", {
          variant: "success",
        });
      }
    },
    [auctionId, enqueueSnackbar, getErrorMessage],
  );

  return (
    <Stack
      direction="row"
      component="form"
      onSubmit={handleSubmit(createBid)}
      spacing={1}
      sx={containerStyles}
    >
      <FormInput
        name="bid"
        label="Your bid"
        type="number"
        margin="none"
        rules={rules}
        control={control}
        errorText={`Bid is required and should be more than ${min} ${max ? `and less than ${max}` : ""} `}
        disabled={isFormInactive}
      />
      <Button
        type="submit"
        disabled={isFormInactive || isSubmitting}
        variant="contained"
        sx={buttonStyles}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Stack>
  );
}
