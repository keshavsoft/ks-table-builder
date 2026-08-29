import domElementBuilder from "../../../../../domCreation/v2/index.js";
import createTr from "./tr.js";

export const createTfoot = ({ inFooters, inHeaders }) => {
    const localFooters = Array.isArray(inFooters) ? inFooters : [];
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    if (localFooters.length === 0) {
        return null;
    }

    const footerTrChildren = localFooters.map(footerRowConfig => {
        return createTr({ inFooterRowConfig: footerRowConfig, inHeaders: localHeaders });
    }).filter(Boolean);

    return domElementBuilder({
        inSpec: {
            tagName: "tfoot",
            children: footerTrChildren
        }
    });
};

export default createTfoot;
