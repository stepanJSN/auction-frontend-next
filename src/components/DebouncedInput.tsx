"use client";
import { TextField } from "@mui/material";
import { useCallback } from "react";
import { useDebounceCallback } from "usehooks-ts";

type DebouncedInputProps = {
  label: string;
  defaultValue?: string;
  handleDebouncedChange: (value: string) => void;
};

export default function DebouncedInput({
  defaultValue,
  label,
  handleDebouncedChange,
}: DebouncedInputProps) {
  const debounced = useDebounceCallback(handleDebouncedChange, 500);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      debounced(event.target.value),
    [debounced],
  );
  return (
    <TextField
      defaultValue={defaultValue}
      label={label}
      onChange={handleInputChange}
      size="small"
    />
  );
}
