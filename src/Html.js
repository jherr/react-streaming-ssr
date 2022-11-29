import * as React from "react";
import { Suspense, use } from "react";

const DataScript = ({ dataPromise }) => {
  const data = use(dataPromise);
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.setData(${JSON.stringify(data)});`,
      }}
    ></script>
  );
};

export default ({ children, dataPromise }) => {
  return (
    <html>
      <head>
        <style>{`body { font-family: sans-serif; }`}</style>
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
      <script src="/main.js"></script>
      <Suspense>
        <DataScript dataPromise={dataPromise} />
      </Suspense>
    </html>
  );
};
