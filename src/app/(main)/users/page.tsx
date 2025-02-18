import { Typography } from "@mui/material";
import UsersFilters from "./UsersFilters";
import { IGetUserPayload } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";
import PageError from "@/components/PageError";
import UsersData from "./UsersData";

export default async function UsersPage(props: {
  searchParams?: Promise<Omit<IGetUserPayload, "page">>;
}) {
  const searchParams = await props.searchParams;
  const { data: users } = await userService.getAll({
    sortOrder: searchParams?.sortOrder,
    sortType: searchParams?.sortType,
    isAdmin: searchParams?.isAdmin,
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <UsersFilters />
      {!users && <PageError />}
      {users && users.data.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no users
        </Typography>
      )}
      {users && users.data.length !== 0 && (
        <UsersData
          initialUsers={users.data}
          filters={searchParams || {}}
          hasMore={users.info.page !== users.info.totalPages}
        />
      )}
    </>
  );
}
