/**
 * Table User UI Helper: Builds a single <tr> row spec with <td> cells from a data record
 */
export const buildTableRowSpec = ({ inRowData, inIndex }) => {
    const localRowData = inRowData || {};
    const localIndex = typeof inIndex === "number" ? inIndex + 1 : 1;

    const cellSpecs = [
        // Index column (#)
        {
            tagName: "td",
            attributes: { class: "px-4 py-3 border-r border-gray-200 font-mono text-xs text-gray-500" },
            textContent: String(localIndex)
        },
        // StockItemName column
        {
            tagName: "td",
            attributes: { class: "px-4 py-3 border-r border-gray-200 font-medium text-gray-900" },
            textContent: localRowData.StockItemName || ""
        },
        // StockParentName column
        {
            tagName: "td",
            attributes: { class: "px-4 py-3 border-r border-gray-200 text-gray-600" },
            textContent: localRowData.StockParentName || ""
        },
        // Uom column
        {
            tagName: "td",
            attributes: { class: "px-4 py-3 text-gray-600" },
            textContent: localRowData.Uom || ""
        }
    ];

    return {
        tagName: "tr",
        attributes: { class: "hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer" },
        children: cellSpecs
    };
};

export default buildTableRowSpec;
