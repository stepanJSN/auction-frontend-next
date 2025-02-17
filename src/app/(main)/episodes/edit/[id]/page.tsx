import PageError from "@/components/PageError";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import { episodesService } from "@/services/episodesService";
import { Box, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import EditEpisodeForm from "../../EditEpisodeForm";

export default async function EditEpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = +(await params).id;
  const { episode, errorCode } = await episodesService.getOne(id);

  if (errorCode === ErrorCodesEnum.NotFound) {
    notFound();
  }

  if (!episode) {
    return <PageError />;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Edit episode</Typography>
      <EditEpisodeForm episodeId={id} data={episode} />
    </Box>
  );
}
