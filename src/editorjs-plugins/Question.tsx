import { ToolboxConfig } from '@editorjs/editorjs';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import styles from './Question.module.css';
import pluginBlockStyles from './PluginBlock.module.css';

/**
 * Question plugin data
 */
interface QuestionData {
  /**
   * Question to answer
   */
  question: string;

  /**
   * Right answer
   */
  answer: string;

  /**
   * Message for displaying on right answer
   */
  rightAnswerMessage: string;

  /**
   * Message for displaying on wrong answer
   */
  wrongAnswerMessage: string;
}

export default class Question implements BlockTool {
  /**
   * Previously saved data
   *
   * @private
   */
  private data: QuestionData;

  /**
   * Plugin constructor
   *
   * @param data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<QuestionData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C13.7246 22 15.387 21.562 16.8595 20.7418L21.0947 21.0947L20.7418 16.8595C21.562 15.387 22 13.7246 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.115 18.8621L16.3916 18.6958L18.9053 18.9053L18.6958 16.3916L18.8621 16.115C19.603 14.8824 20 13.4715 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.4715 20 14.8824 19.603 16.115 18.8621ZM12.0003 16.9983C12.5528 16.9983 13.0007 16.5506 13.0007 15.9983C13.0007 15.4461 12.5528 14.9983 12.0003 14.9983C11.4479 14.9983 11 15.4461 11 15.9983C11 16.5506 11.4479 16.9983 12.0003 16.9983ZM11 14H13V13C13 13.0024 13.0047 12.9972 13.0154 12.9854C13.0417 12.9565 13.1039 12.888 13.2205 12.7955C13.3207 12.716 13.3517 12.6954 13.6048 12.535C14.4661 11.989 15 11.0396 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10H11C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.3473 12.8225 10.6629 12.534 10.8458C12.2102 11.0511 12.1564 11.0867 11.9775 11.2286C11.3827 11.7005 11 12.2627 11 13V14Z"/>
             </svg>`,
      title: 'Question',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const wrapper = document.createElement('div');

    wrapper.className = pluginBlockStyles.wrapper;

    /**
     * Plugin label
     */
    const pluginLabel = document.createElement('label');

    pluginLabel.innerText = 'Пользователь должен ответить на вопрос:';
    pluginLabel.classList.add(styles.label, styles.labelStrong);

    /**
     * Question block
     */
    const questionLabel = document.createElement('label');
    const questionInput = document.createElement('input');

    questionInput.value = this.data.question || '';
    questionInput.className = 'form-control';
    questionLabel.innerText = 'Вопрос:';
    questionLabel.className = styles.label;

    const questionWrapper = document.createElement('div');

    questionWrapper.className = styles.container;
    questionWrapper.append(questionLabel, questionInput);

    /**
     * Answer block
     */
    const answerLabel = document.createElement('label');
    const answerInput = document.createElement('input');

    answerInput.value = this.data.answer || '';
    answerInput.className = 'form-control';
    answerLabel.innerText = 'Ответ:';
    answerLabel.className = styles.label;

    const answerWrapper = document.createElement('div');

    answerWrapper.className = styles.container;
    answerWrapper.append(answerLabel, answerInput);

    /**
     * Right answer message block
     */
    const rightAnswerMessageLabel = document.createElement('label');
    const rightAnswerMessageInput = document.createElement('input');

    rightAnswerMessageInput.value = this.data.rightAnswerMessage || '';
    rightAnswerMessageInput.className = 'form-control';
    rightAnswerMessageLabel.innerText = 'Сообщение для правильного ответа:';
    rightAnswerMessageLabel.className = styles.label;

    const rightAnswerMessageWrapper = document.createElement('div');

    rightAnswerMessageWrapper.className = styles.container;
    rightAnswerMessageWrapper.append(rightAnswerMessageLabel, rightAnswerMessageInput);

    /**
     * Wrong answer message block
     */
    const wrongAnswerMessageLabel = document.createElement('label');
    const wrongAnswerMessageInput = document.createElement('input');

    wrongAnswerMessageInput.value = this.data.wrongAnswerMessage || '';
    wrongAnswerMessageInput.className = 'form-control';
    wrongAnswerMessageLabel.innerText = 'Сообщение для неправильного ответа:';
    wrongAnswerMessageLabel.className = styles.label;

    const wrongAnswerMessageWrapper = document.createElement('div');

    wrongAnswerMessageWrapper.className = styles.container;
    wrongAnswerMessageWrapper.append(wrongAnswerMessageLabel, wrongAnswerMessageInput);

    wrapper.append(
      pluginLabel,
      questionWrapper,
      answerWrapper,
      rightAnswerMessageWrapper,
      wrongAnswerMessageWrapper);

    return wrapper;
  }

  /**
   * Return information structure after save
   *
   * @param blockContent - HTML content of plugin block
   */
  public save(blockContent: HTMLElement): QuestionData {
    const question = blockContent.querySelectorAll('input')[0].value;
    const answer = blockContent.querySelectorAll('input')[1].value;
    const rightAnswerMessage = blockContent.querySelectorAll('input')[2].value;
    const wrongAnswerMessage = blockContent.querySelectorAll('input')[3].value;

    return {
      question,
      answer,
      rightAnswerMessage,
      wrongAnswerMessage,
    };
  }
}
