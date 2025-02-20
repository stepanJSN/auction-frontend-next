import { useCallback, useState } from "react";

export default function useMutation<T, R>(mutateAction: (data: T) => R) {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    async (data: T) => {
      setIsPending(true);
      const response = await mutateAction(data);
      setIsPending(false);
      return response;
    },
    [mutateAction],
  );

  return { mutate, isPending };
}
