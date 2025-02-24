"use client";
import { Alert, Button, Grid2, GridSize, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import CardFormInputs from "../CardFormInputs";
import { createCardAction } from "../cards.actions";
import { useEffect } from "react";
import useErrorMessage from "@/hooks/useErrorMessage";
import { createCardErrorMessages } from "./createCardErrorMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardFormSchema, ICardFrom } from "../cardFormSchema";

const alertStyles: SxProps = {
  mb: 1,
};

const imageContainerStyles: SxProps = {
  minWidth: "250px",
  height: "300px",
};

const imageBreakpoints: Record<string, GridSize> = {
  xs: 12,
  sm: "auto",
};

export default function CardForm() {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ICardFrom>({
    resolver: zodResolver(cardFormSchema),
  });
  const getErrorMessage = useErrorMessage(createCardErrorMessages);

  const submitAction = async (data: ICardFrom) => {
    const result = await createCardAction(data);
    if (result?.errorCode) {
      setError("root.serverError", { type: result.errorCode.toString() });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      {!isSubmitSuccessful && !errors.root?.serverError.type && (
        <Alert severity="info" sx={alertStyles}>
          Note: you can create a card only if all cards from api were sold
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert severity="info" sx={alertStyles}>
          Card created successfully
        </Alert>
      )}
      {errors.root?.serverError.type && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(+errors.root.serverError.type)}
        </Alert>
      )}
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
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
