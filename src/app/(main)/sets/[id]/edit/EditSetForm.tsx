"use client";
import { useMemo, useCallback, useEffect } from "react";
import { Button, Grid2 } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ISetForm } from "@/interfaces/sets.interface";
import SetFormInputs from "../../SetFormInputs";
import CardsList from "../../CardsList";
import { ICardSummary } from "@/interfaces/cards.interface";
import RemoveCardButton from "../../RemoveCardButton";
import Card from "@/components/Card";
import Notification from "@/components/Notification";
import { editSetAction } from "../../sets.action";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { delay } from "@/helpers/delay";

const formContainerStyles = {
  width: "100%",
};
const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };
const formSpacing = { xs: 0, sm: 1 };

type EditSetFormProps = {
  data: ISetForm;
  cardId: string;
};

export default function EditSetForm({ data, cardId }: EditSetFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm<ISetForm>(
    useMemo(
      () => ({
        defaultValues: {
          name: data.name,
          bonus: data.bonus,
          cards: data.cards,
        },
      }),
      [data],
    ),
  );

  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: "cards",
        keyName: "formId",
        rules: { minLength: 1, required: true },
      }),
      [control],
    ),
  );

  useEffect(() => {
    async function resetForm() {
      await delay(2000);
      reset(undefined, { keepValues: true });
    }
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, reset]);

  const handleAddCard = useCallback(
    (value: ICardSummary) => {
      append(value);
    },
    [append],
  );

  const editSet = async (data: ISetForm) => {
    const result = await editSetAction(cardId, data);
    if (result.status === MutationStatusEnum.ERROR) {
      setError("root.serverError", { type: "serverError" });
    }
  };

  return (
    <>
      <Grid2
        container
        spacing={formSpacing}
        component="form"
        onSubmit={handleSubmit(editSet)}
        sx={formContainerStyles}
      >
        <SetFormInputs control={control} />
        <Grid2 container spacing={2} size={12}>
          {fields.map((field, index) => (
            <Grid2 key={field.formId} size={cardColumnsNumber}>
              <Card {...field}>
                <RemoveCardButton index={index} remove={remove} />
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Grid2 size="auto">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <CardsList handleAddCard={handleAddCard} cardsInSet={fields} />
        </Grid2>
      </Grid2>
      <Notification
        open={!!errors.root?.serverError.type}
        message="Failed to update set, something went wrong"
        severity="error"
      />
      <Notification
        open={!!errors.cards}
        message="Set should have at least one card"
        severity="error"
      />
      <Notification
        open={isSubmitSuccessful}
        message="Set updated successfully"
        severity="success"
      />
    </>
  );
}
