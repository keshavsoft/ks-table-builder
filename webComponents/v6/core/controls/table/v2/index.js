import domElementBuilder from "../../../../domCreation/v2/index.js";
import createThead from "./thead.js";
// import createTbody from "./tbody.js";
import createTfoot from "./tfoot/v2/index.js";
import createSearch from "./search/v2/index.js";
import createTable from "./table.js";

import createTbody from "./tbody/v1/create.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];
    const footers = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);
    const isSearch = Boolean(localKsAttributes.isSearch);

    let dataStore = {};
    dataStore.originalData = rows;
    dataStore.data = rows;

    const theadElement = createThead({ inHeaders: headers });
    const tbodyElement = createTbody({ inRows: rows, inHeaders: headers });
    const tfootElement = createTfoot({ inFooters: footers, inHeaders: headers });
    const searchElement = createSearch({
        inIsSearch: isSearch,
        inDataStore: dataStore,
        inTbodyElement: tbodyElement,
        inHeaders: headers
    });

    const tableElement = createTable({
        inTheadElement: theadElement,
        inTbodyElement: tbodyElement,
        inTfootElement: tfootElement
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
