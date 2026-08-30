import domElementBuilder from "../../../../../../domCreation/v2/index.js";
import createTr from "./createTr.js";

const startFunc = ({ inHeaders, inDataStore }) => {
    const localDataStore = inDataStore || {};
    const rows = localDataStore.data;

    const localRows = Array.isArray(rows) ? rows : [];
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    const trChildren = localRows
        .map(rowConfig => createTr({ inRowConfig: rowConfig }))
        .filter(Boolean);

    return domElementBuilder({
        inSpec: {
            tagName: "tbody",
            children: trChildren
        }
    });
};

export default startFunc;

