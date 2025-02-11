import { Typography } from "@mui/material";
import ExchangeRate from "./ExchangeRate";

export default function SystemSettingsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        System settings
      </Typography>
      <ExchangeRate />
    </>
  );
}
