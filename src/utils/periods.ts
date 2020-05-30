/**
 * Helper class for manipulation with year periods
 */
export default class YearPeriods {
  /**
   * How many years in one period
   */
  private readonly yearsInPeriod: number = 20;

  /**
   * Minimum year value
   */
  private readonly minYear: number;

  /**
   * Max year value
   */
  private readonly maxYear: number;

  /**
   * Creates class instance
   *
   * @param minYear - minimum year value
   * @param maxYear - max year value
   * @param yearsInPeriod - how many years in one period
   */
  constructor(minYear: number, maxYear: number, yearsInPeriod: number) {
    this.maxYear = maxYear;
    this.minYear = minYear;
    this.yearsInPeriod = yearsInPeriod;
  }

  /**
   * Returns rounded
   */
  public get minYearRounded(): number {
    return Math.floor(this.minYear / 10) * 10;
  }

  /**
   * Returns an object where the keys are all periods and values are 0
   */
  public fillPeriods(): Record<string, number> {
    const data: Record<string, number> = {};
    const periodsCount = this.periodsCount;

    for (let i = 0; i < periodsCount; i++) {
      data[this.getPeriodFromNumber(i)] = 0;
    }

    return data;
  }

  /**
   * Returns total count of periods
   */
  public get periodsCount(): number {
    return Math.ceil((this.maxYear - this.minYear) / this.yearsInPeriod);
  }

  /**
   * Returns period from its number
   *
   * @param periodNumber - period number to calculate it
   */
  public getPeriodFromNumber(periodNumber: number): string {
    return `${this.getPeriodStartDate(periodNumber)}—${this.getPeriodEndDate(periodNumber)}`;
  }

  /**
   * Returns start date for period with provided number
   *
   * @param periodNumber - number of period to calculate its start date
   */
  public getPeriodStartDate(periodNumber: number): number {
    return this.minYearRounded + this.yearsInPeriod * periodNumber;
  }

  /**
   * Returns period end date
   *
   * @param periodNumber - period number to calculate end date
   */
  public getPeriodEndDate(periodNumber: number): number {
    return this.getPeriodStartDate(periodNumber) + this.yearsInPeriod;
  }

  /**
   * Returns the number of the period provided year belongs to
   *
   * @param year - year to calculate its period
   */
  public getPeriodFromYear(year: number): string {
    const periodNumber = this.getPeriodNumberFromYear(year);

    return `${this.getPeriodStartDate(periodNumber)}—${this.getPeriodEndDate(periodNumber)}`;
  }

  /**
   * Returns period number for provided year
   *
   * @param year - year to calculate
   */
  public getPeriodNumberFromYear(year: number): number {
    return Math.floor((year - this.minYearRounded) / this.yearsInPeriod);
  }
}
