"use client";

import FormInput from "@/components/FormInput";
import { ICreateUser } from "@/interfaces/user.interfaces";
import { Alert, Box, Button, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { signupAction } from "./signup.action";
import Link from "@/components/Link";
import { ROUTES } from "@/config/routesConfig";
import useErrorMessage from "@/hooks/useErrorMessage";
import { signupErrorMessages } from "./signupErrorMessages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  passwordSchema,
  userNameSchema,
} from "@/constants/textFieldValidationRules";

const formButtonStyles: SxProps = { mt: 1 };

const signupSchema = z.object({
  email: emailSchema,
  name: userNameSchema,
  surname: userNameSchema,
  password: passwordSchema,
});

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ICreateUser>({
    resolver: zodResolver(signupSchema),
  });
  const getErrorMessage = useErrorMessage(signupErrorMessages);

  const signup = async (data: ICreateUser) => {
    const result = await signupAction(data);
    if (result?.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(signup)}>
      {errors.root?.serverError.type && (
        <Alert severity="error">
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="success">
          Registration successful. You can now{" "}
          <Link href={ROUTES.SIGN_IN}>sign in</Link>
        </Alert>
      )}
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
      />
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
      />
      <FormInput
        name="surname"
        label="Surname"
        control={control}
        errorText="The surname must be between 2 and 15 characters long"
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="The password must be between 8 and 16 characters long"
        type="password"
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isSubmitting || isSubmitSuccessful}
        type="submit"
        sx={formButtonStyles}
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
      </Button>
    </Box>
  );
}
