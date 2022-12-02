import * as React from "react";
import { Suspense, use } from "react";

const CommentsScript = ({ comments }) => {
  const data = Array.isArray(comments) ? comments : use(comments);
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.setComments(${JSON.stringify(data)});`,
      }}
    ></script>
  );
};

export default ({ children, comments, description }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__description = ${JSON.stringify(description)};`,
        }}
      ></script>
      <script src="/main.js"></script>
      <Suspense>
        <CommentsScript comments={comments} />
      </Suspense>
    </html>
  );
};
