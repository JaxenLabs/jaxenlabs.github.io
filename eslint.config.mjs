/**
 * ESLint checks the code for mistakes and risky patterns (run: `npm run lint`).
 * It uses the official Next.js rules (React, React Hooks, Next.js and Core Web
 * Vitals) plus the TypeScript rules.
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Folders that are generated or downloaded, never written by hand.
  globalIgnores([".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"]),
]);
