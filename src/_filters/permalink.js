"use strict";

const slugify = require("@sindresorhus/slugify");

module.exports = function (data) {
    return `/${
        data.locale !== "en-CA" ? `${data.locale.substring(0, 2)}/` : ""
    }${data.parent ? `${data.parent.slug}/` : ""}${
        data.slug !== "home" ? `${slugify(data.title)}/` : ""
    }`;
};
