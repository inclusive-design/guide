"use strict";

module.exports = {
    extends: [
        "fluid",
        "plugin:yml/standard",
        "plugin:markdown/recommended-legacy"
    ],
    ignorePatterns: [
        "_site",
        "netlify",
        "src/_locales/messages.js",
        "!.*.cjs",
        "!.*.js"
    ],
    env: {
        amd: true,
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2020
    },
    overrides: [
        {
            files: ["**/*.md"],
            processor: "markdown/markdown"
        },
        {
            files: ["**/*.mjs"],
            parserOptions: {
                sourceType: "module"
            }
        }
    ]
};
