import {
  Alert,
  Box,
  Button,
  Dialog,
  IconButton,
  LinearProgress,
  SxProps,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import usePayment from "../usePayment";
import { PaymentElement } from "@stripe/react-stripe-js";

const formWrapperStyles: SxProps = {
  p: 2,
  minWidth: {
    xs: "300px",
    sm: "400px",
  },
  minHeight: "300px",
};
const titleStyles: SxProps = {
  maxWidth: "90%",
};
const closeIconStyles: SxProps = {
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: "common.white",
};

type PaymentFromProps = {
  numberOfPoints: number | null;
  exchangeRate: number;
  handleClose: () => void;
};

export default function PaymentForm({
  numberOfPoints,
  exchangeRate,
  handleClose,
}: PaymentFromProps) {
  const { isLoading, errorMessage, handleConfirmPayment, isSubmitAvailable } =
    usePayment();

  return (
    <Dialog open={!!numberOfPoints} maxWidth="lg" onClose={handleClose}>
      <IconButton onClick={handleClose} aria-label="close" sx={closeIconStyles}>
        <CloseIcon />
      </IconButton>
      {isLoading && <LinearProgress />}
      <Box sx={formWrapperStyles}>
        {numberOfPoints && (
          <Typography variant="h6" gutterBottom sx={titleStyles}>
            You will be charged ${(numberOfPoints * exchangeRate).toFixed(2)}{" "}
            for {numberOfPoints}CP
          </Typography>
        )}
        <form onSubmit={handleConfirmPayment}>
          <PaymentElement />
          <Button disabled={!isSubmitAvailable} type="submit">
            Submit
          </Button>
        </form>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Dialog>
  );
}
