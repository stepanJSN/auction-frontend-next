"use client";
import useMutation from "@/hooks/useMutation";
import { Button } from "@mui/material";
import { createStripeAccountAction } from "../transactions.actions";

export default function CreateStripeAccountButton() {
  const { isPending: isAccountCreating, mutate: createAccount } = useMutation(
    createStripeAccountAction,
  );

  return (
    <Button disabled={isAccountCreating} onClick={createAccount} size="small">
      {isAccountCreating ? "Creating..." : "Create account"}
    </Button>
  );
}
