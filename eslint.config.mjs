import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

export default [
  {
    ignores: ["build/", "dist/", "node_modules/", "*.log", ".tmp/"], // Consolidated ignore patterns
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest", // Use the latest ECMAScript syntax
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX for React
        },
      },
      globals: { ...globals.browser, ...globals.node }, // Use both browser and Node globals
    },
    plugins: {
      react: pluginReact,
      import: pluginImport, // Helps manage import/export consistency
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Recommended JavaScript rules
      ...pluginReact.configs.flat.recommended.rules, // Recommended React rules
      "react/react-in-jsx-scope": "off", // Not needed in modern React (v17+)
      "import/no-unresolved": "error", // Ensure imports are resolved correctly
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "always",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow specific console usage
    },
  },
];
