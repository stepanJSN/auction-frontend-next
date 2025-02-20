"use client";
import useMutation from "@/hooks/useMutation";
import { Alert, Button } from "@mui/material";
import { createStripeAccountAction } from "../transactions.actions";

const alertStyles = {
  mt: 1,
};

export default function CreateStripeAccountButton() {
  const { isPending: isAccountCreating, mutate: createAccount } = useMutation(
    createStripeAccountAction,
  );

  return (
    <Alert severity="warning" sx={alertStyles}>
      If you want to withdraw funds, you need to add create a Stripe account.
      <Button disabled={isAccountCreating} onClick={createAccount} size="small">
        {isAccountCreating ? "Creating..." : "Create account"}
      </Button>
    </Alert>
  );
}
