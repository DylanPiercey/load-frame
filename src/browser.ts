module.exports = exports = loadFrame;
export default loadFrame;

/**
 * Creates a new iframe at the provided url.
 *
 * @param url The url to load.
 */
function loadFrame(url: string): Promise<Frame> {
  const frame = document.createElement("iframe");
  frame.style.display = "none";
  frame.src = url;

  return new Promise((resolve, reject) => {
    frame.addEventListener("load", resolve as any);
    frame.addEventListener("error", reject);
    document.body.appendChild(frame);
  }).then(() => new Frame(frame));
}

export class Frame {
  /**
   * The global window object for the iframe.
   */
  public window: Window;
  /**
   * The document object for the iframe.
   */
  public document: Document;
  /**
   * Closes the currently running iframe.
   */
  public close: () => void;

  /**
   * Creates a new iframe from in the browser.
   *
   * @param _frame The iframe to use.
   */
  constructor(private _frame) {
    this.window = _frame.contentWindow;
    /* istanbul ignore next */
    this.document = _frame.contentDocument || window.document;
    this.close = () => document.body.removeChild(_frame);
  }
}
