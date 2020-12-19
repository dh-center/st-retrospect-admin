/**
 * Function checks coordinate
 *
 * @param coordinate - latitude or longitude
 */
export default function checkCoordinate(coordinate: number): boolean {
  return coordinate >= -90 && coordinate <= 90;
}
