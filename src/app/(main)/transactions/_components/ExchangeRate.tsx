import { systemService } from "@/services/systemService";
import { Alert, Typography } from "@mui/material";

export default async function ExchangeRate() {
  const { data: exchangeRate } = await systemService.getExchangeRate();

  if (!exchangeRate) {
    return <Alert severity="error">Error. Unable to get exchange rate</Alert>;
  }

  return (
    <Typography variant="h5" gutterBottom>
      Exchange rate: for 1CP = {exchangeRate.exchange_rate}$
    </Typography>
  );
}
