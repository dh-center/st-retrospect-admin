// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import { ToolboxConfig } from '@editorjs/editorjs';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import styles from './Question.module.css';
import pluginBlockStyles from './PluginBlock.module.css';

/**
 * TestConstructor plugin data
 */
interface TestConstructorData {
  /**
   * Question to answer
   */
  question: string | undefined;

  /**
   * Array of answers to choose from
   */
  answers: string[] | undefined;

  /**
   * Index of right answer
   */
  correctAnswerIndex: number | undefined;

  /**
   * Message for displaying on right answer
   */
  rightAnswerMessage: string | undefined;

  /**
   * Message for displaying on wrong answer
   */
  wrongAnswerMessage: string | undefined;
}

/**
 * Test constructor plugin for EditorJS
 */
export default class TestConstructor implements BlockTool {
  /**
   * Previously saved data
   *
   * @private
   */
  private data: TestConstructorData;

  /**
   * Plugin constructor
   *
   * @param data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<TestConstructorData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3C7 1.89543 6.10457 1 5 1C3.89543 1 3 1.89543 3 3ZM6.11111 3C6.11111 3.61365 5.61365 4.11111 5 4.11111C4.38635 4.11111 3.88889 3.61365 3.88889 3C3.88889 2.38635 4.38635 1.88889 5 1.88889C5.61365 1.88889 6.11111 2.38635 6.11111 3Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 9C3 10.1046 3.89543 11 5 11C6.10457 11 7 10.1046 7 9C7 7.89543 6.10457 7 5 7C3.89543 7 3 7.89543 3 9ZM6.11111 9C6.11111 9.61365 5.61365 10.1111 5 10.1111C4.38635 10.1111 3.88889 9.61365 3.88889 9C3.88889 8.38635 4.38635 7.88889 5 7.88889C5.61365 7.88889 6.11111 8.38635 6.11111 9Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M5 17C3.89543 17 3 16.1046 3 15C3 13.8954 3.89543 13 5 13C6.10457 13 7 13.8954 7 15C7 16.1046 6.10457 17 5 17Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 21C3 22.1046 3.89543 23 5 23C6.10457 23 7 22.1046 7 21C7 19.8954 6.10457 19 5 19C3.89543 19 3 19.8954 3 21ZM6.11111 21C6.11111 21.6136 5.61365 22.1111 5 22.1111C4.38635 22.1111 3.88889 21.6136 3.88889 21C3.88889 20.3864 4.38635 19.8889 5 19.8889C5.61365 19.8889 6.11111 20.3864 6.11111 21Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 15.7512H15.5C15.5 13.1987 16.4369 12.1057 18.5792 11.0346C19.8119 10.4182 20 10.1987 20 9.00122C20 7.58583 18.9157 6.75122 17 6.75122C15.3431 6.75122 14 8.09437 14 9.75122H11C11 6.43751 13.6863 3.75122 17 3.75122C20.4265 3.75122 23 5.73216 23 9.00122C23 11.5537 22.0631 12.6467 19.9208 13.7179C18.6881 14.3342 18.5 14.5537 18.5 15.7512Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0005 20.2485C17.8292 20.2485 18.501 19.577 18.501 18.7485C18.501 17.9201 17.8292 17.2485 17.0005 17.2485C16.1718 17.2485 15.5 17.9201 15.5 18.7485C15.5 19.577 16.1718 20.2485 17.0005 20.2485Z"/>
             </svg>`,
      title: 'Test',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const wrapper = document.createElement('div');

    wrapper.className = pluginBlockStyles.wrapper;

    /**
     * Plugin's label
     */
    const strongWrapper = document.createElement('strong');
    const pluginLabel = document.createElement('label');

    pluginLabel.innerText = 'Пользователь должен ответить на вопрос, выбрав правильный вариант ответа:';
    pluginLabel.classList.add(styles.label, styles.labelStrong);

    /**
     * Question block
     */
    const questionWrapper = document.createElement('div');
    const questionLabel = document.createElement('label');
    const questionInput = document.createElement('input');

    questionWrapper.className = styles.container;

    questionLabel.innerText = 'Вопрос:';
    questionLabel.className = styles.label;

    questionInput.value = this.data.question || '';
    questionInput.className = 'form-control';

    questionWrapper.append(questionLabel, questionInput);

    /**
     * Answers block
     */
    const blockWrapper = document.createElement('div');
    const answersWrapper = document.createElement('div');
    const answerLabel = document.createElement('label');
    const addButton = document.createElement('button');
    const answers = this.data.answers || [];

