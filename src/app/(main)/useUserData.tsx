import { getUser } from "@/lib/features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useUserData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
}
