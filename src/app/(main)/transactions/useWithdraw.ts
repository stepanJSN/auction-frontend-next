import { useCallback, useState } from "react";
import { withdrawAction } from "./transactions.actions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { updateUserBalance } from "@/lib/features/user/userSlice";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export default function useWithdraw() {
  const [withdrawError, setWithdrawError] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onWithdrawSubmit = useCallback(
    async (amount: number) => {
      const response = await withdrawAction(amount);
      if (response.status === MutationStatusEnum.SUCCESS && response.data) {
        enqueueSnackbar("Operation was successfully", {
          variant: "success",
        });
        dispatch(updateUserBalance(response.data));
        return response.status;
      }
      setWithdrawError(response.errorCode);
    },
    [dispatch, enqueueSnackbar],
  );
  return { withdrawError, onWithdrawSubmit };
}
