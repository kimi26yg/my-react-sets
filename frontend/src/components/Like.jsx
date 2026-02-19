import React from "react";
import { useState } from "react";

function Like() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsLiked(!isLiked);
        }}
      >
        {isLiked ? "♥️" : "💔"}
      </button>
    </div>
  );
}

export default Like;
