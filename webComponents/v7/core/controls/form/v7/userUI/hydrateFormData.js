/**
 * User UI Layer: Hydrates initial data values into user input controls
 */
export const hydrateFormData = ({ inFormElement, inData }) => {
    const localFormElement = inFormElement;
    const localData = inData || {};

    if (!localFormElement) return;

    Object.entries(localData).forEach(([fieldName, val]) => {
        const inputElem = localFormElement.querySelector(`[name="${fieldName}"]`);
        if (inputElem) {
            inputElem.value = val;
        }
    });
};

export default hydrateFormData;
