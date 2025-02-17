import BasicSelect from "@/components/Select";
import Switch from "@/components/Switch";
import { SortOrderEnum } from "@/enums/sortOrder.enum";
import { UsersSortTypeEnum } from "@/interfaces/user.interfaces";
import { Grid2, GridSize, SelectChangeEvent, SxProps } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const filterContainerStyles: SxProps = {
  mb: 2,
};

const sortColumnsBreakpoints: Record<string, GridSize> = {
  xs: "auto",
  md: 3,
};

const sortByOptions = [
  { value: UsersSortTypeEnum.CREATION_DATE, label: "Creation date" },
  { value: UsersSortTypeEnum.RATING, label: "Rating" },
];

const sortOrderOptions = [
  { value: SortOrderEnum.ASC, label: "Ascending" },
  { value: SortOrderEnum.DESC, label: "Descending" },
];

export default function UsersFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sortType =
    searchParams.get("sortType") || UsersSortTypeEnum.CREATION_DATE;
  const sortOrder = searchParams.get("sortOrder") || SortOrderEnum.ASC;
  const showOnlyAdmins = !!searchParams.get("showOnlyAdmins");

  const changeSortType = useCallback(
    (event: SelectChangeEvent) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortType", event.target.value);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const changeSortOrder = useCallback(
    (event: SelectChangeEvent) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortOrder", event.target.value);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const toggleShowOnlyAdmins = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (event.target.checked) {
        params.set("showOnlyAdmins", "true");
      } else {
        params.delete("showOnlyAdmins");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  return (
    <Grid2 spacing={1} sx={filterContainerStyles} container>
      <Grid2 size={sortColumnsBreakpoints}>
        <BasicSelect
          label="Sort by"
          value={sortType}
          options={sortByOptions}
          handleChange={changeSortType}
        />
      </Grid2>
      <Grid2 size={sortColumnsBreakpoints}>
        <BasicSelect
          label="Sort order"
          value={sortOrder}
          options={sortOrderOptions}
          handleChange={changeSortOrder}
        />
      </Grid2>
      <Grid2>
        <Switch
          label="Show only admins"
          checked={showOnlyAdmins}
          handleChange={toggleShowOnlyAdmins}
        />
      </Grid2>
    </Grid2>
  );
}
