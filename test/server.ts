import { createServer } from "http";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>The Title</title>
      </head>
      <body>
      </body>
    </html>
  `);
})
  .listen()
  .unref();

export const address = `http://localhost:${server.address().port}`;
