import * as React from "react";
import { Suspense, use, useState } from "react";

function Comments({ comments }) {
  const [comment, setComment] = useState("");
  const [currentComments, setCurrentComments] = useState(
    Array.isArray(comments) ? comments : use(comments)
  );

  return (
    <div>
      <ul>
        {currentComments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>

      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => {
          setCurrentComments([...currentComments, comment]);
          setComment("");
        }}
      >
        Add Comment
      </button>
    </div>
  );
}

export default function App(props) {
  return (
    <>
      <header>Header</header>

      <h2>Product Description</h2>
      <p>{props.description}</p>

      <h2>Comments</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Comments {...props} />
      </Suspense>

      <footer>Footer</footer>
    </>
  );
}
