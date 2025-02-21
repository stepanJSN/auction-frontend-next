"use client";
import { useCallback, useEffect } from "react";
import { Alert, Button, Stack, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { IChatForm } from "../../../chatForm.interface";
import FormInput from "@/components/FormInput";
import { optionalTextFieldValidationRules } from "@/constants/textFieldValidationRules";
import ParticipantsFormList from "../../../_components/ParticipantsFormList";
import useErrorMessage from "@/hooks/useErrorMessage";
import { chatErrorMessages } from "../../../chatErrorMessages";
import { updateChatAction } from "../../../chats.actions";
import { IChat } from "@/interfaces/chats.interfaces";
import { delay } from "@/helpers/delay";

const alertStyles: SxProps = {
  mb: 1,
};

type EditChatFormProps = {
  initialData: IChat;
};

export default function EditChatForm({ initialData }: EditChatFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IChatForm>({
    defaultValues: {
      name: initialData.name,
      participants: initialData.users,
    },
  });
  const getErrorMessage = useErrorMessage(chatErrorMessages);

  const updateChat = useCallback(
    async (data: IChatForm) => {
      const response = await updateChatAction(initialData.id, {
        name: data.name,
        participants: data.participants.map((participant) => participant.id),
      });
      if (response.errorCode) {
        setError("root.serverError", { type: response.errorCode.toString() });
      }
    },
    [initialData.id, setError],
  );

  useEffect(() => {
    async function resetForm() {
      await delay(2000);
      reset();
    }
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, reset]);

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
          Chat updated successfully
        </Alert>
      )}
      <Stack spacing={1} component="form" onSubmit={handleSubmit(updateChat)}>
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
        <Button disabled={isSubmitting} type="submit" variant="contained">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </Stack>
    </>
  );
}
