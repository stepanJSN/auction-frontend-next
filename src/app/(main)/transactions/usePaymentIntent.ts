import useMutation from "@/hooks/useMutation";
import { useCallback, useState } from "react";
import { createPaymentIntentAction } from "./transactions.actions";

export default function usePaymentIntent() {
  const [paymentData, setPaymentData] = useState<{
    clientSecret: string;
    numberOfPoints: number;
  } | null>();
  const { mutate, isPending } = useMutation(createPaymentIntentAction);

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

  const resetPaymentData = useCallback(() => {
    setPaymentData(null);
  }, []);

  return { handleTopUp, isPending, paymentData, resetPaymentData };
}
