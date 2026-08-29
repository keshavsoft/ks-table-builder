import resolveSpec from "../../specResolver.js";
import domElementBuilder from "../../../domCreation/v1/index.js";

export const createTbody = ({ inRows, inHeaders }) => {
    const localRows = Array.isArray(inRows) ? inRows : [];
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    const trChildren = localRows.map(rowConfig => {
        const tdChildren = localHeaders.map(header => {
            const cellConfig = rowConfig[header] ?? rowConfig[header.toLowerCase()] ?? "";

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
                        class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
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
            tagName: "tbody",
            children: trChildren
        }
    });
};

export default createTbody;
