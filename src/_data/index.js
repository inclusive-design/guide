"use strict";

const categories = require("./categories.json");

const fetchIndex = async function (language = "en") {
    const baseURL = process.env.CMS_URL || "http://localhost";
    const apiToken = process.env.CMS_API_TOKEN || "test";

    const response = await fetch(`${baseURL}/api/kql`, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Language": language
        },
        method: "post",
        body: JSON.stringify({
            query: "site.index",
            select: {
                title: true,
                subhead: true,
                parent: true,
                uuid: true,
                uid: true,
                slug: true,
                order: "page.num"
            }
        })
    });

    return response.json();
};

module.exports = async function () {
    const responseEn = await fetchIndex();
    const responseFr = await fetchIndex("fr");

    responseEn.result.map((page) => {
        page.uuid = page.uuid.replace(/page:\/\//g, "");
        page.locale = "en-CA";
        page.category = page.parent
            ? categories[page.parent.uid]["en-CA"]
            : null;
    });

    responseFr.result.map((page) => {
        page.uuid = page.uuid.replace(/page:\/\//g, "");
        page.locale = "fr-CA";
        page.category = page.parent
            ? categories[page.parent.uid]["en-CA"]
            : null;
    });

    return responseEn.result.concat(responseFr.result);
};
