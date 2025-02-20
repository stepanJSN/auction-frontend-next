import useMutation from "@/hooks/useMutation";
import { useCallback, useState } from "react";
import { createPaymentIntentAction, topUpAction } from "./transactions.actions";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Role } from "@/enums/role.enum";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { updateUserBalance } from "@/lib/features/user/userSlice";

export default function useTopUp(role: Role) {
  const [paymentData, setPaymentData] = useState<{
    clientSecret: string;
    numberOfPoints: number;
  } | null>();
  const { mutate, isPending } = useMutation(createPaymentIntentAction);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleTopUp = useCallback(
    async (numberOfPoints: number) => {
      const response = await mutate(numberOfPoints);
      if (response.data) {
        setPaymentData({
          clientSecret: response.data.clientSecret,
          numberOfPoints,
        });
      }
    },
    [mutate],
  );

  const onTopUpSubmit = useCallback(
    async (amount: number) => {
      if (role === Role.ADMIN) {
        const response = await topUpAction(amount);
        if (response.status === MutationStatusEnum.SUCCESS && response.data) {
          enqueueSnackbar("Operation was successfully", {
            variant: "success",
          });
          dispatch(updateUserBalance(response.data));
          return response.status;
        }
        enqueueSnackbar("Error. Operation was not successful", {
          variant: "error",
        });
      }
      handleTopUp(amount);
    },
    [role, handleTopUp, enqueueSnackbar, dispatch],
  );

  const resetPaymentData = useCallback(() => {
    setPaymentData(null);
  }, []);

  return { onTopUpSubmit, isPending, paymentData, resetPaymentData };
}
