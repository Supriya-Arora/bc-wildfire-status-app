'use client';

import {FireFeature,FireFeatureResponse,requestErrorState,requestPendingState,requestSuccessState,} from "../../types/types";
  import { useState, useEffect, useMemo } from "react";
  import { useGetApiRequestState } from "./useApiRequestState";
  import axios from "axios";
  
  /**
   * Hook for getting fire data from the api.
   * @param count amount of results to return
   */
  export function useGetWildFireData(count: number) {
    const [data, setData] = useState<FireFeature[]>([]);
    const [optionsData, setOptionsData] = useState<FireFeature[]>([]);
    const [fireStatus, setFireStatus] = useState<string>("");
    const [fireCause, setFireCause] = useState<string>("");
    const [geographicDescription, setGeographicDescription] =
      useState<string>("");
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
      const fireStatuses = optionsData.map((fire) => fire.properties.FIRE_STATUS);
      const uniqueFireStatuses = new Set(fireStatuses);
      return Array.from(uniqueFireStatuses);
    }, [optionsData]);
  
    const fireCauseOptions = useMemo(() => {
      const fireCauses = optionsData.map((fire) => fire.properties.FIRE_CAUSE);
      const uniqueFireCauses = new Set(fireCauses);
      return Array.from(uniqueFireCauses);
    }, [optionsData]);
  
    const geographicDescriptionOptions = useMemo(() => {
      const geographicDescription = optionsData.map(
        (fire) => fire.properties.GEOGRAPHIC_DESCRIPTION
      );
      const uniqueFireCauses = new Set(geographicDescription);
      return Array.from(uniqueFireCauses);
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
  
    useEffect(() => {
      getData(true);
    }, []);
  
    return {
      data,
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
    };
  };