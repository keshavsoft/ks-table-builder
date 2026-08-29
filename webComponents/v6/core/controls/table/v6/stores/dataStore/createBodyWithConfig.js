export const createBodyWithConfig = ({ inRows }) => {
    const localRows = Array.isArray(inRows) ? inRows : [];

    const trChildren = localRows.map(rowItem => {
        const tdChildren = [];
        for (const [key, value] of Object.entries(rowItem || {})) {
            tdChildren.push({
                tagName: "td",
                textContent: String(value ?? ""),
                attributes: {
                    class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
                }
            });
        }

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
