import PageError from "@/components/PageError";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import { locationsService } from "@/services/locationsService";
import { Box, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import EditLocationForm from "../../../EditLocationForm";
import ModalPage from "@/components/ModalPage";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = +(await params).id;
  const { location, errorCode } = await locationsService.getOne(id);

  if (errorCode === ErrorCodesEnum.NotFound) {
    notFound();
  }

  if (!location) {
    return <PageError />;
  }
  return (
    <ModalPage>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Edit location</Typography>
        <EditLocationForm locationId={id} data={location} />
      </Box>
    </ModalPage>
  );
}
