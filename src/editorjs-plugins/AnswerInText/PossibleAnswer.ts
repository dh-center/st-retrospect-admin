import { API, InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';

/**
 * Inline block for select possible answer in text
 */
export default class PossibleAnswer implements InlineTool {
  /**
   * Button in inline toolbox
   */
  private button: HTMLButtonElement | null;

  /**
   * Editor.js API
   */
  private api: API;

  /**
   * Wrapper tag
   */
  private tag = 'SPAN';

  /**
   * Wrapper tag class
   */
  private class = 'possible-answer';

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
    return 'Possible answer';
  }

  /**
   * Checks block state
   */
  public checkState(): boolean {
    const wrapper = this.api.selection.findParentTag(this.tag, this.class);

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
      <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM7.70711 15.7071L11 12.4142L14.2929 15.7071L15.7071 14.2929L12.4142 11L15.7071 7.70711L14.2929 6.29289L11 9.58579L7.70711 6.29289L6.29289 7.70711L9.58579 11L6.29289 14.2929L7.70711 15.7071Z"/>
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
    const termWrapper = this.api.selection.findParentTag(this.tag, this.class);

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
    const wrapper = document.createElement(this.tag);

    wrapper.classList.add(this.class);
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
