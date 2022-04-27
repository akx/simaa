import React from "react";

export function useKey(key: string, handler: () => void) {
  React.useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler();
      }
    };
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [key, handler]);
}
