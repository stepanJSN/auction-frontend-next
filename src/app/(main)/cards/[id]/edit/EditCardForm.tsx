"use client";
import { Gender } from "@/enums/gender.enum";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import { ILocation } from "@/interfaces/locations.interfaces";
import { Button, Grid2, GridSize, Stack, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import ImageUpload from "../../ImageUpload";
import CardFormInputs from "../../CardFormInputs";
import { editCardAction } from "../../cards.actions";
import Notification from "@/components/Notification";
import { ICard } from "@/interfaces/cards.interface";
import DeleteButton from "./DeleteButton";

export interface ICardFrom {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  location: ILocation;
  episodes: IEpisode[];
  image: {
    url: string;
    image?: Blob;
  } | null;
}

const imageContainerStyles: SxProps = {
  minWidth: "250px",
  height: "300px",
};

const imageBreakpoints: Record<string, GridSize> = {
  xs: 12,
  sm: "auto",
};

type CardFormProps = {
  data: ICard;
  cardId: string;
};

export default function CardForm({ data, cardId }: CardFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ICardFrom>({
    defaultValues: {
      name: data.name,
      type: data.type,
      gender: data.gender,
      isActive: data.is_active,
      location: data.location,
      episodes: data.episodes,
      image: {
        url: data.image_url,
      },
    },
  });

  const submitAction = async (data: ICardFrom) => {
    const result = await editCardAction(cardId, data);
    if (result?.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() });
    }
  };

  return (
    <>
      <Grid2
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(submitAction)}
      >
        <Grid2 size={imageBreakpoints} sx={imageContainerStyles}>
          <ImageUpload control={control} name="image" />
        </Grid2>
        <Grid2 size="grow">
          <CardFormInputs control={control} errors={errors} />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            <DeleteButton cardId={cardId} />
          </Stack>
        </Grid2>
      </Grid2>
      <Notification
        open={!!errors.root?.serverError.type}
        message="Failed to delete card, something went wrong"
        severity="error"
      />
      <Notification
        open={isSubmitSuccessful}
        message="Card updated successfully"
        severity="success"
      />
    </>
  );
}
