"use client";

import { RefObject, useEffect, useRef } from "react";

interface useClickOutsideReturn<T> {
  ref: RefObject<T>;
}

export default function useClickOutside<T extends HTMLElement>(
  callback: () => void
): useClickOutsideReturn<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);

  return {
    ref,
  };
}
