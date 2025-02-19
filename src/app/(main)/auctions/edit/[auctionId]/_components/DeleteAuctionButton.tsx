import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { deleteAuctionAction } from "../../../auctions.actions";
import { useSnackbar } from "notistack";
import { MutationStatusEnum } from "@/enums/mutationStatus";

type DeleteAuctionButtonProps = {
  auctionId: string;
  isDisabled: boolean;
};

export default function DeleteAuctionButton({
  auctionId,
  isDisabled,
}: DeleteAuctionButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = useCallback(async () => {
    setIsPending(true);
    const { status } = await deleteAuctionAction(auctionId);
    if (status === MutationStatusEnum.ERROR) {
      enqueueSnackbar(`Error. The auction was not deleted`, {
        variant: "error",
      });
    }
    setIsPending(false);
  }, [auctionId, enqueueSnackbar]);

  return (
    <Button
      disabled={isPending || isDisabled}
      color="error"
      onClick={handleDelete}
      variant="contained"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
