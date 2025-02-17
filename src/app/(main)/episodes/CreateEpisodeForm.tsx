"use client";
import FormInput from "@/components/FormInput";
import { textFieldValidationRules } from "@/constants/textFieldValidationRules";
import { delay } from "@/helpers/delay";
import useErrorMessage from "@/hooks/useErrorMessage";
import { ICreateEpisode } from "@/interfaces/episodes.interfaces";
import { Alert, Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createEpisodeAction } from "./episodes.actions";
import { episodeErrorMessages } from "./episodeErrorMessages";

export default function CreateEpisodeForm() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<ICreateEpisode>();
  const getErrorMessage = useErrorMessage(episodeErrorMessages);

  const createEpisode = useCallback(
    async (data: ICreateEpisode) => {
      const result = await createEpisodeAction(data);
      if (result.errorCode) {
        setError("root.serverError", { type: result.errorCode.toString() });
      }
    },
    [setError],
  );

  useEffect(() => {
    async function resetForm() {
      await delay(2000);
      reset();
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
        <Alert severity="success">Episode created successfully</Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(createEpisode)}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
        <FormInput
          name="code"
          label="Code"
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
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </Box>
    </>
  );
}
