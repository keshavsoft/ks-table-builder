import createThead from "./thead.js";
import createTfoot from "./tfoot/v2/index.js";
import createSearch from "./search/v2/index.js";
import createTable from "./table.js";
import createTbody from "./tbody/v1/create.js";

export const buildElements = ({ inKsAttributes, inTableStore }) => {
    const localKsAttributes = inKsAttributes || {};
    const localTableStore = inTableStore || {};

    const dataStore = localTableStore.data || {};
    const columnsStore = localTableStore.columns || {};
    const footersStore = localTableStore.footers || {};

    const theadElement = createThead({ inHeaders: columnsStore.headers });
    const tbodyElement = createTbody({ inRows: dataStore.data, inHeaders: columnsStore.headers });
    const tfootElement = createTfoot({ inFooters: footersStore.footers, inHeaders: columnsStore.headers });

    const searchElement = createSearch({
        inIsSearch: Boolean(localKsAttributes.isSearch),
        inDataStore: dataStore,
        inTbodyElement: tbodyElement,
        inHeaders: columnsStore.headers
    });

    const tableElement = createTable({
        inTheadElement: theadElement,
        inTbodyElement: tbodyElement,
        inTfootElement: tfootElement
    });

    return {
        searchElement,
        tableElement
    };
};

export default buildElements;
