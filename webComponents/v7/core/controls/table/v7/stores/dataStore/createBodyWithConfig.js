export const createBodyWithConfig = ({ inRows, inHeaders }) => {
    const localRows = Array.isArray(inRows) ? inRows : [];
    const localHeaders = Array.isArray(inHeaders) ? inHeaders : [];

    const trChildren = localRows.map(rowItem => {
        const localRow = rowItem || {};

        let keys = localHeaders;
        if (keys.length === 0) {
            keys = Object.keys(localRow);
            if (keys.includes("sNo")) {
                keys = ["sNo", ...keys.filter(k => k !== "sNo")];
            }
        }

        const tdChildren = keys.map(headerKey => {
            const val = localRow[headerKey] ?? localRow[String(headerKey).toLowerCase()] ?? "";
            return {
                tagName: "td",
                textContent: String(val ?? ""),
                attributes: {
                    class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
                }
            };
        });

        return {
            tagName: "tr",
            children: tdChildren
        };
    });

    return {
        tagName: "tbody",
        children: trChildren
    };
};

export default createBodyWithConfig;
