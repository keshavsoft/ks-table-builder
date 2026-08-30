import buildTheadSpec from "./buildTheadSpec.js";
import buildTbodySpec from "./buildTbodySpec.js";
import themes from "../../../themes.json" with { type: "json" };

export const buildTableSpec = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    console.log("localKsAttributes : ", localKsAttributes);

    const themeName = localKsAttributes.theme || "default";
    const themeConfig = themes[themeName]?.table || themes["default"]?.table || {};

    const customClasses = localKsAttributes.classes || {};
    const tableClasses = customClasses.table || themeConfig.table || "w-full border-collapse border border-gray-300 my-4";

    const theadSpec = buildTheadSpec({
        inKsAttributes: localKsAttributes,
        inThemeConfig: themeConfig,
        inCustomClasses: customClasses
    });

    const tbodySpec = buildTbodySpec({
        inKsAttributes: localKsAttributes,
        inThemeConfig: themeConfig,
        inCustomClasses: customClasses
    });

    return {
        tagName: "table",
        attributes: {
            class: tableClasses
        },
        children: [theadSpec, tbodySpec].filter(Boolean)
    };
};

export default buildTableSpec;
