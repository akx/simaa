import React from "react";

import bubblePng from "./bubbles_1fae7.png";
import lemonPng from "./lemon.png";
import { keyToSound, nSounds, SoundKey, soundKeys } from "./sounds.ts";
import { useKey } from "./useKey";

const animationConfig: KeyframeAnimationOptions = {
  duration: 300,
  iterations: 1,
  easing: "ease-out",
};

interface SoundButtonRef {
  play: () => void;
}

interface SoundButtonProps {
  soundKey: SoundKey;
  ref: React.RefObject<SoundButtonRef>;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function spawnBubble(buttonRect: DOMRect) {
  const isLemon = rand(0, 1) < 0.15;
  const bubble = Object.assign(document.createElement("img"), {
    src: isLemon ? lemonPng : bubblePng,
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
  const endX = startX + rand(-100, 100) * (isLemon ? 5 : 1);
  const endY = startY + (isLemon ? 500 : -rand(100, 200));
  const startAngle = rand(-45, 45);
  const endAngle = startAngle + rand(-180, 180) * (isLemon ? 10 : 1);
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

function animateButton(button: HTMLButtonElement, audio: HTMLAudioElement) {
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

function SoundButton({ soundKey, ref }: SoundButtonProps) {
  const src = keyToSound[soundKey]!;
  const key = soundKey;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const play = React.useCallback(
    (event?: React.MouseEvent | React.TouchEvent) => {
      event?.preventDefault();
      event?.stopPropagation();
      const audio = new Audio(src);
      audio.volume = rand(0.8, 1);
      audio.play();

      const button = buttonRef.current;
      if (button) {
        animateButton(button, audio);
      }
    },
    [src],
  );
  useKey(key, play);
  React.useImperativeHandle(ref, () => ({ play }));
  return (
    <button
      onMouseDown={play}
      onTouchStart={play}
      onTouchEnd={(e) => e.preventDefault()}
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
  const playRandom = React.useCallback(
    (event?: React.MouseEvent | React.TouchEvent) => {
      event?.preventDefault();
      event?.stopPropagation();
      const index = Math.floor(Math.random() * nSounds);
      soundRefs.current[soundKeys[index]!]?.play();
    },
    [],
  );
  useKey(" ", playRandom);
  return (
    <>
      {Object.keys(keyToSound).map((s) => (
        <SoundButton
          key={s}
          soundKey={s as never as SoundKey}
          // @ts-expect-error what is ref? baby dont hurt me
          ref={(sb: SoundButtonRef) => (soundRefs.current[s] = sb)}
        />
      ))}
      <button
        onMouseDown={playRandom}
        onTouchStart={playRandom}
        onTouchEnd={(e) => e.preventDefault()}
        type="button"
      >
        ???
      </button>
    </>
  );
}

export default App;
