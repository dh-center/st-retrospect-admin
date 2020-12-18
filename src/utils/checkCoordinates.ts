/**
 * Function checks coordinates
 *
 * @param latitude - latitude
 * @param longitude - longitude
 */
export default function checkCoordinates(latitude: number, longitude: number): boolean {
  return latitude >= -90 && latitude <= 90 &&
    longitude >= -90 && longitude <= 90;
}
