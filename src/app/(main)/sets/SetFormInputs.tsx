import FormInput from "@/components/FormInput";
import {
  textFieldValidationRules,
  numberFieldValidationRules,
} from "@/constants/textFieldValidationRules";
import { ISetForm } from "@/interfaces/sets.interface";
import { Grid2 } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";

const inputColumnsNumber = { xs: 12, sm: 6 };

type SetFormInputsProps = {
  control: Control<ISetForm>;
};

export default function SetFormInputs({ control }: SetFormInputsProps) {
  return (
    <>
      <Grid2 size={inputColumnsNumber}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
      </Grid2>
      <Grid2 size={inputColumnsNumber}>
        <FormInput
          name="bonus"
          label="Bonus"
          type="number"
          control={control}
          errorText="The bonus is required"
          rules={numberFieldValidationRules}
        />
      </Grid2>
    </>
  );
}
