import FormLink from "@/components/FormLink";
import { FormWrapper } from "@/components/FormWrapper";
import { ROUTES } from "@/config/routesConfig";
import { Typography } from "@mui/material";
import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <FormWrapper>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Signup
      </Typography>
      <SignupForm />
      <FormLink href={ROUTES.SIGN_IN}>Sign in</FormLink>
    </FormWrapper>
  );
}
