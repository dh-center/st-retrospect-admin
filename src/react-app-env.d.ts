/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MAPBOX_ACCESS_TOKEN: string;
    REACT_APP_API_ENDPOINT: string;
  }
}
