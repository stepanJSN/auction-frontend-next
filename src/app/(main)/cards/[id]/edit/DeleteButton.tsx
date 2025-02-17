import { Button } from "@mui/material";
import { useState } from "react";
import { deleteCardAction } from "../../cards.actions";

type DeleteButtonProps = {
  cardId: string;
};

export default function DeleteButton({ cardId }: DeleteButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleCardDelete = async () => {
    setIsPending(true);
    await deleteCardAction(cardId);
    setIsPending(false);
  };

  return (
    <Button
      color="error"
      variant="contained"
      disabled={isPending}
      onClick={handleCardDelete}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
