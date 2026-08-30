/**
 * Layer 2: Table Skeleton Events
 * Hooks event handlers onto the structural table DOM element (e.g. click handlers, search filters).
 */
export const bindSkeletonEvents = ({ inTableElement, inOnRowClick }) => {
    const localTableElement = inTableElement;
    const localOnRowClick = inOnRowClick;

    if (!localTableElement || typeof localOnRowClick !== "function") return;

    localTableElement.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        if (row && row.parentElement.tagName.toLowerCase() === "tbody") {
            localOnRowClick({ inRowElement: row, inEvent: event });
        }
    });
};

export default bindSkeletonEvents;
