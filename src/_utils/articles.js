"use strict";

const categories = require("../_data/categories.json");

async function apiQuery(category, language = "en") {
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
            query: `page('${category}').children`,
            select: {
                title: true,
                subhead: true,
                content: "page.content.content",
                parent: true,
                uuid: true,
                uid: true,
                slug: true,
                order: "page.num",
                related: true
            }
        })
    });

    return response.json();
}

function prepareRelated(input) {
    const related = input.replace(/- page:\/\//g, "");
    return related.split("\n");
}

module.exports = async function (category) {
    const responseEn = await apiQuery(category);
    const responseFr = await apiQuery(category, "fr");

    responseEn.result.map((article) => {
        article.locale = "en-CA";
        article.related = prepareRelated(article.related);
        article.category = categories[article.parent.uid]["en-CA"];
    });

    responseFr.result.map((article) => {
        article.locale = "fr-CA";
        article.related = prepareRelated(article.related);
        article.category = categories[article.parent.uid]["en-CA"];
    });

    return responseEn.result.concat(responseFr.result);
};
