'use client';

import { useGetWildFireData } from "../hooks/useGetWildFireData";
/**
 * Renders the WildFire data.
 */
export const WildFireData = () => {
  const {
    data,
  } = useGetWildFireData(100);
  return (
    <div>
      <h1>WildFire Data</h1>
      {data.map((wildFire) => (<p>{wildFire.properties.GEOGRAPHIC_DESCRIPTION}</p>))}
    </div>
  );
};