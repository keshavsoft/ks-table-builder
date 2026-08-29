import buildSpecElement from "../../../../../../domCreation/v2/buildSpecElement.js";

export const createThead = ({ inHeadersWithConfig }) => {
    if (inHeadersWithConfig) {
        return buildSpecElement(inHeadersWithConfig);
    };
};

export default createThead;