import { FireFeature } from "@/lib/types";
import { type } from "os";

type Props = {
    wildfireData: FireFeature["properties"];
}

/**
 * Displays details about a wildfire.
 * @param props.wildfireData - The wildfire data to display
 */
export const WildfireDetail = ({ wildfireData }: Props) => {
  const {
    FIRE_NUMBER,
    FIRE_YEAR,
    RESPONSE_TYPE_DESC,
    IGNITION_DATE,
    FIRE_OUT_DATE,
    FIRE_STATUS,
    FIRE_CAUSE,
    FIRE_CENTRE,
    ZONE,
    FIRE_ID,
    FIRE_TYPE,
    INCIDENT_NAME,
    GEOGRAPHIC_DESCRIPTION,
    LATITUDE,
    LONGITUDE,
    CURRENT_SIZE,
    FIRE_URL,
    FEATURE_CODE,
    OBJECTID,
  } = wildfireData;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-1">
      <h2 className="text-xl font-semibold mb-2">{INCIDENT_NAME}</h2>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-gray-500">Fire Number: {FIRE_NUMBER}</p>
          <p className="text-gray-500">Fire Year: {FIRE_YEAR}</p>
          <p className="text-gray-500">Fire Status: {FIRE_STATUS}</p>
          {/* Add more properties as needed */}
        </div>
        <div>
          <p className="text-gray-500">Ignition Date: {IGNITION_DATE}</p>
          <p className="text-gray-500">Fire Out Date: {FIRE_OUT_DATE}</p>
          <p className="text-gray-500">Fire Type: {FIRE_TYPE}</p>
          <p className="text-gray-500">Current Size: {CURRENT_SIZE} acres</p>
          {/* Add more properties as needed */}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-500">{GEOGRAPHIC_DESCRIPTION}</p>
        <p className="text-gray-500">
          Location: {LATITUDE}, {LONGITUDE}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-500">
          Fire Details:{' '}
          <a href={FIRE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {FIRE_URL}
          </a>
        </p>
      </div>
      <div>
        <p className="text-gray-500">Fire Cause: {FIRE_CAUSE}</p>
        <p className="text-gray-500">Response Type: {RESPONSE_TYPE_DESC}</p>
        <p className="text-gray-500">Fire Centre: {FIRE_CENTRE}</p>
        {/* Add more properties as needed */}
      </div>
    </div>
  );
};

export default WildfireDetail;