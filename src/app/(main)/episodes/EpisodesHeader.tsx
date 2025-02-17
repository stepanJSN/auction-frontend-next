"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { ROUTES } from "@/config/routesConfig";
import { Stack, Button, SxProps } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const episodesHeaderStyles: SxProps = {
  mb: 2,
};

const episodeHeaderFlexDirection: ResponsiveStyleValue<
  "row" | "row-reverse" | "column" | "column-reverse"
> = {
  xs: "column",
  sm: "row",
};

export default function EpisodesHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchEpisodeName = searchParams.get("episodeName") || "";

  const changeSearchEpisodeName = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("episodeName", newValue);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Stack
      direction={episodeHeaderFlexDirection}
      spacing={1}
      sx={episodesHeaderStyles}
    >
      <DebouncedInput
        defaultValue={searchEpisodeName}
        label="Episode name"
        handleDebouncedChange={changeSearchEpisodeName}
      />
      <Button component={Link} href={ROUTES.CREATE_EPISODE} variant="outlined">
        Create episode
      </Button>
    </Stack>
  );
}
