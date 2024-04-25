import React from "react";
import s1 from "./aud/01.mp3";
import s2 from "./aud/02.mp3";
import s3 from "./aud/03.mp3";
import s4 from "./aud/04.mp3";
import s5 from "./aud/05.mp3";
import s6 from "./aud/06.mp3";
import s7 from "./aud/07.mp3";
import s8 from "./aud/08.mp3";
import s9 from "./aud/09.mp3";
import s10 from "./aud/10.mp3";
import s11 from "./aud/11.mp3";
import s12 from "./aud/12.mp3";
import { useKey } from "./useKey";

const sounds = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];
const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c", "r", "f", "v"];

const animationConfig: KeyframeAnimationOptions = {
  duration: 100,
  iterations: 1,
  easing: "ease-out",
};

function SoundButton({ index, src }: { src: string; index: number }) {
  const key = keys[index];
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const play = React.useCallback(() => {
    const audio = new Audio(src);
    audio.play();

    const angle = -10 + Math.random() * 20;
    buttonRef.current?.animate?.(
      [
        { transform: `scale(0.7) rotate(${angle.toFixed(2)}deg)` },
        { transform: `scale(1)` },
      ],
      animationConfig,
    );
  }, [src]);
  useKey(key, play);
  return (
    <button onClick={play} onTouchStart={play} ref={buttonRef}>
      {key}
    </button>
  );
}

function App() {
  return (
    <main>
      {sounds.map((s, i) => (
        <SoundButton key={i} index={i} src={s} />
      ))}
    </main>
  );
}

export default App;
