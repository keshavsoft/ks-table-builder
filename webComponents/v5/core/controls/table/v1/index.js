import domElementBuilder from "../../../../domCreation/v2/index.js";
import createThead from "./thead.js";
import createTbody from "./tbody.js";
import createTfoot from "./tfoot/v2/index.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];
    const footers = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);

    const theadElement = createThead({ inHeaders: headers });
    const tbodyElement = createTbody({ inRows: rows, inHeaders: headers });
    const tfootElement = createTfoot({ inFooters: footers, inHeaders: headers });

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
