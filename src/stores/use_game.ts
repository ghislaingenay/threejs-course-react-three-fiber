import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GameState = {
  blocksCount: number;
  phase: "ready" | "playing" | "ended";
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime: number;
  endTime: number;
  seed: number;
};

export default create<GameState>()(
  subscribeWithSelector((set) => ({
    blocksCount: 10,
    seed: 0, // Math.random() --- IGNORE ---

    /**
     * Time
     */
    startTime: 0,
    endTime: 0,

    /**
     * Phases
     */
    phase: "ready",
    start: () => {
      set((state) => {
        if (state.phase === "ready")
          return { phase: "playing", startTime: Date.now() };
        return {};
      });
    },
    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended")
          return { phase: "ready", endTime: Date.now() };

        return {};
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing") return { phase: "ended" };

        return {};
      });
    },
  }))
);
