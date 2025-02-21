import { Button, Grid2, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, useFieldArray } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { IUserSummary } from "@/interfaces/user.interfaces";
import FormAutocomplete from "@/components/FormAutocomplete";
import { getUsersActions } from "@/app/(main)/users/users.actions";
import Autocomplete from "@/components/Autocomplete";
import { IChatForm } from "../chatForm.interface";

type ParticipantsFormListProps = {
  control: Control<IChatForm>;
  isError?: boolean;
};

export default function ParticipantsFormList({
  control,
  isError,
}: ParticipantsFormListProps) {
  const [selectedUser, setSelectedUser] = useState<IUserSummary | null>(null);
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: "participants",
        rules: { minLength: 1, required: true },
      }),
      [control],
    ),
  );

  const searchUsers = useCallback(
    (searchValue: string) => getUsersActions(1, { fullName: searchValue }),
    [],
  );
  const getUserLabel = useCallback(
    (user: IUserSummary | null) => `${user?.name} ${user?.surname}` || "",
    [],
  );

  const removeParticipant = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );
  const addParticipant = useCallback(() => {
    if (selectedUser) {
      append({
        id: selectedUser.id.toString(),
        name: selectedUser.name,
        surname: selectedUser.surname,
      });
      setSelectedUser(null);
    }
  }, [append, selectedUser]);

  return (
    <>
      {fields.map((field, index) => (
        <Grid2 container spacing={1} key={field.id}>
          <Grid2 size="grow">
            <FormAutocomplete
              control={control}
              name={`participants.${index}`}
              label="Participant"
              searchFunc={searchUsers}
              getLabel={getUserLabel}
              startFromLetter={2}
              noOptionsText="No users found"
              errorText="Please select an participant"
            />
          </Grid2>
          <Grid2>
            <IconButton
              aria-label="delete participant"
              onClick={removeParticipant(index)}
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
            label="Participant"
            searchFunc={searchUsers}
            getLabel={getUserLabel}
            startFromLetter={2}
            noOptionsText="No users found"
            value={selectedUser}
            onChange={setSelectedUser}
          />
          {isError && (
            <Typography color="error" variant="caption">
              Participants are required
            </Typography>
          )}
        </Grid2>
        <Grid2>
          <Button onClick={addParticipant} disabled={!selectedUser}>
            Add
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
