import domElementBuilder from "../../../../../domCreation/v2/index.js";
import createTd from "./td.js";

export const createTr = ({ inFooterRowConfig, inHeaders }) => {
    const localFooterRowConfig = inFooterRowConfig || {};
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    const tdChildren = localHeaders.map(header => {
        const cellConfig = localFooterRowConfig[header] ?? localFooterRowConfig[header.toLowerCase()] ?? {};
        return createTd({ inCellConfig: cellConfig });
    }).filter(Boolean);

    return domElementBuilder({
        inSpec: {
            tagName: "tr",
            children: tdChildren
        }
    });
};

export default createTr;
