"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CHAT_NAME_PARAM = "name";

export default function SearchChats() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const chatName = searchParams.get(CHAT_NAME_PARAM);

  const handleNameFilterChange = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(CHAT_NAME_PARAM, newValue);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  return (
    <DebouncedInput
      defaultValue={chatName || ""}
      handleDebouncedChange={handleNameFilterChange}
      label="Search"
    />
  );
}
