import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: js.configs.all, // optional unless you're using "eslint:all"
});

export default [
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:@next/next/recommended"
  ),

  ...compat.env({
    es2020: true,
    node: true,
  }),

  ...compat.plugins("jsx-a11y", "react"),

  // translate an entire config
  ...compat.config({
    plugins: ["jsx-a11y", "react"],
    extends: ["plugin:@next/next/recommended", "next"],
    env: {
      es2020: true,
      node: true,
    },
    rules: {
      semi: "error",
      "no-unused-vars": "error",
    },
  }),
];
