/**
 * Function checks latitude
 *
 * @param latitude - latitude coordinate
 */
export function isLatitudeValid(latitude: number): boolean {
  return latitude >= -90 && latitude <= 90;
}

/**
 * Function checks longitude
 *
 * @param longitude - latitude coordinate
 */
export function isLongitudeValid(longitude: number): boolean {
  return longitude >= -180 && longitude <= 180;
}
