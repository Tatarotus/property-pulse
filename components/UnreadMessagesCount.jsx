"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/globalContex";

const UnreadMessagesCount = () => {
  const { count, setCount } = useGlobalContext();
  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("/api/messages/unread-count");
        console.log(res);

        if (res.status === 200) {
          const data = await res.json();
          setCount(data);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    count > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {count}
      </span>
    )
  );
};

export default UnreadMessagesCount;
