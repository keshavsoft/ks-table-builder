export const buildTheadSpec = ({ inKsAttributes, inThemeConfig, inCustomClasses }) => {
    const localKsAttributes = inKsAttributes || {};
    const localThemeConfig = inThemeConfig || {};
    const localCustomClasses = inCustomClasses || {};

    let headers = localKsAttributes.headers;
    if (!Array.isArray(headers) || headers.length === 0) {
        const rows = Array.isArray(localKsAttributes.rows)
            ? localKsAttributes.rows
            : (Array.isArray(localKsAttributes.data) ? localKsAttributes.data : []);

        if (rows.length > 0 && typeof rows[0] === "object" && rows[0] !== null) {
            headers = Object.keys(rows[0]);
        } else {
            headers = [];
        }
    }

    const thClasses = localCustomClasses.th || localThemeConfig.th || "border border-gray-300 px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700";

    const thChildren = headers.map(colItem => {
        const headerText = typeof colItem === "object" && colItem !== null
            ? (colItem.label || colItem.key || "")
            : String(colItem || "");

        return {
            tagName: "th",
            textContent: headerText,
            attributes: {
                class: thClasses
            }
        };
    });

    const theadClasses = localCustomClasses.thead || localThemeConfig.thead;

    return {
        tagName: "thead",
        ...(theadClasses ? { attributes: { class: theadClasses } } : {}),
        children: [
            {
                tagName: "tr",
                children: thChildren
            }
        ]
    };
};

export default buildTheadSpec;
