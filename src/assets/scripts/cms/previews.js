/* global CMS, createClass, h */

"use strict";

const slugify = require("@sindresorhus/slugify");

CMS.registerPreviewTemplate("pages", createClass({
    render: function () {
        const entry = this.props.entry;
        return h("iframe", {src: `${window.location.origin}/preview/${slugify(entry.getIn(["data", "title"]))}/`});
    }
}));

