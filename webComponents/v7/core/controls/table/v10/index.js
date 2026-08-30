import renderSkeleton from "./skeleton/renderSkeleton.js";
import bindSkeletonEvents from "./skeleton/bindSkeletonEvents.js";
import renderUserUI from "./userUI/renderUserUI.js";
import hydrateTableData from "./userUI/hydrateTableData.js";

/**
 * Table v10 3-Layer Skeleton Architecture Orchestrator
 *
 * Layer 1: Table Skeleton Creation (`renderSkeleton`)
 * Layer 2: Table Skeleton Events (`bindSkeletonEvents`)
 * Layer 3: Table User UI & Row Hydration (`renderUserUI`, `hydrateTableData`)
 */
export const renderTable = ({ inSpec, inRows, inOnRowClick }) => {
    const localSpec = inSpec;
    const localRows = inRows || [];
    const localOnRowClick = inOnRowClick;

    // Layer 1: Build Layout Skeleton DOM Shell (Header + empty tbody slot)
    const skeletonElement = renderSkeleton({ inSpec: localSpec });

    // Layer 2: Hook Table Event Listeners (e.g. row clicks)
    bindSkeletonEvents({
        inTableElement: skeletonElement,
        inOnRowClick: localOnRowClick
    });

    // Layer 3a: Inject & Render Dynamic Row DOM Nodes into tbody slot
    renderUserUI({
        inSkeletonElement: skeletonElement,
        inRows: localRows
    });

    return skeletonElement;
};

// Re-export sub-module layers for fine-grained step-by-step orchestration
export {
    renderSkeleton,
    bindSkeletonEvents,
    renderUserUI,
    hydrateTableData
};

export default renderTable;
