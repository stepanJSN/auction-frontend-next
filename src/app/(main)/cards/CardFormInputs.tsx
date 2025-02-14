import FormAutocomplete from "@/components/FormAutocomplete";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormSwitch from "@/components/FormSwitch";
import {
  textFieldValidationRules,
  optionalTextFieldValidationRules,
} from "@/constants/textFieldValidationRules";
import { Stack } from "@mui/material";
import React, { useCallback } from "react";
import EpisodesListForm from "./EpisodesListForm";
import { Control, FieldErrors } from "react-hook-form";
import { ICardFrom } from "./create/CreateCardForm";
import { ILocation } from "@/interfaces/locations.interfaces";
import { getLocationsByNameAction } from "./cards.actions";

type CardFormInputsProps = {
  control: Control<ICardFrom>;
  errors: FieldErrors<ICardFrom>;
};

const formContainerStyles = {
  width: "100%",
  mb: 1,
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function CardFormInputs({
  control,
  errors,
}: CardFormInputsProps) {
  const searchLocationFunc = useCallback(
    (searchValue: string) => getLocationsByNameAction(searchValue),
    [],
  );
  const getLocationLabel = useCallback(
    (location: ILocation | null) => location?.name || "",
    [],
  );

  return (
    <Stack spacing={1} sx={formContainerStyles}>
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
        rules={optionalTextFieldValidationRules}
      />
      <FormSelect
        name="gender"
        control={control}
        label="Gender"
        defaultValue={genderOptions[0].value}
        options={genderOptions}
      />
      <FormSwitch
        control={control}
        name="isActive"
        label="Active"
        defaultValue={false}
      />
      <FormAutocomplete
        control={control}
        name="location"
        label="Location"
        searchFunc={searchLocationFunc}
        getLabel={getLocationLabel}
        startFromLetter={2}
        required
        noOptionsText="No locations found"
        errorText="Please select a location"
      />
      <EpisodesListForm control={control} isError={!!errors.episodes} />
    </Stack>
  );
}
