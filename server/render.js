import * as React from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";

import Html from "../src/html";
import App from "../src/App";

export function streamingRender(res) {
  let stream = null;

  const dataPromise = new Promise((resolve) =>
    setTimeout(() => {
      resolve("Something non-critical, streamed");
    }, 2000)
  );

  stream = renderToPipeableStream(
    <Html dataPromise={dataPromise}>
      <App dataAsPromise={dataPromise} />
    </Html>,
    {
      onShellReady() {
        stream.pipe(res);
      },
    }
  );
}

export function simpleRender(res) {
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, blocked"), 2000)
  );

  dataPromise.then((dataString) => {
    res.send(
      renderToString(
        <Html>
          <App dataAsString={dataString} />
        </Html>
      )
    );
  });
}
