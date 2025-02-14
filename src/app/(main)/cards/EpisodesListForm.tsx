import { Grid2, IconButton, Button, Typography } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import { getEpisodesByNameAction } from "./cards.actions";
import FormAutocomplete from "@/components/FormAutocomplete";
import Autocomplete from "@/components/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICardFrom } from "@/interfaces/cards.interface";

export type EpisodesListFormProps = {
  control: Control<ICardFrom>;
  isError: boolean;
};

export default function EpisodesListForm({
  control,
  isError,
}: EpisodesListFormProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: "episodes",
        rules: { minLength: 1, required: true },
      }),
      [control],
    ),
  );

  const searchEpisodesFunc = useCallback(
    (searchValue: string) => getEpisodesByNameAction(searchValue),
    [],
  );
  const getEpisodesLabel = useCallback(
    (episode: IEpisode | null) => episode?.name || "",
    [],
  );

  const removeEpisode = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );
  const addEpisode = useCallback(() => {
    if (selectedEpisode) {
      append(selectedEpisode);
      setSelectedEpisode(null);
    }
  }, [append, selectedEpisode]);

  return (
    <>
      {fields.map((field, index) => (
        <Grid2 container spacing={1} key={field.id}>
          <Grid2 size="grow">
            <FormAutocomplete
              control={control}
              name={`episodes.${index}`}
              label="Episode"
              searchFunc={searchEpisodesFunc}
              getLabel={getEpisodesLabel}
              startFromLetter={2}
              noOptionsText="No episodes found"
              errorText="Please select an episode"
            />
          </Grid2>
          <Grid2>
            <IconButton
              aria-label="Remove"
              onClick={removeEpisode(index)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      ))}
      <Grid2 container spacing={1} alignItems="center">
        <Grid2 size="grow">
          <Autocomplete
            label="Episode"
            searchFunc={searchEpisodesFunc}
            getLabel={getEpisodesLabel}
            startFromLetter={2}
            noOptionsText="No episodes found"
            value={selectedEpisode}
            onChange={setSelectedEpisode}
          />
          {isError && (
            <Typography color="error" variant="caption">
              Episodes are required
            </Typography>
          )}
        </Grid2>
        <Grid2>
          <Button onClick={addEpisode} disabled={!selectedEpisode}>
            Add
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
