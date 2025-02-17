"use client";
import FormInput from "@/components/FormInput";
import { textFieldValidationRules } from "@/constants/textFieldValidationRules";
import { delay } from "@/helpers/delay";
import useErrorMessage from "@/hooks/useErrorMessage";
import { ICreateEpisode, IEpisode } from "@/interfaces/episodes.interfaces";
import { Alert, Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editEpisodeAction } from "./episodes.actions";
import { episodeErrorMessages } from "./episodeErrorMessages";

type EditEpisodeFormProps = {
  data: IEpisode;
  episodeId: number;
};

export default function EditEpisodeForm({
  data,
  episodeId,
}: EditEpisodeFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<ICreateEpisode>({
    defaultValues: {
      name: data.name,
      code: data.code,
    },
  });
  const getErrorMessage = useErrorMessage(episodeErrorMessages);

  const editEpisode = useCallback(
    async (data: ICreateEpisode) => {
      const result = await editEpisodeAction(episodeId, data);
      if (result.errorCode) {
        setError("root.serverError", { type: result.errorCode.toString() });
      }
    },
    [setError, episodeId],
  );

  useEffect(() => {
    async function resetForm() {
      await delay(2000);
      reset(undefined, { keepValues: true });
    }
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      {!isSubmitSuccessful && !errors.root?.serverError.type && (
        <Alert severity="info">Each episode should have a unique name</Alert>
      )}
      {errors.root?.serverError.type && (
        <Alert severity="error">
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="success">Episode updated successfully</Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(editEpisode)}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
        <FormInput
          name="code"
          label="code"
          control={control}
          errorText="The code must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Editing..." : "Edit"}
        </Button>
      </Box>
    </>
  );
}
