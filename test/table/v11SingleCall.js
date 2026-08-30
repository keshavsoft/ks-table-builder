import { renderTable } from "../../webComponents/v7/core/controls/table/v11/index.js";

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    // Raw stock data (NO serialNo column provided!)
    const stockRows = [
        { StockItemName: "0.09/30mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.11-25", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.11-30", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.11/32mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.11/35mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.13/32mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
        { StockItemName: "0.14/30mm", StockParentName: "COTTON FABRIC", Uom: "meters" }
    ];

    const handleRowClick = ({ inRowElement }) => {
        const itemName = inRowElement.children[1]?.textContent;
        alert(`Selected Stock Item: ${itemName}`);
    };

    // Table v11 Render (Includes Search Toolbar + Data Mapper Layer)
    const tableElement = renderTable({
        inRows: stockRows,
        inOnRowClick: handleRowClick
    });

    if (tableElement) {
        tableContainer.appendChild(tableElement);
    }
}
