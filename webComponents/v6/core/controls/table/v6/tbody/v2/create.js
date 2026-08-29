import domElementBuilder from "../../../../../../domCreation/v2/index.js";

export const createTbody = ({ inRows, inDataWithConfig }) => {
    console.log("inDataWithConfig : ", inDataWithConfig);
    const localRows = Array.isArray(inRows) ? inRows : [];

    const trChildren = localRows.map(rowConfig => {
        return createTr({ inRowConfig: rowConfig });
    });

    return domElementBuilder({
        inSpec: {
            tagName: "tbody",
            children: trChildren
        }
    });
};

export const createTbody1 = ({ inRows, inDataWithConfig }) => {
    console.log("inDataWithConfig : ", inDataWithConfig);
    const localRows = Array.isArray(inRows) ? inRows : [];

    const trChildren = localRows.map(rowConfig => {
        return createTr({ inRowConfig: rowConfig });
    });

    return domElementBuilder({
        inSpec: {
            tagName: "tbody",
            children: trChildren
        }
    });
};

const createTr = ({ inRowConfig }) => {
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

export default createTbody;