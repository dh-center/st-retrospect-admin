export enum DataLanguages {
  RU = 'RU',
  EN = 'EN'
}

/**
 *
 */
class LanguageController {

  public dataLanguage = DataLanguages.RU;

  private static LS_DATA_LANGUAGE_KEY = 'data-language';

  /**
   *
   */
  constructor() {
    const lsDataLanguage = window.localStorage.getItem(LanguageController.LS_DATA_LANGUAGE_KEY);

    if (lsDataLanguage) {
      this.dataLanguage = lsDataLanguage.toUpperCase() as DataLanguages;
    }
  }

  /**
   *
   * @param newDataLanguage
   */
  public changeDataLanguage(newDataLanguage: DataLanguages): void {
    this.dataLanguage = newDataLanguage;
    window.localStorage.setItem(LanguageController.LS_DATA_LANGUAGE_KEY, newDataLanguage);
  }
}

export default new LanguageController();
