"use strict";

const { $fetch } = require("ofetch");

const fetchPages = async function (language = "en") {
    const baseURL = process.env.DEPLOY_PRIME_URL ? "https://cms.guide.inclusivedesign.ca" : "http://localhost";
    const username = process.env.CMS_USERNAME || "username";
    const password = process.env.CMS_PASSWORD || "password";

    const apiFetch = $fetch.create({
        baseURL
    });

    const response = await apiFetch("/api/query", {
        headers: {
            "Authorization": `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
            "X-Language": language
        },
        method: "post",
        body: {
            query: "site.children",
            select: {
                title: true,
                subhead: "page.subhead",
                blocks: "page.blocks.toBlocks",
                uuid: "page.uuid",
                slug: true,
                order: "page.num"
            }
        }
    });

    return response;
};

module.exports = async function () {
    const responseEn = await fetchPages();
    const responseFr = await fetchPages("fr");

    responseEn.result.map(page => {
        page.locale = "en-CA";
    });

    responseFr.result.map(page => {
        page.locale = "fr-CA";
    });

    return responseEn.result.concat(responseFr.result);
};
