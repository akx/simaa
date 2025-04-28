import cx from "clsx";
import React from "react";

import {
  getRandomSoundKey,
  keyToSound,
  SoundKey,
  soundKeys,
} from "./sounds.ts";
import useInterval from "./useInterval.ts";

function toSeqKey(step: number, lane: number) {
  return `${step}-${lane}`;
}

let lastSequenceState: Record<string, boolean> = {};

export default function SequencerApp() {
  const [bpm, setBpm] = React.useState(170);
  const [nSteps] = React.useState(
    window.innerWidth > window.innerHeight ? 16 : 8,
  );
  const [nLanes] = React.useState(5);
  const [sequence, setSequence] = React.useState<Record<string, boolean>>(
    () => Object.assign({}, lastSequenceState), // keep some state between mounts
  );
  const [laneSounds, setLaneSounds] = React.useState<Record<number, SoundKey>>(
    () =>
      Object.fromEntries(
        Array.from({ length: nLanes }, (_, i) => [i, getRandomSoundKey()]),
      ),
  );
  const [laneMutes, setLaneMutes] = React.useState<Record<number, boolean>>({});
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  useInterval(() => {
    if (!isPlaying) return;
    for (let lane = 0; lane < nLanes; lane++) {
      if (laneMutes[lane]) continue;
      const key = toSeqKey(currentStep, lane);
      if (sequence[key]) {
        const soundKey = laneSounds[lane];
        if (soundKey) {
          const audio = new Audio(keyToSound[soundKey]!);
          audio.volume = Math.random() * 0.2 + 0.6;
          audio.play();
        }
      }
    }
    setCurrentStep((step) => (step + 1) % nSteps);
    lastSequenceState = sequence;
  }, 60_000 / bpm);

  const items = [];
  for (let lane = 0; lane < nLanes; lane++) {
    items.push(
      <div key={lane} className="flex gap-2">
        <div className="flex">
          <select
            value={laneSounds[lane]}
            onChange={(event) =>
              setLaneSounds((sounds) => ({
                ...sounds,
                [lane]: event.target.value as never as SoundKey,
              }))
            }
          >
            {soundKeys.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="boob"
            onClick={() => {
              setLaneSounds((sounds) => ({
                ...sounds,
                [lane]: getRandomSoundKey(),
              }));
            }}
          >
            RND
          </button>
        </div>
        <div className="flex gap-1 p-1 bg-white/30 rounded-lg">
          {Array.from({ length: nSteps }, (_, step) => {
            const key = toSeqKey(step, lane);
            return (
              <button
                key={key}
                className={cx(
                  "bg-white/30 w-8 h-8 rounded-lg cursor-pointer",
                  step % 4 == 0 ? "border border-white/50" : null,
                  sequence[key] ? "text-white" : null,
                  currentStep === step && isPlaying ? "text-red-500" : null,
                )}
                type="button"
                onClick={() =>
                  setSequence((seq) => ({ ...seq, [key]: !seq[key] }))
                }
              >
                {step + 1}
              </button>
            );
          })}
        </div>
        <div className="flex">
          <button
            type="button"
            className="boob"
            onClick={() => {
              const newKeys: Record<string, boolean> = {};
              for (let i = 0; i < nSteps; i++) {
                newKeys[toSeqKey(i, lane)] = Math.random() < 0.2;
              }
              setSequence((seq) => ({ ...seq, ...newKeys }));
            }}
          >
            RND
          </button>
          <button
            type="button"
            className="boob"
            onClick={() => {
              const newKeys: Record<string, boolean> = {};
              for (let i = 0; i < nSteps; i++) {
                newKeys[toSeqKey(i, lane)] = false;
              }
              setSequence((seq) => ({ ...seq, ...newKeys }));
            }}
          >
            CLR
          </button>
          <button
            type="button"
            className={cx("boob", laneMutes[lane] ? "!border-white " : "")}
            onClick={() => {
              setLaneMutes((m) => ({
                ...m,
                [lane]: !m[lane],
              }));
            }}
          >
            MUT
          </button>
        </div>
      </div>,
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="boob" onClick={() => setIsPlaying((p) => !p)}>
          {isPlaying ? "stop" : "play"}
        </button>
        <div className="flex">
          <input
            className="grow"
            type="range"
            value={bpm}
            min={60}
            max={250}
            step={5}
            onChange={(e) => setBpm(e.target.valueAsNumber)}
          />
          <span>{bpm}bpm</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">{items}</div>
    </div>
  );
}
