import { Button } from "@mui/material";
import { useState } from "react";
import { deleteSetAction } from "../../sets.action";

type DeleteButtonProps = {
  setId: string;
};

export default function DeleteButton({ setId }: DeleteButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleCardDelete = async () => {
    setIsPending(true);
    await deleteSetAction(setId);
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
