import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import defaultGodSpec from "../tableGodSpec.json" with { type: "json" };

/**
 * Layer 1: Table v11 Skeleton Render
 * Builds the structural DOM Toolbar + <table> shell from tableGodSpec.json template.
 */
export const renderSkeleton = ({ inSpec }) => {
    const localSpec = inSpec || defaultGodSpec;

    // Build DOM tree skeleton for table & toolbar
    const skeletonElement = buildSpecElement(localSpec);
    return skeletonElement;
};

export default renderSkeleton;
