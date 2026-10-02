import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Third-party components copied in by the shadcn CLI (animate-ui, Vengeance UI), kept
    // close to upstream so they're easy to update.
    "components/animate-ui/**",
    "components/ui/animated-button.tsx",
  ]),
]);

export default eslintConfig;
