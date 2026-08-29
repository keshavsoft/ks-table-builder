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

    // Optional element flags (supports showHeader/isHeader, showBody/isBody, etc.)
    const showHeader = Boolean(localKsAttributes.showHeader ?? localKsAttributes.isHeader ?? true);
    const showBody = Boolean(localKsAttributes.showBody ?? localKsAttributes.isBody ?? true);
    const showFooter = Boolean(
        localKsAttributes.showFooter ??
        localKsAttributes.isFooter ??
        (Array.isArray(footersStore.footers) && footersStore.footers.length > 0)
    );
    const showSearch = Boolean(localKsAttributes.showSearch ?? localKsAttributes.isSearch ?? false);

    const theadElement = showHeader ? createThead({ inHeaders: columnsStore.headers }) : null;
    const tbodyElement = showBody ? createTbody({ inRows: dataStore.data, inHeaders: columnsStore.headers }) : null;
    const tfootElement = showFooter ? createTfoot({ inFooters: footersStore.footers, inHeaders: columnsStore.headers }) : null;

    const searchElement = createSearch({
        inIsSearch: showSearch,
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
