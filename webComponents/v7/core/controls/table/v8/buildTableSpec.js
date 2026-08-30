import buildTheadSpec from "./buildTheadSpec.js";
import buildTbodySpec from "./buildTbodySpec.js";

export const buildTableSpec = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const theadSpec = buildTheadSpec({ inKsAttributes: localKsAttributes });
    const tbodySpec = buildTbodySpec({ inKsAttributes: localKsAttributes });

    return {
        tagName: "table",
        attributes: {
            class: "w-full border-collapse border border-gray-300 my-4"
        },
        children: [theadSpec, tbodySpec].filter(Boolean)
    };
};

export default buildTableSpec;
