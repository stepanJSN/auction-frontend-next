"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { ROUTES } from "@/config/routesConfig";
import { Stack, Button, SxProps } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const locationsHeaderStyles: SxProps = {
  mb: 2,
};

const locationHeaderFlexDirection: ResponsiveStyleValue<
  "row" | "row-reverse" | "column" | "column-reverse"
> = {
  xs: "column",
  sm: "row",
};

export default function LocationsHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchLocationName = searchParams.get("locationName") || "";

  const changeSearchLocationName = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("locationName", newValue);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Stack
      direction={locationHeaderFlexDirection}
      spacing={1}
      sx={locationsHeaderStyles}
    >
      <DebouncedInput
        defaultValue={searchLocationName}
        label="Location name"
        handleDebouncedChange={changeSearchLocationName}
      />
      <Button component={Link} href={ROUTES.CREATE_LOCATION} variant="outlined">
        Create location
      </Button>
    </Stack>
  );
}
