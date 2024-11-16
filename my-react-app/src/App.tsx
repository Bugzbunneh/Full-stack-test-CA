import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getServerTimeQueryOptions } from "./api/get-server-time";
import { getServerMetricsQueryOptions } from "./api/get-server-metrics";
import { useEffect, useState } from "react";

export const App = () => {
  const [clientTime, setClientTime] = useState<string>("");

  const serverTimeResponse = useQuery(getServerTimeQueryOptions());
  const serverMetricsResponse = useQuery(getServerMetricsQueryOptions());

  const serverEpoch = serverTimeResponse.data?.properties.epoch.value;

  const currentEpochTime = Math.floor(new Date().getTime() / 1000);
  const newClientTime = serverEpoch
    ? currentEpochTime - serverEpoch
    : currentEpochTime;

  const clientDateObj = new Date(newClientTime * 1000);
  const hours = clientDateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = clientDateObj.getUTCMinutes().toString().padStart(2, "0");
  const seconds = clientDateObj.getUTCSeconds().toString().padStart(2, "0");

  const formattedClientTime = `${hours}:${minutes}:${seconds}`;

  useEffect(() => {
    if (!serverEpoch) {
      return;
    }

    const interval = setInterval(
      () => setClientTime(formattedClientTime),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [serverEpoch, clientTime]);

  if (serverTimeResponse.isLoading || serverMetricsResponse.isLoading) {
    return null;
  }

  return (
    <div className="bg-slate-700 w-screen h-screen flex">
      <div
        className={`w-6/12 border-r h-full flex items-center justify-center flex-col ${serverTimeResponse.isFetching ? "opacity-60" : ""}`}
      >
        {serverTimeResponse.isFetching ? <span>Loading...</span> : null}

        <span>
          Most recent server time:{" "}
          {serverTimeResponse.data?.properties.epoch.value}
        </span>
        <span>Client time: {clientTime}</span>
      </div>
      <div
        className={`w-6/12 h-full p-4 overflow-y-scroll ${serverTimeResponse.isFetching ? "opacity-60" : ""}`}
      >
        {serverMetricsResponse.isFetching ? <span>Loading...</span> : null}
        {serverMetricsResponse.data}
      </div>
    </div>
  );
};
