import resolveSpec from "../../../../specResolver.js";
import domElementBuilder from "../../../../../domCreation/v2/index.js";

export const createTfoot = ({ inFooters, inHeaders }) => {
    const localFooters = Array.isArray(inFooters) ? inFooters : [];
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    if (localFooters.length === 0) {
        return null;
    }

    const footerTrChildren = localFooters.map(footerRowConfig => {
        const tdChildren = localHeaders.map(header => {
            const cellConfig = footerRowConfig[header] ?? footerRowConfig[header.toLowerCase()] ?? {};

            let cellContent;
            if (typeof cellConfig === "object" && cellConfig !== null) {
                cellContent = resolveSpec({ inConfig: cellConfig });
            } else {
                cellContent = document.createTextNode(String(cellConfig));
            }

            return domElementBuilder({
                inSpec: {
                    tagName: "td",
                    children: cellContent ? [cellContent] : [],
                    attributes: {
                        class: "border border-gray-300 px-4 py-2 bg-gray-50"
                    }
                }
            });
        }).filter(Boolean);

        return domElementBuilder({
            inSpec: {
                tagName: "tr",
                children: tdChildren
            }
        });
    }).filter(Boolean);

    return domElementBuilder({
        inSpec: {
            tagName: "tfoot",
            children: footerTrChildren
        }
    });
};

export default createTfoot;
