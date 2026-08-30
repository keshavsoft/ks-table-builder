import domElementBuilder from "../../../../../../domCreation/v2/index.js";
import createTh from "./createTh.js";
import createTr from "./createTr.js";

export const createThead = ({ inHeaders, inColumns }) => {
    const localColumns = Array.isArray(inColumns)
        ? inColumns
        : (Array.isArray(inHeaders) ? inHeaders : []);

    const thChildren = localColumns
        .map(colItem => createTh({ inColItem: colItem }))
        .filter(Boolean);

    const trElement = createTr({ inThChildren: thChildren });

    return domElementBuilder({
        inSpec: {
            tagName: "thead",
            children: [trElement]
        }
    });
};

export default createThead;