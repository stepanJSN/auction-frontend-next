"use client";
import Select from "@/components/Select";
import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const numberOfUsersSelectOptions = [
  { value: "1", label: "10" },
  { value: "2", label: "20" },
  { value: "5", label: "50" },
];

const NUMBER_OF_USERS_PARAM = "numberOfUsers";

export default function UsersSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const numberOfUsers = Number(searchParams.get(NUMBER_OF_USERS_PARAM)) || 10;

  const handleSelect = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    params.set(NUMBER_OF_USERS_PARAM, event.target.value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      label="Number of users"
      value={numberOfUsers.toString()}
      options={numberOfUsersSelectOptions}
      handleChange={handleSelect}
    />
  );
}
