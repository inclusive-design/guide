/*
Copyright the Trivet copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/guide/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/guide/raw/main/LICENSE.md.
*/

"use strict";

const fluidPlugin = require("eleventy-plugin-fluid");
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const callToActionShortcode = require("./src/_shortcodes/call-to-action.js");
const permalinkFilter = require("./src/_filters/permalink.js");

// Import transforms
const parseTransform = require("./src/_transforms/parse-transform.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    // Transforms
    eleventyConfig.addTransform("parse", parseTransform);
    eleventyConfig.addFilter("permalink", permalinkFilter);
    eleventyConfig.addFilter("getVarFromString", function (varName) {
        return this.getVariables()[varName];
    });

    // Passthrough copy
    eleventyConfig.addPassthroughCopy({ "src/assets/icons": "/" });
    eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
    eleventyConfig.addPassthroughCopy({
        "node_modules/idg-design-system/dist/static/fonts": "assets/fonts"
    });
    eleventyConfig.addPassthroughCopy({
        "node_modules/idg-design-system/dist/static/svg": "assets/svg"
    });

    // Plugins
    eleventyConfig.addPlugin(fluidPlugin, {
        defaultLanguage: "en-CA",
        localesDirectory: "src/_locales",
        supportedLanguages: {
            "en-CA": {
                slug: "en",
                name: "English"
            },
            "fr-CA": {
                slug: "fr",
                name: "Français",
                dir: "ltr",
                uioSlug: "fr"
            }
        },
        css: {
            drafts: {
                customMedia: true
            }
        }
    });
    eleventyConfig.addPlugin(navigationPlugin);
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlightPlugin);

    // Shortcodes
    eleventyConfig.addPairedShortcode("callToAction", callToActionShortcode);

    return {
        dir: {
            input: "src"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
