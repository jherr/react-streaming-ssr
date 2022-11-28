import * as React from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";

import App from "../src/App";

export function streamingRender(res) {
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, streamed"), 2000)
  );

  const stream = renderToPipeableStream(<App dataAsPromise={dataPromise} />, {
    onShellReady() {
      stream.pipe(res);
    },
  });
}

export function simpleRender(res) {
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, blocked"), 2000)
  );

  dataPromise.then((dataString) => {
    res.send(renderToString(<App dataAsString={dataString} />));
  });
}
