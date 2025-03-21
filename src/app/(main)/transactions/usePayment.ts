import { ROUTES } from "@/config/routesConfig";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
export default function usePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPayment = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url:
            window.location.origin +
            ROUTES.TRANSACTIONS +
            "?isTopUpSuccessful=true",
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? "Unknown error");
      }

      setIsLoading(false);
    },
    [elements, stripe],
  );

  return {
    handleConfirmPayment,
    errorMessage,
    isLoading,
    isSubmitAvailable: !!stripe,
  };
}
