import { Typography } from "@mui/material";
import CreateCardForm from "./EditCardForm";
import { cardsService } from "@/services/cardsService";
import PageError from "@/components/PageError";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import { notFound } from "next/navigation";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data, errorCode } = await cardsService.getOne(id);

  if (errorCode === ErrorCodesEnum.NotFound) {
    notFound();
  }

  if (!data) {
    return <PageError />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit Card
      </Typography>
      <CreateCardForm data={data} cardId={id} />
    </>
  );
}
