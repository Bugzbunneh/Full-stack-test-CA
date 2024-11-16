import { queryOptions } from "@tanstack/react-query";
import { getAuthToken } from "../utils/get-auth-token";
import { fetchWrapper } from "./fetch-wrapper";

interface IGetServerTimeResponse {
  properties: {
    epoch: {
      description: string;
      value: number;
      type: string;
    };
    required: string[];
    type: string;
  };
}

interface IGetServerTimeProps {
  signal?: AbortSignal;
}

const getServerTime = async ({ signal }: IGetServerTimeProps) => {
  const headers = new Headers();
  headers.set("Authorization", `Basic ${getAuthToken()}`);

  const response = await fetchWrapper<IGetServerTimeResponse>(
    "http://localhost:4000/time",
    {
      headers,
      method: "GET",
      signal,
    }
  );

  return response;
};

export const getServerTimeQueryOptions = () => {
  return queryOptions({
    queryFn: async ({ signal }) => {
      const response = await getServerTime({ signal });
      return response;
    },
    queryKey: ["getServerTime"],
    refetchInterval: 31000,
    refetchOnWindowFocus: false,
  });
};
