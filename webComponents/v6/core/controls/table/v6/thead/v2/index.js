import domElementBuilder from "../../../../../../domCreation/v2/index.js";
import createTh from "./createTh.js";
import createTr from "./createTr.js";

const createTr1 = ({ inRowConfig }) => {
    let tdChildren = [];

    for (const [key, value] of Object.entries(inRowConfig)) {
        console.log(`${key}: ${value}`);
        tdChildren.push(domElementBuilder({
            inSpec: {
                tagName: "td",
                textContent: value,
                attributes: {
                    class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
                }
            }
        }));
    };

    return domElementBuilder({
        inSpec: {
            tagName: "tr",
            children: tdChildren
        }
    });
};

export const createThead = ({ inHeaders, inColumns }) => {
    console.log("inHeaders, inColumns : ", inHeaders, inColumns);

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

export const createThead1 = ({ inHeaders, inColumns }) => {
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