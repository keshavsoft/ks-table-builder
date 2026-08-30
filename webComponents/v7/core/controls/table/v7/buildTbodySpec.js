import resolveSpec from "../../../specResolver.js";

export const buildTbodySpec = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const rows = Array.isArray(localKsAttributes.rows)
        ? localKsAttributes.rows
        : (Array.isArray(localKsAttributes.data) ? localKsAttributes.data : []);

    let headers = localKsAttributes.headers;
    if (!Array.isArray(headers) || headers.length === 0) {
        if (rows.length > 0 && typeof rows[0] === "object" && rows[0] !== null) {
            headers = Object.keys(rows[0]);
        } else {
            headers = [];
        }
    }

    const trChildren = rows.map(rowItem => {
        const localRow = rowItem || {};

        const tdChildren = headers.map(header => {
            const headerKey = typeof header === "object" && header !== null ? (header.key || header.name) : header;
            const cellConfig = localRow[headerKey] ?? localRow[String(headerKey).toLowerCase()] ?? "";

            if (typeof cellConfig === "object" && cellConfig !== null) {
                const resolvedChild = resolveSpec({ inConfig: cellConfig });
                return {
                    tagName: "td",
                    attributes: {
                        class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
                    },
                    children: resolvedChild ? [resolvedChild] : []
                };
            }

            return {
                tagName: "td",
                textContent: String(cellConfig ?? ""),
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

export default buildTbodySpec;
