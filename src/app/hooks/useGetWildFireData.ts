'use client';

import {FireFeature,FireFeatureResponse,requestErrorState,requestPendingState,requestSuccessState,} from "../../types/types";
import { useState, useEffect, useMemo } from "react";
import { useGetApiRequestState } from "./useApiRequestState";
import axios from "axios";
import { generateFilterOptions } from "@/types/util";
  
  /**
   * Hook for getting fire data from the api.
   * @param count amount of results to return
   */
  export function useGetWildFireData(count?: number) {
    const [data, setData] = useState<FireFeature[]>([]);
    const [optionsData, setOptionsData] = useState<FireFeature[]>([]);
    const [fireStatus, setFireStatus] = useState<string>("");
    const [fireCause, setFireCause] = useState<string>("");
    const [geographicDescription, setGeographicDescription] =
      useState<string>("");
    const [csvData, setCsvData] = useState<string>("");
    const { requestState, setRequestState } = useGetApiRequestState();
  
    const getData = async (
      setOptions: boolean,
      filter?: {
        fireCause: string;
        fireStatus: string;
        geographicDescription: string;
      }
    ) => {
      setRequestState(requestPendingState);
  
      try {
        const response = await axios.get<FireFeatureResponse>("/api/fires", {
          params: {
            count,
            fireStatus: filter?.fireStatus,
            fireCause: filter?.fireCause,
            geographicDescription: filter?.geographicDescription,
          },
        });
        setData(response.data.features);
        setOptions && setOptionsData(response.data.features);
        setRequestState(requestSuccessState);
      } catch (error) {
        setRequestState(requestErrorState);
      }
    };
  
    const fireStatusOptions = useMemo(() => {
      const uniqueFireStatuses = generateFilterOptions(optionsData, "FIRE_STATUS");
      return uniqueFireStatuses;
    }, [optionsData]);
  
    const fireCauseOptions = useMemo(() => {
      const uniqueFireCauses = generateFilterOptions(optionsData, "FIRE_CAUSE");
      return uniqueFireCauses;
    }, [optionsData]);
  
    const geographicDescriptionOptions = useMemo(() => {
      const uniqueGeographicDescriptions = generateFilterOptions(optionsData, "GEOGRAPHIC_DESCRIPTION");
      return uniqueGeographicDescriptions;
    }, [optionsData]);
  
    const filterByFireStatus = (fireStatus: string) => {
      setFireStatus(fireStatus);
      getData(false, { fireCause, fireStatus, geographicDescription });
    };
  
    const filterByFireCause = (fireCause: string) => {
      setFireCause(fireCause);
      getData(false, { fireCause, fireStatus, geographicDescription });
    };
  
    const filterByGeographicDescription = (geographicDescription: string) => {
      setGeographicDescription(geographicDescription);
      getData(false, { geographicDescription, fireStatus, fireCause });
    };

    const handleDownload = async (data: FireFeature[]) => {
      await axios
         .post<{document: string}>("/api/fires", {
           data,
         })
         .then((response) => {
           setCsvData(response.data.document);
         })
         .catch((error) => {
           console.log(error);
         });
     };
  
    useEffect(() => {
      getData(true);
    }, []);
  
    return {
      data,
      csvData,
      requestState,
      fireStatusOptions,
      fireCauseOptions,
      fireStatus,
      fireCause,
      geographicDescriptionOptions,
      geographicDescription,
      filterByFireStatus,
      filterByFireCause,
      filterByGeographicDescription,
      onDownload: handleDownload,
    };
  };