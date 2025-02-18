import { Button } from "@mui/material";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { updateUserRoleAction } from "./users.actions";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { Role } from "@/enums/role.enum";

type UpdateUserRoleButtonProps = {
  isMobileVersion: boolean;
  userId: string;
  userFullname: string;
  currentRole: Role;
};

export default function UpdateUserRoleButton({
  isMobileVersion,
  userId,
  userFullname,
  currentRole,
}: UpdateUserRoleButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, setIsPending] = useState(false);

  const handleRoleUpdate = useCallback(async () => {
    setIsPending(true);
    const { status } = await updateUserRoleAction(
      userId,
      currentRole === Role.USER ? Role.ADMIN : Role.USER,
    );
    if (status === MutationStatusEnum.ERROR) {
      enqueueSnackbar(`Error. The role of ${userFullname} was not changed`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`The role of ${userFullname} was changed`, {
        variant: "success",
      });
    }
    setIsPending(false);
  }, [currentRole, enqueueSnackbar, userFullname, userId]);

  return (
    <Button variant="outlined" disabled={isPending} onClick={handleRoleUpdate}>
      {isMobileVersion ? (
        `Make ${currentRole === Role.USER ? "admin" : "user"}`
      ) : (
        <AddModeratorIcon />
      )}
    </Button>
  );
}
