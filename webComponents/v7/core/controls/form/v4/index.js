import buildSpecElement from "../../../../domCreation/v2/buildSpecElement.js";
import formGodSpec from "./formGodSpec.json" with { type: "json" };

/**
 * Step 1: UI Render (Builds the DOM Skeleton & attaches event hooks)
 */
export const renderFormUI = ({ inSpec, inOnSubmit }) => {
    const localSpec = inSpec || formGodSpec;
    const localOnSubmit = inOnSubmit;

    // 1. Construct DOM Element Tree from static God Spec
    const formElement = buildSpecElement(localSpec);

    // 2. Bind Event Listener / Hook (Step 3 event binding)
    if (formElement && typeof localOnSubmit === "function") {
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = extractFormData({ inFormElement: formElement });
            localOnSubmit({ inFormData: formData, inEvent: event });
        });
    }

    return formElement;
};

/**
 * Step 2: Data Hydration (Injects data payload into existing DOM inputs)
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

/**
 * Utility: Extract Data from Form DOM
 */
export const extractFormData = ({ inFormElement }) => {
    const localFormElement = inFormElement;
    if (!localFormElement) return {};

    const formDataObj = {};
    const inputs = localFormElement.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        if (input.name) {
            formDataObj[input.name] = input.value;
        }
    });
    return formDataObj;
};

/**
 * Main Controller: Orchestrates the 3-Step Lifecycle
 */
export const renderForm = ({ inData, inOnSubmit }) => {
    const localData = inData || {};
    const localOnSubmit = inOnSubmit;

    // Step 1: UI Render & Event Hooking
    const formElement = renderFormUI({
        inSpec: formGodSpec,
        inOnSubmit: localOnSubmit
    });

    // Step 2: Data Hydration
    if (Object.keys(localData).length > 0) {
        hydrateFormData({
            inFormElement: formElement,
            inData: localData
        });
    }

    return formElement;
};

export default renderForm;
