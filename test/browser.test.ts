import { equal, throws } from "assert";
import * as install from "jsdom-global";
import { join } from "path";
import { fromHTML, fromURL } from "../src/browser";
import { address } from "./server";

describe("Browser", () => {
  let uninstall;
  before(() => (uninstall = install("", { resources: "usable" })));
  after(() => uninstall());

  describe("#fromHTML", () => {
    it("should work", async () => {
      const { document } = await fromHTML(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>inline html</title>
          </head>
        </html>
      `);

      equal(document.title, "inline html");
    });
  });

  describe("#fromURL", () => {
    describe("invalid", () => {
      it("should fail", () => {
        throws(() => {
          fromURL("other://test");
        });
      });
    });

    describe("http", () => {
      let document: Document;
      let window: Window;
      let close;

      beforeEach(async () => {
        const dom = await fromURL(address);
        document = dom.document;
        window = dom.window;
        close = dom.close;
      });

      afterEach(() => close());

      it("should work", async () => {
        equal(document.title, "The Title");
        const h1 = document.createElement("h1");
        h1.innerHTML = "Hello World";
        document.body.appendChild(h1);
        equal(document.querySelector("h1").outerHTML, "<h1>Hello World</h1>");
      });
    });

    describe("file", () => {
      const filePath = join(__dirname, "fixtures/example.html");
      let document: Document;
      let window: Window;
      let close;

      beforeEach(async () => {
        const dom = await fromURL(`file://${filePath}`);
        document = dom.document;
        window = dom.window;
        close = dom.close;
      });

      afterEach(() => close());

      it("should work", async () => {
        equal(document.title, "Example Title");
        equal(document.body.innerHTML.trim(), "Example Content");
      });
    });
  });
});
