import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { parse } from "mini-url";

const JSDOM_OPTIONS = {
  pretendToBeVisual: true,
  resources: "usable",
  runScripts: "dangerously"
};

/**
 * Creates a new iframe at the provided url.
 *
 * @param url The url to load.
 */
export function fromURL(url: string): Promise<Frame> {
  const { protocol, pathname } = parse(url);
  const isFile = protocol === "file:";
  const method = isFile ? "fromFile" : "fromURL";
  const loadPath = isFile ? pathname : url;

  if (!/(https?|file):/.test(protocol)) {
    throw new Error("Protocol should be http(s) or file.");
  }

  return JSDOM[method](loadPath, JSDOM_OPTIONS).then(dom => new Frame(dom));
}

/**
 * Creates a new iframe and inlines some html content.
 *
 * @param html The html to load into the iframe.
 */
export function fromHTML(html: string): Promise<Frame> {
  return new Promise(resolve => {
    resolve(new Frame(new JSDOM(html, JSDOM_OPTIONS)));
  });
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
