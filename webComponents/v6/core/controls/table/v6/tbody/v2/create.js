import buildSpecElement from "../../../../../../domCreation/v2/buildSpecElement.js";

export const createTbody = ({ inDataWithConfig }) => {
    if (inDataWithConfig) {
        return buildSpecElement(inDataWithConfig);
    }
    return null;
};

export default createTbody;