    if (answers.length) {
      for (let i = 0; i < answers.length; i++) {
        const inputWrapper = document.createElement('div');
        const answerInput = document.createElement('input');
        const deleteButton = document.createElement('button');

        answerInput.value = answers[i];
        answerInput.className = 'form-control';

        deleteButton.type = 'button';
        deleteButton.className = 'ArrayOfInputs_removeButton__2xjOy btn btn-outline-danger';
        deleteButton.textContent = 'Удалить этот вариант';

        inputWrapper.append(answerInput, deleteButton);

        answersWrapper.appendChild(inputWrapper);

        deleteButton.addEventListener('click', () => {
          answersWrapper.removeChild(inputWrapper);
        });
      }
    }

    addButton.type = 'button';
    addButton.className = 'ArrayOfInputs_addButton__3WmO7 btn btn-success';
    addButton.textContent = 'Добавить вариант ответа';

    blockWrapper.className = styles.container;

    answerLabel.innerText = 'Варианты ответов:';
    answerLabel.className = styles.label;

    blockWrapper.append(answerLabel);

    addButton.addEventListener('click', () => {
      const inputWrapper = document.createElement('div');
      const answerInput = document.createElement('input');
      const deleteButton = document.createElement('button');

      answerInput.className = 'form-control';

      deleteButton.type = 'button';
      deleteButton.className = 'ArrayOfInputs_removeButton__2xjOy btn btn-outline-danger';
      deleteButton.textContent = 'Удалить этот вариант';

      inputWrapper.append(answerInput, deleteButton);

      answersWrapper.appendChild(inputWrapper);

      deleteButton.addEventListener('click', () => {
        answersWrapper.removeChild(inputWrapper);
      });
    });

    blockWrapper.append(answersWrapper, addButton);

    /**
     * Right answer number block
     */
    const rightAnswerNumberWrapper = document.createElement('div');
    const rightAnswerNumberLabel = document.createElement('label');
    const rightAnswerNumberInput = document.createElement('input');

    rightAnswerNumberWrapper.className = styles.container;

    rightAnswerNumberLabel.innerText = 'Номер правильного ответа:';
    rightAnswerNumberLabel.className = styles.label;

    rightAnswerNumberInput.type = 'number';
    rightAnswerNumberInput.value = this.data.correctAnswerIndex ? (this.data.correctAnswerIndex + 1).toString() : '';
    rightAnswerNumberInput.className = 'form-control';

    rightAnswerNumberWrapper.append(rightAnswerNumberLabel, rightAnswerNumberInput);

    /**
     * Right answer message block
     */
    const rightAnswerMessageWrapper = document.createElement('div');
    const rightAnswerMessageLabel = document.createElement('label');
    const rightAnswerMessageInput = document.createElement('input');

    rightAnswerMessageWrapper.className = styles.container;

    rightAnswerMessageLabel.innerText = 'Сообщение для правильного ответа:';
    rightAnswerMessageLabel.className = styles.label;

    rightAnswerMessageInput.value = this.data.rightAnswerMessage || '';
    rightAnswerMessageInput.className = 'form-control';

    rightAnswerMessageWrapper.append(rightAnswerMessageLabel, rightAnswerMessageInput);

    /**
     * Wrong answer message block
     */
    const wrongAnswerMessageWrapper = document.createElement('div');
    const wrongAnswerMessageLabel = document.createElement('label');
    const wrongAnswerMessageInput = document.createElement('input');

    wrongAnswerMessageWrapper.className = styles.container;

    wrongAnswerMessageLabel.innerText = 'Сообщение для неправильного ответа:';
    wrongAnswerMessageLabel.className = styles.label;

    wrongAnswerMessageInput.value = this.data.wrongAnswerMessage || '';
    wrongAnswerMessageInput.className = 'form-control';

    wrongAnswerMessageWrapper.append(wrongAnswerMessageLabel, wrongAnswerMessageInput);

    wrapper.append(
      strongWrapper,
      questionWrapper,
      blockWrapper,
      rightAnswerNumberWrapper,
      rightAnswerMessageWrapper,
      wrongAnswerMessageWrapper);

    return wrapper;
  }

  /**
   * Return information structure after save
   *
   * @param blockContent - HTML content of plugin block
   */
  public save(blockContent: HTMLElement): TestConstructorData {
    const n = blockContent.querySelectorAll('input').length;
    const question = blockContent.querySelectorAll('input')[0].value;
    const answers = [];
    const correctAnswerIndex = blockContent.querySelectorAll('input')[n - 3].value;
    const rightAnswerMessage = blockContent.querySelectorAll('input')[n - 2].value;
    const wrongAnswerMessage = blockContent.querySelectorAll('input')[n - 1].value;

    for (let i = 1; i < n - 3; i++) {
      answers.push(blockContent.querySelectorAll('input')[i].value);
    }

    return {
      question,
      answers,
      correctAnswerIndex: +correctAnswerIndex - 1 || undefined,
      rightAnswerMessage,
      wrongAnswerMessage,
    };
  }
}
