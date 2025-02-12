import { logoutAction } from "@/actions";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { deleteUser } from "@/lib/features/user/userSlice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useDeleteUser(
  userId: string,
  deleteStatus: MutationStatusEnum,
) {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    if (userId) {
      dispatch(deleteUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (deleteStatus === MutationStatusEnum.SUCCESS) {
      logoutAction();
    }
  }, [deleteStatus]);

  return handleDelete;
}
