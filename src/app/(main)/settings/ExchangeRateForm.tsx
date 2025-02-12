"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, LinearProgress, SxProps } from "@mui/material";
import { updateExchangeRate } from "./settings.actions";
import FormInput from "@/components/FormInput";
import Notification from "@/components/Notification";

const formStyles: SxProps = {
  maxWidth: "500px",
};

const formValidationRules = {
  pattern: /^(?!0$)([1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/,
};

type ExchangeRateFormProps = {
  exchangeRate: number;
};

export default function ExchangeRateForm({
  exchangeRate,
}: ExchangeRateFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<{
    exchangeRate: string;
  }>();

  useEffect(() => {
    setValue("exchangeRate", exchangeRate.toString());
  }, [setValue, exchangeRate]);

  const handleUpdateExchangeRate = async (data: { exchangeRate: string }) => {
    const result = await updateExchangeRate(+data.exchangeRate);
    if (result.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleUpdateExchangeRate)}
      sx={formStyles}
    >
      {isSubmitting && <LinearProgress />}
      <FormInput
        name="exchangeRate"
        label="Exchange Rate"
        type="number"
        control={control}
        rules={formValidationRules}
        errorText="Exchange rate should be a positive number and not zero. Format: 0.00"
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update"}
      </Button>
      <Notification
        open={!!errors.root?.serverError}
        message="Somethings went wrong while updating exchange rate"
        severity="error"
      />
    </Box>
  );
}
