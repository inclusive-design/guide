/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "content-block",
    label: "Content Block",
    fields: [
        {
            name: "background",
            label: "Background",
            widget: "select",
            options: [
                {label: "Green 100", value: "green-100"},
                {label: "Green 800", value: "green-800"},
                {label: "Transparent", value: "transparent"}
            ]
        },
        {
            name: "width",
            label: "Width",
            widget: "select",
            options: [
                {label: "Full", value: "full"},
                {label: "Two-Thirds", value: "two-thirds"}
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
            editor_components: [
                "call-to-action"
            ]
        }
    ],
    pattern: /^<div class="content content--([\s\S]*?) bg-([\s\S]*?)">([\s\S]*?)<\/div>/,
    fromBlock: function (match) {
        return {
            width: match[1],
            background: match[2],
            content: match[3]
        };
    },
    toBlock: function (obj) {
        return `<div class="content content--${obj.width || "full"} bg-${obj.background || "transparent"}">\n${obj.content}\n</div>`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="content content--${obj.width || "full"} bg-${obj.background || "transparent"}">\n${content}\n</div>`;
    }
});
