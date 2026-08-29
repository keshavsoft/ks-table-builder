export const createHeadersWithConfig = ({ inColumns }) => {
    const localColumns = Array.isArray(inColumns) ? inColumns : [];

    const thChildren = localColumns.map(colItem => {
        const headerText = typeof colItem === "object"
            ? (colItem.label || colItem.key || "")
            : String(colItem || "");

        return {
            tagName: "th",
            textContent: headerText,
            attributes: {
                class: "border border-gray-300 px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700"
            }
        };
    }).filter(Boolean);

    return {
        tagName: "thead",
        children: [
            {
                tagName: "tr",
                children: thChildren
            }
        ]
    };
};

export default createHeadersWithConfig;
