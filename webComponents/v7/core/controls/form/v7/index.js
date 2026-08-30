import renderFormUI from "./render/renderFormUI.js";
import hydrateFormData from "./data/hydrateFormData.js";
import extractFormData from "./data/extractFormData.js";
import assembleFormSpec from "./assembly/assembleFormSpec.js";

/**
 * Form v6 Pure Orchestrator
 * Connects Assembly, UI Render, Data Hydration, and Event Hooks
 */
export const renderForm = ({ inSpec, inFields, inData, inOnSubmit }) => {
    const localSpec = inSpec;
    const localFields = inFields || [];
    const localData = inData || {};
    const localOnSubmit = inOnSubmit;

    // Step 1: UI Render & Event Hooking
    const formElement = renderFormUI({
        inSpec: localSpec,
        inFields: localFields,
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

// Re-export sub-module layers for fine-grained orchestration
export {
    assembleFormSpec,
    renderFormUI,
    hydrateFormData,
    extractFormData
};

export default renderForm;
