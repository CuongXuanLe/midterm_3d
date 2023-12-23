import React, { useState, useEffect } from "react";
import "../App.css";

const ToggleSoundButton = ({ soundFile }) => {
  const [audio] = useState(new Audio(soundFile));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.loop = true;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return (
    <button className="button_sound" onClick={toggle}>
      {playing ? "Stop Sound" : "Play Sound"}
    </button>
  );
};

export default ToggleSoundButton;
