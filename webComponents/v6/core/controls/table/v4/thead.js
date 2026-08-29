import domElementBuilder from "../../../../domCreation/v2/index.js";

export const createThead = ({ inHeaders }) => {
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    const thChildren = localHeaders.map(headerText => {
        return domElementBuilder({
            inSpec: {
                tagName: "th",
                textContent: headerText,
                attributes: {
                    class: "border border-gray-300 px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                }
            }
        });
    }).filter(Boolean);

    return domElementBuilder({
        inSpec: {
            tagName: "thead",
            children: [
                domElementBuilder({
                    inSpec: {
                        tagName: "tr",
                        children: thChildren
                    }
                })
            ]
        }
    });
};

export default createThead;
