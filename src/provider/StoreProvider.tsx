"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { IUser } from "@/interfaces/user.interfaces";
import { getUserSuccess } from "@/lib/features/user/userSlice";

export default function StoreProvider({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: IUser;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(getUserSuccess(userData));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
