"use client";
import { useEffect, useState } from "react";

const UnreadMessagesCount = () => {
  const [count, setCount] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("/api/messages/unread-count");

        if (res.status === 200) {
          const data = await res.json();
          setCount(data);
        } else {
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    })();
  }, [count]);
  return (
    count > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {count}
      </span>
    )
  );
};

export default UnreadMessagesCount;
