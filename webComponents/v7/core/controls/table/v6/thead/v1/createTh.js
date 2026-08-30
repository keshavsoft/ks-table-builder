import domElementBuilder from "../../../../../../domCreation/v2/index.js";

export const createTh = ({ inColItem }) => {
    const localColItem = inColItem;
    const headerText = typeof localColItem === "object"
        ? (localColItem.label || localColItem.key || "")
        : String(localColItem || "");

    return domElementBuilder({
        inSpec: {
            tagName: "th",
            textContent: headerText,
            attributes: {
                class: "border border-gray-300 px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700"
            }
        }
    });
};

export default createTh;
