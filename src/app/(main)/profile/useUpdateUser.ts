import { IUpdateUser } from "@/interfaces/user.interfaces";
import { updateUser } from "@/lib/features/user/userSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useUpdateUser(userId: string) {
  const dispatch = useDispatch();

  const handleUpdate = useCallback(
    (data: IUpdateUser) => {
      if (userId) {
        dispatch(updateUser({ id: userId, data }));
      }
    },
    [dispatch, userId],
  );

  return handleUpdate;
}
