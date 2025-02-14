"use client";
import { useMemo, useCallback, useEffect } from "react";
import { Button, Grid2 } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ISetForm } from "@/interfaces/sets.interface";
import SetFormInputs from "../SetFormInputs";
import CardsList from "../CardsList";
import { ICardSummary } from "@/interfaces/cards.interface";
import RemoveCardButton from "../RemoveCardButton";
import Card from "@/components/Card";
import { createSetAction } from "../sets.action";

const formContainerStyles = {
  width: "100%",
};
const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };
const formSpacing = { xs: 0, sm: 1 };

export default function SetForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<ISetForm>();

  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: "cards",
        keyName: "formId",
      }),
      [control],
    ),
  );

  const handleAddCard = useCallback(
    (value: ICardSummary) => {
      append(value);
    },
    [append],
  );

  const createSet = (data: ISetForm) => {
    createSetAction(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      remove();
    }
  }, [isSubmitSuccessful, reset, remove]);

  return (
    <Grid2
      container
      spacing={formSpacing}
      component="form"
      onSubmit={handleSubmit(createSet)}
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
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <CardsList handleAddCard={handleAddCard} cardsInSet={fields} />
      </Grid2>
    </Grid2>
  );
}
