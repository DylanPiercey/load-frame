import * as assert from "assert";
import * as install from "jsdom-global";
import inFrame from "../src/browser";
import { address } from "./server";

describe("Browser", () => {
  let document: Document;
  let window: Window;
  let uninstall;
  let close;

  before(() => (uninstall = install("", { resources: "usable" })));
  after(() => uninstall());

  beforeEach(async () => {
    const dom = await inFrame(address);
    document = dom.document;
    window = dom.window;
    close = dom.close;
  });

  afterEach(() => close());

  it("should work", async () => {
    assert.equal(document.title, "The Title");
    const h1 = document.createElement("h1");
    h1.innerHTML = "Hello World";
    document.body.appendChild(h1);
    assert.equal(
      document.querySelector("h1").outerHTML,
      "<h1>Hello World</h1>"
    );
  });
});
