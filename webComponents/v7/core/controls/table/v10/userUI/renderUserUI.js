import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import buildTableRowSpec from "./buildTableRowSpec.js";

/**
 * Layer 3: Table User UI Render
 * Converts data records into <tr> DOM rows and mounts them into the tbody slot of the skeleton table.
 * Supports both In-Memory DOM Nodes (inSkeletonElement) and Global Page DOM Targets (inTarget).
 */
export const renderUserUI = ({ inSkeletonElement, inTarget, inRows }) => {
    const localSkeletonElement = inSkeletonElement;
    const localTarget = inTarget;
    const localRows = inRows || [];

    // 1. Resolve Target Container:
    let targetElem = null;

    if (localSkeletonElement instanceof Node) {
        targetElem = localSkeletonElement;
    } else if (typeof localTarget === "string") {
        targetElem = document.querySelector(localTarget);
    } else if (typeof localSkeletonElement === "string") {
        targetElem = document.querySelector(localSkeletonElement);
    }

    if (!targetElem) {
        targetElem = document.querySelector('tbody[slot="body"]') || document.querySelector('tbody') || document.body;
    }

    // 2. Locate the tbody slot container
    const tbodySlotElem = (targetElem instanceof Node && targetElem.tagName?.toLowerCase() === "tbody")
        ? targetElem
        : (targetElem.querySelector?.('tbody[slot="body"]') || targetElem.querySelector?.('tbody') || targetElem);

    // 3. Build <tr> row specs for each data record
    const rowSpecs = localRows.map((rowData, idx) => buildTableRowSpec({ inRowData: rowData, inIndex: idx }));

    // 4. Convert row specs into DOM nodes
    const rowNodes = buildSpecElement(rowSpecs);

    // 5. Append/Mount row nodes into the tbody slot
    if (Array.isArray(rowNodes)) {
        rowNodes.forEach(node => tbodySlotElem.appendChild(node));
    } else if (rowNodes instanceof Node) {
        tbodySlotElem.appendChild(rowNodes);
    }

    return targetElem;
};

export default renderUserUI;
