"use client"
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, SxProps } from '@mui/material';
import { ISingInRequest } from '@/interfaces/auth.interfaces';
import FormInput from '@/components/FormInput';
import { emailValidationRules, passwordValidationRules } from '@/constants/textFieldValidationRules';
import { signinAction } from './signin.action';
import useErrorMessage from '@/hooks/useErrorMessage';
import { signinErrorMessages } from './signinErrorMessages';

const formButtonStyles: SxProps = {
  mt: 1,
};

export default function AuthForm() {
  const { control, handleSubmit, formState: { isSubmitting, errors }, setError } = useForm<ISingInRequest>();
  const getErrorMessage = useErrorMessage(signinErrorMessages);

  const signin = async (data: ISingInRequest) => {
    const result = await signinAction(data);
    if(result.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() })
    }
  }


  return (
    <Box component="form" onSubmit={handleSubmit(signin)}>
      {errors.root?.serverError.type && <Alert severity="error">{getErrorMessage(+errors.root.serverError.type)}</Alert>}
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
        rules={emailValidationRules}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="Incorrect password"
        rules={passwordValidationRules}
        type="password"
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        type="submit"
        sx={formButtonStyles}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </Box>
  );
}
