import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import topLevelAwait from "vite-plugin-top-level-await";
import glsl from "vite-plugin-glsl";
// https://vite.dev/config/
export default defineConfig({
  server: {},
  plugins: [react({}), tsconfigPaths(), topLevelAwait(), glsl()],
});
