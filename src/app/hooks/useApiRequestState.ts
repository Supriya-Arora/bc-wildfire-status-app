'use client';

import { requestInitialState } from "../../types/types";
import React from "react";

/**
 * Custom hook for setting the state of an api request.
 * 
 * @returns 
 */
export const useGetApiRequestState = () => {
  const [requestState, setRequestState] = React.useState(requestInitialState);

  return {
    requestState,
    setRequestState,
  };
};