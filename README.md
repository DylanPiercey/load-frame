<h1 align="center">
  <!-- Logo -->
  <br/>
  Load-Frame
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Prettier -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- Travis build -->
  <a href="https://travis-ci.org/DylanPiercey/load-frame">
  <img src="https://img.shields.io/travis/DylanPiercey/load-frame.svg" alt="Build status"/>
  </a>
  <!-- Coveralls coverage -->
  <a href="https://coveralls.io/github/DylanPiercey/load-frame">
    <img src="https://img.shields.io/coveralls/DylanPiercey/load-frame.svg" alt="Test Coverage"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/load-frame">
    <img src="https://img.shields.io/npm/v/load-frame.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/load-frame">
    <img src="https://img.shields.io/npm/dm/load-frame.svg" alt="Downloads"/>
  </a>
</h1>

Utility for isomorphically loading an iframe with a URL. Makes it easy to bundle your tests in the browser while having a fast running CLI test with JSDOM.

It works by creating a regular iframe in the browser and using jsdom to create a fake iframe when running in node.
This is transparent and uses the `package.json`'s `browser` field to provide the correct api. Simply build your tests with webpack, rollup or browserify and it should run in the browser.

# Installation

```console
npm install load-frame
```

# Example (Using Mocha)

```javascript
const assert = require("assert");
const load = require("load-frame");

describe("My-Page", () => {
  // Make sure your server is started already.
  let frame;
  beforeEach(async () => frame = await load("http://localhost:8080"));
  afterEach(() => frame.close());

  it("should load", () => {
    const { window, document } = frame;
    assert.equal(document.title, "My Page");
    assert.ok(typeof window.addEventListener === "function");
  })
})
```

# API

### load(url: string) => Promise<Frame>

  Loads up an iframe like object.

```js
load("http://google.com").then(({ window, document, agent }) => {
  window; // The global window for the iframe
  document; // The document object for the iframe
  agent; // A parsed useragent object using http://faisalman.github.io/ua-parser-js/
})
```

### Contributions

* Use `npm test` to build and run tests.

Please feel free to create a PR!