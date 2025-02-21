"use client";
import { useCallback } from "react";
import { Alert, Button, Stack, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { IChatForm } from "../../../chatForm.interface";
import FormInput from "@/components/FormInput";
import { optionalTextFieldValidationRules } from "@/constants/textFieldValidationRules";
import ParticipantsFormList from "../../../_components/ParticipantsFormList";
import useErrorMessage from "@/hooks/useErrorMessage";
import { chatErrorMessages } from "../../../chatErrorMessages";
import { createChatAction } from "../../../chats.actions";

const alertStyles: SxProps = {
  mb: 1,
};

export default function CreateChatForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IChatForm>();
  const getErrorMessage = useErrorMessage(chatErrorMessages);

  const createChat = useCallback(
    async (data: IChatForm) => {
      const response = await createChatAction({
        name: data.name,
        participants: data.participants.map((participant) => participant.id),
      });
      if (response.errorCode) {
        setError("root.serverError", { type: response.errorCode.toString() });
      }
    },
    [setError],
  );

  return (
    <>
      {!isSubmitSuccessful && !errors.root?.serverError.type && (
        <Alert severity="info" sx={alertStyles}>
          Chat with more than 2 participants should have a name
        </Alert>
      )}
      {errors.root?.serverError.type && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="success" sx={alertStyles}>
          Chat created successfully
        </Alert>
      )}
      <Stack spacing={1} component="form" onSubmit={handleSubmit(createChat)}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 30 characters long"
          rules={optionalTextFieldValidationRules}
        />
        <ParticipantsFormList
          control={control}
          isError={!!errors.participants}
        />
        <Button
          disabled={isSubmitSuccessful || isSubmitting}
          type="submit"
          variant="contained"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </Stack>
    </>
  );
}
