"use client";
import FormInput from "@/components/FormInput";
import { textFieldValidationRules } from "@/constants/textFieldValidationRules";
import { delay } from "@/helpers/delay";
import useErrorMessage from "@/hooks/useErrorMessage";
import { ICreateLocation, ILocation } from "@/interfaces/locations.interfaces";
import { Alert, Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editLocationAction } from "./locations.actions";
import { locationErrorMessages } from "./locationErrorMessages";

type EditLocationFormProps = {
  data: ILocation;
  locationId: number;
};

export default function EditLocationForm({
  data,
  locationId,
}: EditLocationFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<ICreateLocation>({
    defaultValues: {
      name: data.name,
      type: data.type,
    },
  });
  const getErrorMessage = useErrorMessage(locationErrorMessages);

  const editLocation = useCallback(
    async (data: ICreateLocation) => {
      const result = await editLocationAction(locationId, data);
      if (result.errorCode) {
        setError("root.serverError", { type: result.errorCode.toString() });
      }
    },
    [setError, locationId],
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
        <Alert severity="info">Each location should have a unique name</Alert>
      )}
      {errors.root?.serverError.type && (
        <Alert severity="error">
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="success">Location updated successfully</Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(editLocation)}>
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
          {isSubmitting ? "Editing..." : "Edit"}
        </Button>
      </Box>
    </>
  );
}
