'use client';

import { useGetWildFireData } from "@/app/hooks/useGetWildFireData";
import { Filter } from "@/app/components/Filter/Filter";
import WildfireDetails from "./WildFireDetail";
import { useEffect, useRef } from "react";
import { CsvDownload } from "../CsvDownload/CsvDownload";
/**
 * Renders the WildFire data.
 */
export const WildFireData = () => {
  const {
    data,
    csvData,
    requestState,
    fireStatus,
    fireStatusOptions,
    filterByFireStatus,
    fireCause,
    fireCauseOptions,
    filterByFireCause,
    geographicDescription,
    geographicDescriptionOptions,
    filterByGeographicDescription,
    onDownload,
  } = useGetWildFireData();

  const csvInstance = useRef<any>();
  useEffect(() => {
    if (
      csvData &&
      csvInstance &&
      csvInstance.current &&
      csvInstance.current.link
    ) {
      csvInstance.current.link.click();
    }
  }, [csvData]);

  return (
    <div className="flex min-h-screen flex-col p-10 max-w-full">
      <h1 className="text-4xl font-bold text-center my-5">British Columbia Wild Fire Data</h1>      
        <div className="flex flex-row w-full max-w-[780px]">
          <Filter
            label="Fire Status"
            selectedOption={fireStatus}
            options={fireStatusOptions}
            onChange={(selectedOption: string) =>
              filterByFireStatus(selectedOption)
            }
          />
          <Filter
            label="Fire Cause"
            selectedOption={fireCause}
            options={fireCauseOptions}
            onChange={(selectedOption: string) =>
              filterByFireCause(selectedOption)
            }
          />
          <Filter
            label="Geographic Description"
            selectedOption={geographicDescription}
            options={geographicDescriptionOptions}
            onChange={(selectedOption: string) =>
              filterByGeographicDescription(selectedOption)
            }
          />
          <CsvDownload
          csvData={csvData}
          csvInstance={csvInstance}
          onDownload={() => onDownload(data)}
        />        
      </div>
      {requestState.success && !!data.length && (
        <div className="flex flex-col items-center justify-center mt-[1rem]">
          {data.map((fire) => (
            <WildfireDetails wildfireData={fire.properties} />
          ))}
        </div>
      )}
      {requestState.pending && <p>Loading...</p>}
      {requestState.error && <p>Unable to get wildfire data</p>}
      {!data.length && <p>No wildfire data</p>}
    </div>
  );
};