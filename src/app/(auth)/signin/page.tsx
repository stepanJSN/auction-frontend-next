import { FormWrapper } from "@/components/FormWrapper";
import AuthForm from "./AuthForm";
import { Typography } from "@mui/material";
import FormLink from "@/components/FormLink";
import { ROUTES } from "@/config/routesConfig";

export default function Signin() {
  return (
    <FormWrapper>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Signin
      </Typography>
      <AuthForm />
      <FormLink href={ROUTES.SIGN_UP}>Sign up</FormLink>
    </FormWrapper>
  );
}
