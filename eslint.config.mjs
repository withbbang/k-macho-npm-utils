import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsdoc/recommended",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    settings: {
        jsdoc: {
            mode: "typescript",
        },
    },

    rules: {
        "jsdoc/require-jsdoc": ["warn", {
            publicOnly: true,

            require: {
                FunctionDeclaration: true,
                ClassDeclaration: true,
                MethodDefinition: true,
            },
        }],

        "jsdoc/require-param": "error",
        "jsdoc/require-returns": "error",
        "jsdoc/require-param-type": "error",
        "jsdoc/require-returns-type": "error",
        "jsdoc/require-description": "error",
    },
}]);