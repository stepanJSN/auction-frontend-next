"use client";
import FormInput from "@/components/FormInput";
import { numberFieldValidationRules } from "@/constants/textFieldValidationRules";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { Box, Typography, Button, SxProps } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type TransactionFormProps = {
  onSubmit: (amount: number) => Promise<MutationStatusEnum | undefined>;
  title: string;
};

const formStyles: SxProps = {
  border: 1,
  borderStyle: "solid",
  borderColor: "primary.main",
  borderRadius: 3,
  p: 2,
  minWidth: "300px",
};

const buttonStyles = {
  minWidth: "150px",
};

export default function TransactionForm({
  title,
  onSubmit,
}: TransactionFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ amount: string }>();

  const onFormSubmit = useCallback(
    async (data: { amount: string }) => {
      const status = await onSubmit(+data.amount);
      if (status === MutationStatusEnum.SUCCESS) {
        reset();
      }
    },
    [onSubmit, reset],
  );

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={formStyles}
      >
        <Typography variant="h5">{title}</Typography>
        <FormInput
          control={control}
          name="amount"
          label="Amount"
          type="number"
          errorText="Amount is required and must be a number"
          rules={numberFieldValidationRules}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={buttonStyles}
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </Button>
      </Box>
    </>
  );
}
