"use strict";

const slugify = require("@sindresorhus/slugify");

module.exports = function (data) {
    return `/${ data.locale !== "en-CA" ? `${data.locale.substring(0, 2)}/` : "" }${ data.slug !== "home" ? `${slugify(data.title)}/` : ""}`;
};
