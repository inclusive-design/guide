/* global CMS, createClass, h, htm */

"use strict";

const html = htm.bind(h);

CMS.registerPreviewTemplate("pages", createClass({
    render: function () {
        const entry = this.props.entry;
        return (
            html`<article>
                <header class="prose flow">
                    <h1>${entry.getIn(["data", "title"])}</h1>
                    <div class="subhead">
                        ${this.props.widgetFor("subhead")}
                    </div>
                </header>
                <div class="prose flow">
                    ${this.props.widgetFor("body")}
                </div>
            </article>`
        );
    }
}));
