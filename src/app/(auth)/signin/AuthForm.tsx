"use client";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, SxProps } from "@mui/material";
import { ISingInRequest } from "@/interfaces/auth.interfaces";
import FormInput from "@/components/FormInput";
import {
  emailSchema,
  passwordSchema,
} from "@/constants/textFieldValidationRules";
import { signinAction } from "./signin.action";
import useErrorMessage from "@/hooks/useErrorMessage";
import { signinErrorMessages } from "./signinErrorMessages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formButtonStyles: SxProps = {
  mt: 1,
};

const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default function AuthForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<ISingInRequest>({
    resolver: zodResolver(signinSchema),
  });
  const getErrorMessage = useErrorMessage(signinErrorMessages);

  const signin = async (data: ISingInRequest) => {
    const result = await signinAction(data);
    if (result?.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(signin)}>
      {errors.root?.serverError.type && (
        <Alert severity="error">
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="Incorrect password"
        type="password"
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        type="submit"
        sx={formButtonStyles}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </Box>
  );
}
