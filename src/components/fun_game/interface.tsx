/* eslint-disable @typescript-eslint/no-explicit-any */
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useGame from "src/stores/use_game";
// similar to requestAnimationFrame
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const phase = useGame((state) => state.phase);

  const restart = useGame((state) => state.restart);

  const time = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!time.current) return;
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime: number | string = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000; //  divide elapsedTime by 1000 because it currently contains milliseconds, whereas we want seconds:
      elapsedTime = elapsedTime.toFixed(2) as any; // keep two decimals
      if (time.current) time.current.textContent = String(elapsedTime);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);
  return (
    <div className="interface">
      {/* Time */}
      <div className="time" ref={time}>
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
