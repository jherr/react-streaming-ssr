import * as React from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";

import Html from "../src/html";
import App from "../src/App";

export function streamingRender(res) {
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, streamed"), 2000)
  );

  const stream = renderToPipeableStream(
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
  // Simulate waiting around for some content that we want to stream instead
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
