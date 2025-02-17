import { Box, IconButton, SxProps, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UploadButton from "@/components/ImageUpload/UploadButton";
import Image from "next/image";
import { useCallback } from "react";

type ImageUploadProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

const imageWrapperStyles: SxProps = {
  position: "relative",
  width: 300,
  height: 300,
};

const deleteButtonStyles: SxProps = {
  borderRadius: "50%",
  position: "absolute",
  top: "3px",
  right: "5px",
};

export default function ImageUpload<T extends FieldValues>({
  control,
  name,
}: ImageUploadProps<T>) {
  const handleUpload = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (data: { url: string; image: File }) => void,
    ) => {
      const files = e.target.files;
      if (files) {
        onChange({ url: URL.createObjectURL(files[0]), image: files[0] });
      }
    },
    [],
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => !!value,
      }}
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <>
          {value?.url ? (
            <Box sx={imageWrapperStyles}>
              <IconButton
                color="error"
                onClick={() => onChange(null)}
                aria-label="delete image"
                sx={deleteButtonStyles}
                disabled={isSubmitting}
              >
                <DeleteIcon />
              </IconButton>
              <Image src={value.url} width={300} height={300} alt="uploaded" />
            </Box>
          ) : (
            <>
              <UploadButton
                isLoading={isSubmitting}
                handleUpload={(e) => handleUpload(e, onChange)}
                isError={!!error}
              />
              {!!error && (
                <Typography color="error" variant="subtitle2">
                  Image is required
                </Typography>
              )}
            </>
          )}
        </>
      )}
    />
  );
}
