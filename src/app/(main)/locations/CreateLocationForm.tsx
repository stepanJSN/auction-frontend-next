"use client";
import FormInput from "@/components/FormInput";
import { textFieldValidationRules } from "@/constants/textFieldValidationRules";
import { delay } from "@/helpers/delay";
import useErrorMessage from "@/hooks/useErrorMessage";
import { ICreateLocation } from "@/interfaces/locations.interfaces";
import { Alert, Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createLocationAction } from "./locations.actions";
import { locationErrorMessages } from "./locationErrorMessages";

export default function CreateLocationForm() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<ICreateLocation>();
  const getErrorMessage = useErrorMessage(locationErrorMessages);

  const createLocation = useCallback(
    async (data: ICreateLocation) => {
      const result = await createLocationAction(data);
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
        <Alert severity="info">Each location should have a unique name</Alert>
      )}
      {errors.root?.serverError.type && (
        <Alert severity="error">
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="success">Location created successfully</Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(createLocation)}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
        <FormInput
          name="type"
          label="Type"
          control={control}
          errorText="The type must be between 2 and 15 characters long"
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
