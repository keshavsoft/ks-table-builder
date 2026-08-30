import { renderSkeleton, renderUserUI, bindSkeletonEvents } from "../../webComponents/v7/core/controls/table/v10/index.js";

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    // PHASE 1: Render & Mount Table Skeleton
    const skeletonElement = renderSkeleton({});

    bindSkeletonEvents({
        inTableElement: skeletonElement,
        inOnRowClick: ({ inRowElement }) => {
            const itemName = inRowElement.children[1]?.textContent;
            alert(`Selected Stock Item: ${itemName}`);
        }
    });

    tableContainer.appendChild(skeletonElement);

    // PHASE 2: (Async API Simulation) Populate Rows into Mounted Table tbody
    setTimeout(() => {
        const stockRows = [
            { StockItemName: "0.09/30mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.11-25", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.11-30", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.11/32mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.11/35mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.13/32mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" },
            { StockItemName: "0.14/30mm", StockParentName: "FISH KNITTED FABRIC", Uom: "kgs" }
        ];

        renderUserUI({
            inTarget: "#tableContainer",
            inRows: stockRows
        });
    }, 600);
}
