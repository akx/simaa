import React from "react";

export function useKey(key: string, handler: () => void) {
  React.useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === key && !(event.metaKey || event.ctrlKey)) {
        handler();
      }
    };
    globalThis.addEventListener("keydown", downHandler);
    return () => {
      globalThis.removeEventListener("keydown", downHandler);
    };
  }, [key, handler]);
}
