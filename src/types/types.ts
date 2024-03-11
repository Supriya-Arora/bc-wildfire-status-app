export type RequestState = {
    pending: boolean;
    success: boolean;
    error: boolean;
};

export const requestInitialState: RequestState = {
    pending: false,
    success: false,
    error: false,
};

export const requestPendingState: RequestState = {
    pending: true,
    success: false,
    error: false,
};

export const requestSuccessState: RequestState = {
    pending: false,
    success: true,
    error: false,
};

export const requestErrorState: RequestState = {
    pending: false,
    success: false,
    error: true,
};

export type FireFeatureResponse = {
  type: "FeatureCollection";
  features: FireFeature[];
};

export type FireFeature = {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  geometry_name: string;
  properties: {
    FIRE_NUMBER: string;
    FIRE_YEAR: number;
    RESPONSE_TYPE_DESC: string;
    IGNITION_DATE: string;
    FIRE_OUT_DATE: string;
    FIRE_STATUS: string;
    FIRE_CAUSE: string;
    FIRE_CENTRE: number;
    ZONE: number;
    FIRE_ID: number;
    FIRE_TYPE: string;
    INCIDENT_NAME: string;
    GEOGRAPHIC_DESCRIPTION: string;
    LATITUDE: number;
    LONGITUDE: number;
    CURRENT_SIZE: number;
    FIRE_URL: string;
    FEATURE_CODE: string;
    OBJECTID: number;
    SE_ANNO_CAD_DATA: null;
  };
};

export type FireDataFilter = {
    FIRE_CAUSE: string;
    FIRE_STATUS: string;
    GEOGRAPHIC_DESCRIPTION: string;
}