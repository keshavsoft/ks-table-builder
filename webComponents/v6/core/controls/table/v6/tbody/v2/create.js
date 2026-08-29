import domElementBuilder from "../../../../../../domCreation/v2/index.js";
import buildSpecElement from "../../../../../../domCreation/v2/buildSpecElement.js";

export const createTbody = ({ inDataWithConfig }) => {
    const localDataWithConfig = Array.isArray(inDataWithConfig) ? inDataWithConfig : [];
    const trNodes = buildSpecElement(localDataWithConfig);
    const trChildren = Array.isArray(trNodes) ? trNodes : (trNodes ? [trNodes] : []);

    return domElementBuilder({
        inSpec: {
            tagName: "tbody",
            children: trChildren
        }
    });
};

export default createTbody;