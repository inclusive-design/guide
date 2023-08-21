/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "block",
    label: "Block",
    fields: [
        {
            name: "background",
            label: "Background",
            widget: "select",
            options: [
                {label: "Green 100", value: "green-100"},
                {label: "Green 800", value: "green-800"}
            ]
        },
        {
            name: "content",
            label: "Content",
            widget: "markdown",
            buttons: [
                "bold",
                "italic",
                "link",
                "heading-two",
                "heading-three",
                "heading-four",
                "quote",
                "bulleted-list",
                "numbered-list"
            ],
            editor_components: []
        }
    ],
    pattern: /^<block bg="([\s\S]*?)">([\s\S]*?)<\/block>/,
    fromBlock: function (match) {
        return {
            background: match[1],
            content: match[2]
        };
    },
    toBlock: function (obj) {
        return `<block bg="${obj.background}">\n\n${obj.content}\n\n</block>`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        var background = obj.background ?? "white";
        return `<div class="block bg-${background}"><div class="prose flow">${content}</div></div>`;
    }
});
