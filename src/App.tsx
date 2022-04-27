import React from "react";
import s1 from "./aud/1.wav";
import s2 from "./aud/2.wav";
import s3 from "./aud/3.wav";
import s4 from "./aud/4.wav";
import s5 from "./aud/5.wav";
import s6 from "./aud/6.wav";
import s7 from "./aud/7.wav";
import s8 from "./aud/8.wav";
import s9 from "./aud/9.wav";
import { useKey } from "./useKey";

const sounds = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

function SoundButton({ index, src }: { src: string; index: number }) {
  const key = keys[index];
  const play = React.useCallback(() => {
    const audio = new Audio(src);
    audio.play();
  }, [src]);
  useKey(key, play);
  return (
    <button onClick={play} onTouchStart={play}>
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
