import { queryOptions } from "@tanstack/react-query";
import { getAuthToken } from "../utils/get-auth-token";
import { fetchWrapper } from "./fetch-wrapper";

interface IGetServerMetricsProps {
  signal?: AbortSignal;
}

const getServerMetrics = async ({ signal }: IGetServerMetricsProps) => {
  const headers = new Headers();
  headers.set("Authorization", `Basic ${getAuthToken()}`);

  const response = await fetchWrapper<string>("http://localhost:4000/metrics", {
    headers,
    method: "GET",
    signal,
  });

  return response;
};

export const getServerMetricsQueryOptions = () => {
  return queryOptions({
    queryFn: async ({ signal }) => {
      const response = await getServerMetrics({ signal });
      return response;
    },
    queryKey: ["getServerMetrics"],
    refetchInterval: 31000,
    refetchOnWindowFocus: false,
  });
};
