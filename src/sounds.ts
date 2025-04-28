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

export const keyToSound = {
  q: s1,
  w: s2,
  e: s3,
  a: s4,
  s: s5,
  d: s6,
  z: s7,
  x: s8,
  c: s9,
  r: s10,
  f: s11,
  v: s12,
  t: s13,
  g: s14,
  b: s15,
  y: s16,
  h: s17,
  n: s18,
  u: s19,
  j: s20,
  m: s21,
  i: s22,
  k: s23,
  o: s24,
  p: s25,
  l: s26,
  "1": s27,
  "2": s28,
  "3": s29,
  "4": s30,
  "5": s31,
  "6": s32,
} as const;
export type SoundKey = keyof typeof keyToSound;
export const soundKeys = Object.keys(keyToSound) as SoundKey[];
export const nSounds = Object.keys(keyToSound).length;
export function getRandomSoundKey(): SoundKey {
  return soundKeys[Math.floor(Math.random() * nSounds)]!;
}
