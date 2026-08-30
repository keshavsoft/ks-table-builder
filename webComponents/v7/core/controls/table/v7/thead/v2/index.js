import buildSpecElement from "../../../../../../domCreation/v2/buildSpecElement.js";

export const createThead = ({ inObjectConfig }) => {
    if (inObjectConfig) {
        return buildSpecElement(inObjectConfig);
    };
};

export default createThead;