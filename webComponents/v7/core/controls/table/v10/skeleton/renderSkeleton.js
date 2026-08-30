import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import defaultGodSpec from "../tableGodSpec.json" with { type: "json" };

/**
 * Layer 1: Table Skeleton Render
 * Builds the structural DOM <table> shell (Header & empty tbody slot) from the layout God Spec template.
 */
export const renderSkeleton = ({ inSpec }) => {
    const localSpec = inSpec || defaultGodSpec;

    // Build DOM tree skeleton for table
    const skeletonElement = buildSpecElement(localSpec);
    return skeletonElement;
};

export default renderSkeleton;
