/**
 * Extract year from date string with regular expression
 *
 * @param dateString - date to parse
 */
export default function (dateString: string): number|null {
  const yearString = dateString.match(/\d{4}/)?.shift();

  return yearString ? +yearString : null;
}
