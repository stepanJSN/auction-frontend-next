import { Typography } from "@mui/material";
import CreateSetForm from "./CreateSetForm";

export default function CreateSetPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Set
      </Typography>
      <CreateSetForm />
    </>
  );
}
