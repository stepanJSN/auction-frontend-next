import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { deleteUserAction } from "./users.actions";
import { MutationStatusEnum } from "@/enums/mutationStatus";

type DeleteUserButtonProps = {
  isMobileVersion: boolean;
  userId: string;
  userFullname: string;
};

export default function DeleteUserButton({
  isMobileVersion,
  userId,
  userFullname,
}: DeleteUserButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, setIsPending] = useState(false);

  const handleUserDelete = useCallback(async () => {
    setIsPending(true);
    const { status } = await deleteUserAction(userId);
    if (status === MutationStatusEnum.ERROR) {
      enqueueSnackbar(`Error. User ${userFullname} was not deleted`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`User ${userFullname} was deleted`, {
        variant: "success",
      });
    }
    setIsPending(false);
  }, [enqueueSnackbar, userFullname, userId]);

  return (
    <Button
      variant="outlined"
      color="error"
      disabled={isPending}
      onClick={handleUserDelete}
    >
      {isMobileVersion ? "Delete" : <DeleteIcon />}
    </Button>
  );
}
