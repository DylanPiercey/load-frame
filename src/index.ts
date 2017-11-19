module.exports = exports = loadFrame;
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
export default loadFrame;

const JSDOM_VERSION = JSON.parse(
  readFileSync(require.resolve("jsdom/package"), "utf-8")
).version;

/**
 * Creates a new iframe at the provided url.
 *
 * @param url The url to load.
 */
function loadFrame(url: string): Promise<Frame> {
  return JSDOM.fromURL(url, {
    resources: "usable",
    runScripts: "dangerously"
  }).then(dom => new Frame(dom));
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
   * Creates a new iframe from a JSDOM.
   *
   * @param _dom The jsdom to use.
   */
  constructor(private _dom) {
    this.window = _dom.window;
    this.document = this.window.document;
    this.close = this.window.close.bind(this.window);
    delete this.window.close;
  }
}
