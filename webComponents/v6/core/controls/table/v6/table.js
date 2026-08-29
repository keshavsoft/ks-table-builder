import domElementBuilder from "../../../../domCreation/v2/index.js";
import createThead from "./thead/v2/index.js";
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

    const theadElement = inTheadElement ?? (showHeader ? createThead({
        inObjectConfig: columnsStore.headersWithConfig
    }) : null);

    const tbodyElement = inTbodyElement ?? (showBody ? createTbody({
        inDataWithConfig: dataStore.dataWithConfig
    }) : null);

    const tbodyElement1 = inTbodyElement ?? (showBody ? createTbody({
        inDataWithConfig: dataStore.dataWithConfig
    }) : null);

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

