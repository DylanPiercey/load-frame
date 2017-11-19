import * as assert from "assert";
import inFrame from "../src";
import { address } from "./server";

describe("JSDOM", () => {
  let document: Document;
  let window: Window;
  let close;

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
