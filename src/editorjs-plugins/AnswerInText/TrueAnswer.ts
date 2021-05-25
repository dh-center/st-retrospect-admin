import { API, InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';
import PossibleAnswer from './PossibleAnswer';

/**
 * Inline block for select true answer in text
 */
export default class TrueAnswer implements InlineTool {
  /**
   * Wrapper tag class
   */
  public static class = 'true-answer';

  /**
   * Wrapper tag
   */
  private static tag = 'SPAN';

  /**
   * Button in inline toolbox
   */
  private button: HTMLButtonElement | null;

  /**
   * Editor.js API
   */
  private api: API;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.api - editor js api object
   */
  constructor({ api }: InlineToolConstructorOptions) {
    this.button = null;
    this.api = api;
  }

  /**
   * Getter says that this is an inline block
   */
  public static get isInline(): boolean {
    return true;
  }

  /**
   * Displaying title
   */
  public static get title(): string {
    return 'True answer';
  }

  /**
   * Getter with information for sanitizer
   */
  public static get sanitize(): unknown {
    return {
      [TrueAnswer.tag.toLowerCase()]: {
        class: [TrueAnswer.class, PossibleAnswer.class],
      },
    };
  }

  /**
   * Checks block state
   */
  public checkState(): boolean {
    const wrapper = this.api.selection.findParentTag(TrueAnswer.tag, TrueAnswer.class);

    if (this.button) {
      this.button.classList.toggle(this.api.styles.inlineToolButtonActive, !!wrapper);
    }

    return true;
  }

  /**
   * Renders button for displaying in toolbox
   */
  public render(): HTMLElement {
    this.button = document.createElement('button');

    this.button.type = 'button';
    this.button.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z" fill="black"/>
      </svg>
    `;
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  /**
   * Calls when user selects some text
   *
   * @param range - selected range
   */
  public surround(range: Range): void {
    const termWrapper = this.api.selection.findParentTag(TrueAnswer.tag, TrueAnswer.class);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wraps selected text in wrapper block
   *
   * @param range - selected range
   */
  private wrap(range: Range): void {
    const selectedText = range.extractContents();
    const wrapper = document.createElement(TrueAnswer.tag);

    wrapper.classList.add(TrueAnswer.class);
    wrapper.appendChild(selectedText);
    range.insertNode(wrapper);

    this.api.selection.expandToTag(wrapper);
  }

  /**
   * Unwrap term-tag
   *
   * @param termWrapper - term wrapper tag
   */
  private unwrap(termWrapper: HTMLElement): void {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();

    if (!sel) {
      return;
    }
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();


    if(!termWrapper.parentNode) {
      return;
    }
    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
