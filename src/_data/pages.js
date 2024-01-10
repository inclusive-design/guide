"use strict";

const fetchPages = async function (language = "en") {
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
            query: "site.children",
            select: {
                title: true,
                subhead: true,
                blocks: "page.blocks.toBlocks",
                children: `page.children('${language}')`,
                uuid: true,
                slug: true,
                uid: true,
                order: "page.num"
            }
        })
    });

    return response.json();
};

module.exports = async function () {
    const responseEn = await fetchPages();
    const responseFr = await fetchPages("fr");

    responseEn.result.map((page) => {
        page.locale = "en-CA";
    });

    responseFr.result.map((page) => {
        page.locale = "fr-CA";
    });

    return responseEn.result.concat(responseFr.result);
};
