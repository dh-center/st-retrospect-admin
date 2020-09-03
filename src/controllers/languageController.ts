/**
 * ENUM for data languages
 */
export enum DataLanguages {
  RU = 'RU',
  EN = 'EN'
}

/**
 * Controller for languages in application
 *
 * @todo Implement language for application interface
 */
class LanguageController {
  /**
   * Data language field
   */
  public dataLanguage = DataLanguages.RU;

  /**
   * Key for data language in local storage
   */
  private static LS_DATA_LANGUAGE_KEY = 'data-language';

  /**
   * Create instance of language controller
   */
  constructor() {
    const lsDataLanguage = window.localStorage.getItem(LanguageController.LS_DATA_LANGUAGE_KEY);

    if (lsDataLanguage) {
      this.dataLanguage = lsDataLanguage.toUpperCase() as DataLanguages;
    }
  }

  /**
   * Change data language in local storage
   *
   * @param newDataLanguage - new data language
   */
  public changeDataLanguage(newDataLanguage: DataLanguages): void {
    this.dataLanguage = newDataLanguage;
    window.localStorage.setItem(LanguageController.LS_DATA_LANGUAGE_KEY, newDataLanguage);
  }
}

export default new LanguageController();
