import React from "react";

import SequencerApp from "./SequencerApp.tsx";
import SoundBoardApp from "./SoundBoardApp.tsx";

function App() {
  const [mode, setMode] = React.useState<"sequencer" | "soundboard">(
    "soundboard",
  );
  return (
    <>
      {mode === "soundboard" ? <SoundBoardApp /> : <SequencerApp />}
      <div
        style={{
          position: "fixed",
          bottom: "5px",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
        onClick={() =>
          setMode((mode) =>
            mode === "soundboard" ? "sequencer" : "soundboard",
          )
        }
      >
        <button className="z">?!?!</button>
      </div>
    </>
  );
}

export default App;
