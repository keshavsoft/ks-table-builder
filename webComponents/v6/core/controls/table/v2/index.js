import domElementBuilder from "../../../../domCreation/v2/index.js";
import createThead from "./thead.js";
import createTbody from "./tbody.js";
import createTfoot from "./tfoot/v2/index.js";
import createSearch from "./search.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    console.log("localKsAttributes L ", localKsAttributes);

    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];
    const footers = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);
    const isSearch = Boolean(localKsAttributes.isSearch);

    const theadElement = createThead({ inHeaders: headers });
    const tbodyElement = createTbody({ inRows: rows, inHeaders: headers });
    const tfootElement = createTfoot({ inFooters: footers, inHeaders: headers });
    const searchElement = createSearch({ inIsSearch: isSearch });

    const tableElement = domElementBuilder({
        inSpec: {
            tagName: "table",
            children: [theadElement, tbodyElement, tfootElement].filter(Boolean),
            attributes: {
                class: "w-full border-collapse border border-gray-300 my-4"
            }
        }
    });

    if (!searchElement) {
        return tableElement;
    }

    return domElementBuilder({
        inSpec: {
            tagName: "div",
            attributes: {
                class: "w-full"
            },
            children: [searchElement, tableElement]
        }
    });
};

export default renderTable;
