import createSearch from "./search/v2/index.js";
import createTable from "./table.js";

export const buildElements = ({ inKsAttributes, inTableStore }) => {
    const localKsAttributes = inKsAttributes || {};
    const localTableStore = inTableStore || {};

    const dataStore = localTableStore.data || {};
    const columnsStore = localTableStore.columns || {};

    const showSearch = Boolean(localKsAttributes.showSearch ?? localKsAttributes.isSearch ?? localTableStore.isSearch ?? false);
    const headersList = Array.isArray(columnsStore.headers) ? columnsStore.headers : [];

    const tableElement = createTable({
        inKsAttributes: localKsAttributes,
        inTableStore: localTableStore
    });

    const searchElement = createSearch({
        inIsSearch: showSearch,
        inDataStore: dataStore,
        inTbodyElement: tableElement ? tableElement.querySelector("tbody") : null,
        inHeaders: headersList
    });

    return {
        searchElement,
        tableElement
    };
};

export default buildElements;

