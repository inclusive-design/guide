/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "call-to-action",
    label: "Call to Action",
    fields: [
        {
            name: "type",
            label: "Type",
            widget: "select",
            options: [
                {label: "Activity", value: "activity"},
                {label: "Insight", value: "insight"},
                {label: "Practice", value: "practice"},
                {label: "Technique", value: "technique"}
            ]
        },
        {
            name: "href",
            label: "Link",
            widget: "string"
        },
        {
            name: "title",
            label: "Title",
            widget: "string"
        },
        {
            name: "content",
            label: "Content",
            widget: "string"
        }
    ],
    pattern: /^{% callToAction "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endcallToAction %}/,
    fromBlock: function (match) {
        return {
            title: match[1],
            href: match[2],
            type: match[3],
            content: match[4]
        };
    },
    toBlock: function (obj) {
        return `{% callToAction "${obj.title}", "${obj.href}", "${obj.type}" %}${obj.content}{% endcallToAction %}`;
    },
    toPreview: function (obj) {
        return `<div class="call-to-action call-to-action--${obj.type}">
            <div class="title">
                <a href="${obj.href}">${obj.title || "Title"}</a>
                <svg viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 10.5a1.5 1.5 0 0 0 0 3v-3Zm19.06 2.56a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L17.88 12l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM2 13.5h18v-3H2v3Z" fill="currentColor"/></svg>
            </div>
            <p>${obj.content}</p>
        </div>`;
    }
});
