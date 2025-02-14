import { useCallback, useEffect, useState } from "react";

export default function useQuery<T, R = unknown>({
  requestFn,
  params,
  autoFetch = true,
}: {
  requestFn: (data: T) => Promise<R>;
  params: T;
  autoFetch: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<R | null>(null);

  const execute = useCallback(
    async (requestData: T) => {
      setIsLoading(false);
      setData(null);

      const response = await requestFn(requestData);
      setData(response);
      setIsLoading(false);
    },
    [requestFn],
  );

  useEffect(() => {
    if (autoFetch) execute(params);
  }, [params, execute, autoFetch]);

  return { isLoading, data, execute };
}
