import useErrorMessage from "@/hooks/useErrorMessage";
import {
  TransactionBedRequestCodesEnum,
  transactionErrorMessages,
} from "../transactionErrorMessages";
import { Alert } from "@mui/material";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import CreateStripeAccountButton from "./CreateStripeAccountButton";

const alertStyles = {
  mt: 1,
};

type WithdrawErrorProps = {
  errorCode: number;
};

export default function WithdrawError({ errorCode }: WithdrawErrorProps) {
  console.log(errorCode);
  const getErrorMessage = useErrorMessage(transactionErrorMessages);
  return (
    <Alert severity="error" sx={alertStyles}>
      {getErrorMessage(errorCode)}
      {(errorCode ===
        TransactionBedRequestCodesEnum.STRIPE_ACCOUNT_NOT_COMPLETED ||
        errorCode === ErrorCodesEnum.NotFound) && <CreateStripeAccountButton />}
    </Alert>
  );
}
