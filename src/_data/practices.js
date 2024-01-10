"use strict";

const articles = require("../_utils/articles.js");

module.exports = async function () {
    return await articles("practices");
};
