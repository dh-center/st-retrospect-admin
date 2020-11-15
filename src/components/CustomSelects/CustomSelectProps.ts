/**
 * Interface of props for CustomSelect components
 */
export interface CustomSelectProps {
  /**
   * onChange event handler
   *
   * @param selected - selected value id
   */
  onChange: (selected: string) => void;

  /**
   * Default id for displaying
   */
  value?: string;

  /**
   * Is component disabled
   */
  disabled?: boolean;
}
