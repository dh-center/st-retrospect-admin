import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import languageController, { DataLanguages } from '../../controllers/languageController';

/**
 * Data language switcher component
 */
export default function DataLanguageSwitcher(): React.ReactElement {
  const history = useHistory();

  /**
   * Change data language in app and reload page
   *
   * @param e - change event in component
   */
  const onDataLanguageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newDataLanguage = e.target.value;

    languageController.changeDataLanguage(newDataLanguage as DataLanguages);
    history.go(0);
  };

  return (
    <div className={'text-center'}>
      Data language
      <Form inline>
        <Form.Group>
          <Form.Label
            className={'mr-2'}
            htmlFor={DataLanguages.EN}
          >EN</Form.Label>
          <Form.Check
            inline
            type="radio"
            name={'dataLanguage'}
            id={DataLanguages.EN}
            value={DataLanguages.EN}
            checked={languageController.dataLanguage === DataLanguages.EN}
            onChange={onDataLanguageChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label
            className={'mr-2'}
            htmlFor={DataLanguages.RU}
          >RU</Form.Label>
          <Form.Check
            className={'mr-0'}
            inline
            type="radio"
            name={'dataLanguage'}
            id={DataLanguages.RU}
            value={DataLanguages.RU}
            checked={languageController.dataLanguage === DataLanguages.RU}
            onChange={onDataLanguageChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
