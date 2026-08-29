import domElementBuilder from "../../../../domCreation/v2/index.js";
import createThead from "./thead/v1/index.js";
import createTbody from "./tbody/v2/create.js";
import createTfoot from "./tfoot/v2/index.js";

export const createTable = ({
    inKsAttributes,
    inTableStore,
    inTheadElement,
    inTbodyElement,
    inTfootElement
}) => {
    const localKsAttributes = inKsAttributes || {};
    const localTableStore = inTableStore || {};

    const dataStore = localTableStore.data || {};
    const columnsStore = localTableStore.columns || {};
    const footersStore = localTableStore.footers || {};

    const showHeader = Boolean(
        localKsAttributes.showHeader ??
        localKsAttributes.isHeader ??
        localTableStore.showHeader ??
        true
    );

    const showBody = Boolean(
        localKsAttributes.showBody ??
        localKsAttributes.isBody ??
        localTableStore.showBody ??
        true
    );

    const showFooter = Boolean(
        localKsAttributes.showFooter ??
        localKsAttributes.isFooter ??
        localTableStore.showFooter ??
        (typeof footersStore.hasFooters === "function"
            ? footersStore.hasFooters()
            : (Array.isArray(footersStore.footers) && footersStore.footers.length > 0))
    );

    const visibleColumns = typeof columnsStore.getVisibleColumns === "function"
        ? columnsStore.getVisibleColumns()
        : (columnsStore.columns || columnsStore.headers || []);
    const headersList = Array.isArray(columnsStore.headers) ? columnsStore.headers : [];

    const theadElement = inTheadElement ?? (showHeader ? createThead({ inHeaders: headersList, inColumns: visibleColumns }) : null);
    const tbodyElement = inTbodyElement ?? (showBody ? createTbody({ inRows: dataStore.data, inHeaders: headersList }) : null);
    const tfootElement = inTfootElement ?? (showFooter ? createTfoot({ inFooters: footersStore.footers, inHeaders: headersList }) : null);

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

export default createTable;

