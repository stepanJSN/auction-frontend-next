import { Typography } from "@mui/material";
import CreateCardForm from "./CreateCardForm";

export default function CreateCardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Card
      </Typography>
      <CreateCardForm />
    </>
  );
}
