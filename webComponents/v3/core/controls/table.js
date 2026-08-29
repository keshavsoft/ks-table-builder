import resolveSpec from "../specResolver.js";
import domElementBuilder from "../../domCreation/v1/index.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];

    // 1. Create <thead> -> <tr> -> <th>...</th>
    const thChildren = headers.map(headerText => {
        return domElementBuilder({
            inSpec: {
                tagName: "th",
                textContent: headerText,
                attributes: {
                    class: "border border-gray-300 px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                }
            }
        });
    }).filter(Boolean);

    const theadElement = domElementBuilder({
        inSpec: {
            tagName: "thead",
            children: [
                domElementBuilder({
                    inSpec: {
                        tagName: "tr",
                        children: thChildren
                    }
                })
            ]
        }
    });

    // 2. Create <tbody> -> <tr> -> <td> [Child Control] </td>
    const trChildren = rows.map(rowConfig => {
        const tdChildren = headers.map(header => {
            const cellConfig = rowConfig[header] || rowConfig[header.toLowerCase()] || {};
            const cellControl = resolveSpec({ inConfig: cellConfig });

            return domElementBuilder({
                inSpec: {
                    tagName: "td",
                    children: cellControl ? [cellControl] : [],
                    attributes: {
                        class: "border border-gray-300 px-4 py-2"
                    }
                }
            });
        }).filter(Boolean);

        return domElementBuilder({
            inSpec: {
                tagName: "tr",
                children: tdChildren
            }
        });
    }).filter(Boolean);

    const tbodyElement = domElementBuilder({
        inSpec: {
            tagName: "tbody",
            children: trChildren
        }
    });

    // 3. Create <table> element
    return domElementBuilder({
        inSpec: {
            tagName: "table",
            children: [theadElement, tbodyElement].filter(Boolean),
            attributes: {
                class: "w-full border-collapse border border-gray-300 my-4"
            }
        }
    });
};

export default renderTable;
