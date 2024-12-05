import babelParser from "@babel/eslint-parser";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["frontend/build/**", "node_modules/**"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false, // No .babelrc required
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // For React 17+ JSX transforms
      "react/prop-types": "off", // Optional: Disable if not using PropTypes
      "no-unused-vars": ["warn", { vars: "all", args: "none" }],
    },
  },
];
