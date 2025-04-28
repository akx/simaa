import React from "react";

export default function useInterval(fn: () => void, interval: number) {
  const savedCallback = React.useRef<() => void>(fn);

  React.useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
}
