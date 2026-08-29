import domElementBuilder from "../../../../../../domCreation/v2/index.js";
import refreshBody from "../../tbody/v2/refresh.js";
// import createTbody from "../../tbody.js";

export const createSearch = ({ inIsSearch, inDataStore, inTbodyElement, inHeaders }) => {
    const localIsSearch = Boolean(inIsSearch);
    const localDataStore = inDataStore || {};
    let localTbodyElement = inTbodyElement;
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    if (!localIsSearch) {
        return null;
    }

    const handleSearchKeydown = (e) => {
        const typedValue = e.target.value || "";
        const filterText = typedValue.toLowerCase().trim();
        const originalRows = Array.isArray(localDataStore.originalData) ? localDataStore.originalData : [];

        if (!filterText) {
            localDataStore.data = [...originalRows];
        } else {
            localDataStore.data = originalRows.filter(row => {
                if (!row || typeof row !== "object") return false;
                return Object.values(row).some(val =>
                    val !== null && val !== undefined && String(val).toLowerCase().includes(filterText)
                );
            });
        }

        if (localTbodyElement && typeof localTbodyElement.replaceWith === "function") {
            const newTbodyElement = refreshBody({
                inRows: localDataStore.data,
                inHeaders: localHeaders,
                inDataStore: localDataStore
            });
            localTbodyElement.replaceWith(newTbodyElement);
            localTbodyElement = newTbodyElement;
        }
    };

    const searchInputElement = domElementBuilder({
        inSpec: {
            tagName: "input",
            attributes: {
                type: "text",
                placeholder: "Search table...",
                class: "w-full md:w-64 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            },
            events: {
                keyup: handleSearchKeydown,
                input: handleSearchKeydown,
                keydown: handleSearchKeydown
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
