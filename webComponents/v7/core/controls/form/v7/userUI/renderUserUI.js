import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import buildUserRowSpec from "./buildUserRowSpec.js";

/**
 * Layer 3: User UI Render
 * Generates user-defined input controls from field configurations and mounts them into the body slot of the skeleton DOM.
 */
export const renderUserUI = ({ inSkeletonElement, inFields }) => {
    const localSkeletonElement = inSkeletonElement;
    const localFields = inFields || [];

    if (!localSkeletonElement) return null;

    // 1. Locate the body slot container in the skeleton DOM
    const bodySlotElem = localSkeletonElement.querySelector('[slot="body"]') || localSkeletonElement;

    // 2. Build row specs for each field definition
    const rowSpecs = localFields.map(field => buildUserRowSpec({ inField: field }));

    // 3. Convert row specs to DOM nodes
    const userNodes = buildSpecElement(rowSpecs);

    // 4. Mount user control nodes into the skeleton body slot
    if (Array.isArray(userNodes)) {
        userNodes.forEach(node => bodySlotElem.appendChild(node));
    } else if (userNodes instanceof Node) {
        bodySlotElem.appendChild(userNodes);
    }

    return localSkeletonElement;
};

export default renderUserUI;
