import buildSpecElement from "../../../../domCreation/v2/buildSpecElement.js";
import buildTableSpec from "./buildTableSpec.js";

export const renderTable = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const tableSpec = buildTableSpec({
        inKsAttributes: localKsAttributes
    });

    return buildSpecElement(tableSpec);
};

export default renderTable;

