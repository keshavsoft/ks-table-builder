import domElementBuilder from "../../../../../../domCreation/v2/index.js";

export const createSearch = ({ inIsSearch }) => {
    const localIsSearch = Boolean(inIsSearch);

    if (!localIsSearch) {
        return null;
    }

    const searchInputElement = domElementBuilder({
        inSpec: {
            tagName: "input",
            attributes: {
                type: "text",
                placeholder: "Search table...",
                class: "w-full md:w-64 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            }
        }
    });

    return domElementBuilder({
        inSpec: {
            tagName: "div",
            attributes: {
                class: "mb-3 flex justify-end items-center"
            },
            children: [searchInputElement]
        }
    });
};

export default createSearch;
