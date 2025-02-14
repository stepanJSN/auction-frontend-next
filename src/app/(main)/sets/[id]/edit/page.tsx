import { Typography } from "@mui/material";
import { setsService } from "@/services/setsService";
import { notFound } from "next/navigation";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import PageError from "@/components/PageError";
import EditSetForm from "./EditSetForm";

export default async function CreateSetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data, errorCode } = await setsService.getOne(id);

  if (errorCode === ErrorCodesEnum.NotFound) {
    notFound();
  }

  if (!data) {
    return <PageError />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit Set
      </Typography>
      <EditSetForm data={data} setId={id} />
    </>
  );
}
