import type { TPagination } from "./metadata";

/**
 * Magnitude types for earthquakes
 */
export enum EMagnitudeType {
  md = "md",
  ml = "ml",
  ms = "ms",
  mw = "mw",
  me = "me",
  mi = "mi",
  mb = "mb",
  mlg = "mlg",
}

/**
 * Earthquake data
 */
export type TFeature = {
  id: number;
  type: string;
  attributes: {
    external_id: string;
    magnitude: string;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: EMagnitudeType;
    title: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
  links: {
    external_url: string;
  };
};

/**
 * Earthquake data collection with pagination
 */
export type TFeatureCollection = {
  data: TFeature[];
  pagination: TPagination;
}
