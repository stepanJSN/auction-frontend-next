import { transactionsService } from "@/services/transactionsService";
import { Alert, Typography } from "@mui/material";

export default async function SystemFee() {
  const { data: totalAmount } = await transactionsService.getFeeAmount();

  if (!totalAmount) {
    return <Alert severity="error">Error. Unable to get system fee</Alert>;
  }

  return (
    <Typography variant="h5" gutterBottom>
      System fee amount: {totalAmount.totalFeeAmount} CP
    </Typography>
  );
}
