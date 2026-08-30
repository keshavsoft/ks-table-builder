import domElementBuilder from "../../../../domCreation/v2/index.js";
import buildElements from "./buildElements.js";
import createTableStore from "./stores/tableStore.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const tableStore = createTableStore({ inKsAttributes: localKsAttributes });

    const { searchElement, tableElement } = buildElements({
        inKsAttributes: localKsAttributes,
        inTableStore: tableStore
    });

    if (!searchElement) return tableElement;

    return domElementBuilder({
        inSpec: {
            tagName: "div",
            attributes: { class: "w-full" },
            children: [searchElement, tableElement]
        }
    });
};

export default renderTable;
