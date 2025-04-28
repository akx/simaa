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
import s13 from "./aud/2025_01.mp3";
import s14 from "./aud/2025_02.mp3";
import s15 from "./aud/2025_03.mp3";
import s16 from "./aud/2025_04.mp3";
import s17 from "./aud/2025_05.mp3";
import s18 from "./aud/2025_06.mp3";
import s19 from "./aud/2025_07.mp3";
import s20 from "./aud/2025_08.mp3";
import s21 from "./aud/2025_09.mp3";
import s22 from "./aud/2025_10.mp3";
import s23 from "./aud/2025_11.mp3";
import s24 from "./aud/2025_12.mp3";
import s25 from "./aud/2025_13.mp3";
import s26 from "./aud/2025_14.mp3";
import s27 from "./aud/2025_15.mp3";
import s28 from "./aud/2025_16.mp3";
import s29 from "./aud/2025_17.mp3";
import s30 from "./aud/2025_18.mp3";
import s31 from "./aud/2025_19.mp3";
import s32 from "./aud/2025_20.mp3";
import bubblePng from "./bubbles_1fae7.png";
import { useKey } from "./useKey";

const sounds = [
  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  s10,
  s11,
  s12,
  s13,
  s14,
  s15,
  s16,
  s17,
  s18,
  s19,
  s20,
  s21,
  s22,
  s23,
  s24,
  s25,
  s26,
  s27,
  s28,
  s29,
  s30,
  s31,
  s32,
];
const keys = [
  "q",
  "w",
  "e",
  "a",
  "s",
  "d",
  "z",
  "x",
  "c",
  "r",
  "f",
  "v",
  "t",
  "g",
  "b",
  "y",
  "h",
  "n",
  "u",
  "j",
  "m",
  "i",
  "k",
  "o",
  "p",
  "l",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
];

const animationConfig: KeyframeAnimationOptions = {
  duration: 300,
  iterations: 1,
  easing: "ease-out",
};

interface SoundButtonRef {
  play: () => void;
}

interface SoundButtonProps {
  src: string;
  index: number;
  ref: React.RefObject<SoundButtonRef>;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function spawnBubble(buttonRect: DOMRect) {
  const bubble = Object.assign(document.createElement("img"), {
    src: bubblePng,
    className: "bubble",
  });
  Object.assign(bubble.style, {
    position: "absolute",
    left: "-25px",
    top: "-25px",
    width: "50px",
    height: "50px",
    pointerEvents: "none",
  });
  const startX = rand(buttonRect.left, buttonRect.right);
  const startY = rand(buttonRect.top, buttonRect.bottom);
  const endX = startX + rand(-100, 100);
  const endY = startY - rand(100, 200);
  const startAngle = rand(-45, 45);
  const endAngle = startAngle + rand(-180, 180);
  const startScale = rand(0.9, 1.1);
  const endScale = startScale + rand(-0.5, 0.5);
  const anim = bubble.animate(
    [
      {
        transform: `translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
        opacity: rand(0.8, 1),
      },
      {
        transform: `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`,
        opacity: 0,
      },
    ],
    { duration: rand(1000, 3000) },
  );
  anim.onfinish = () => {
    bubble.remove();
  };
  document.body.append(bubble);
}

function SoundButton({ index, src, ref }: SoundButtonProps) {
  const key = keys[index]!;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const play = React.useCallback(() => {
    const audio = new Audio(src);
    audio.volume = rand(0.8, 1);
    audio.play();

    const button = buttonRef.current;
    if (button) {
      if (!button.animate) return;
      const angle = rand(-10, 20);
      const x = rand(-20, 20);
      const y = rand(-20, 20);
      button.animate?.(
        [
          {
            background: `hsl(${rand(0, 360)}, 80%, 40%)`,
            transform: `scale(0.7) translate(${x}px, ${y}px) rotate(${angle.toFixed(2)}deg)`,
          },
          { transform: `scale(1)` },
        ],
        animationConfig,
      );
      const span = button.querySelector("span");
      if (span) {
        span.style.color = "#000";
        audio.addEventListener("ended", () => {
          span.style.color = "";
        });
      }
      const buttonRect = button.getBoundingClientRect();
      spawnBubble(buttonRect);
    }
  }, [src]);
  useKey(key, play);
  React.useImperativeHandle(ref, () => ({ play }));
  return (
    <button
      onClick={play}
      onTouchStart={play}
      ref={buttonRef}
      type="button"
      style={{}}
    >
      <span>{key}</span>
    </button>
  );
}

function App() {
  const soundRefs = React.useRef<Record<string, SoundButtonRef | null>>({});
  const playRandom = React.useCallback(() => {
    const index = Math.floor(Math.random() * sounds.length);
    soundRefs.current[index]?.play();
  }, []);
  useKey(" ", playRandom);
  return (
    <>
      {sounds.map((s, i) => (
        <SoundButton
          key={i}
          index={i}
          src={s}
          // @ts-expect-error what is ref? baby dont hurt me
          ref={(sb: SoundButtonRef) => (soundRefs.current[i] = sb)}
        />
      ))}
      <button onClick={playRandom} onTouchStart={playRandom} type="button">
        ???
      </button>
    </>
  );
}

export default App;
