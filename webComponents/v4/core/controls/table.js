import resolveSpec from "../specResolver.js";
import domElementBuilder from "../../domCreation/v1/index.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];
    const footers = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);

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

    // 2. Create <tbody> -> <tr> -> <td> [Child Control or Text] </td>
    const trChildren = rows.map(rowConfig => {
        const tdChildren = headers.map(header => {
            const cellConfig = rowConfig[header] ?? rowConfig[header.toLowerCase()] ?? "";

            let cellContent;
            if (typeof cellConfig === "object" && cellConfig !== null) {
                cellContent = resolveSpec({ inConfig: cellConfig });
            } else {
                cellContent = document.createTextNode(String(cellConfig));
            }

            return domElementBuilder({
                inSpec: {
                    tagName: "td",
                    children: cellContent ? [cellContent] : [],
                    attributes: {
                        class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
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

    // 3. Create <tfoot> -> <tr> -> <td> [Footer Controls / Inputs] </td>
    let tfootElement = null;
    if (footers.length > 0) {
        const footerTrChildren = footers.map(footerRowConfig => {
            const tdChildren = headers.map(header => {
                const cellConfig = footerRowConfig[header] ?? footerRowConfig[header.toLowerCase()] ?? {};

                let cellContent;
                if (typeof cellConfig === "object" && cellConfig !== null) {
                    cellContent = resolveSpec({ inConfig: cellConfig });
                } else {
                    cellContent = document.createTextNode(String(cellConfig));
                }

                return domElementBuilder({
                    inSpec: {
                        tagName: "td",
                        children: cellContent ? [cellContent] : [],
                        attributes: {
                            class: "border border-gray-300 px-4 py-2 bg-gray-50"
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

        tfootElement = domElementBuilder({
            inSpec: {
                tagName: "tfoot",
                children: footerTrChildren
            }
        });
    }

    // 4. Create <table> element
    return domElementBuilder({
        inSpec: {
            tagName: "table",
            children: [theadElement, tbodyElement, tfootElement].filter(Boolean),
            attributes: {
                class: "w-full border-collapse border border-gray-300 my-4"
            }
        }
    });
};

export default renderTable;
