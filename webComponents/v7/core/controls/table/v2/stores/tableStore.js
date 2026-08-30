import createDataStore from "./dataStore.js";
import createColumnsStore from "./columnsStore.js";
import createFootersStore from "./footersStore.js";

export const createTableStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    return {
        data: createDataStore({ inKsAttributes: localKsAttributes }),
        columns: createColumnsStore({ inKsAttributes: localKsAttributes }),
        footers: createFootersStore({ inKsAttributes: localKsAttributes }),
        isSearch: Boolean(localKsAttributes.isSearch)
    };
};

export default createTableStore;
