"use strict";

module.exports = {
    config: require("./node_modules/markdownlint-config-fluid/.markdownlintrc.json"),
    ignores: ["node_modules", "netlify", "src/collections/**/*.md", "CHANGELOG.md"]
};
