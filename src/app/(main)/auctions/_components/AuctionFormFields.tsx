import FormDateTimePicker from "@/components/FormDateTimePicker";
import FormInput from "@/components/FormInput";
import { Grid2 } from "@mui/material";
import { Control } from "react-hook-form";
import { CreateAuctionFormType } from "../create/[cardId]/_components/AuctionForm";

const inputGridSize = {
  xs: 12,
  sm: 6,
};
const inputValidationRules = {
  pattern: /^\d+$/,
  required: true,
};
const optionalInputValidationRules = {
  pattern: /^\d+$/,
};

type AuctionFormFieldsProps = {
  control: Control<CreateAuctionFormType>;
  isFormInactive?: boolean;
};

export default function AuctionFormFields({
  control,
  isFormInactive,
}: AuctionFormFieldsProps) {
  return (
    <>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="startingBid"
          label="Starting bid"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Starting bid is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="minBidStep"
          label="Min bid step"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Min bid step is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="maxBid"
          label="Max bid"
          type="number"
          margin="none"
          rules={optionalInputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Max bid must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="minLength"
          label="Min length in minutes"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Min length is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormDateTimePicker
          name="endTime"
          label="End time"
          control={control}
          disabled={isFormInactive}
          required
          errorText="End time is required"
        />
      </Grid2>
    </>
  );
}
