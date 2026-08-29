import createDataStore from "./dataStore/index.js";
import createColumnsStore from "./columnsStore/index.js";
import createFootersStore from "./footersStore.js";

export const createTableStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const footersStore = createFootersStore({ inKsAttributes: localKsAttributes });

    return {
        data: createDataStore({ inKsAttributes: localKsAttributes }),
        columns: createColumnsStore({ inKsAttributes: localKsAttributes }),
        footers: footersStore,
        isSearch: Boolean(localKsAttributes.isSearch ?? localKsAttributes.showSearch ?? false),
        showSerial: Boolean(localKsAttributes.showSerial ?? localKsAttributes.isSerial ?? localKsAttributes.showSNo ?? false),
        showHeader: Boolean(localKsAttributes.showHeader ?? localKsAttributes.isHeader ?? true),
        showBody: Boolean(localKsAttributes.showBody ?? localKsAttributes.isBody ?? true),
        showFooter: Boolean(
            localKsAttributes.showFooter ??
            localKsAttributes.isFooter ??
            (typeof footersStore.hasFooters === "function"
                ? footersStore.hasFooters()
                : (Array.isArray(footersStore.footers) && footersStore.footers.length > 0))
        )
    };
};

export default createTableStore;
