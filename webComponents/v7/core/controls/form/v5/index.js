import buildSpecElement from "../../../../domCreation/v2/buildSpecElement.js";
import formGodSpec from "./formGodSpec.json" with { type: "json" };

/**
 * Builds a single input row spec (Label + Input) for a given field definition
 */
export const buildRowSpec = ({ inField }) => {
    const localField = inField || {};
    const fieldName = localField.name || "";
    const fieldLabel = localField.label || fieldName;
    const fieldType = localField.type || "text";
    const placeholder = localField.placeholder || `Enter ${fieldLabel.toLowerCase()}`;

    return {
        tagName: "div",
        attributes: {
            class: "form-group flex flex-col space-y-1"
        },
        children: [
            {
                tagName: "label",
                attributes: {
                    class: "block text-sm font-medium text-gray-700",
                    for: fieldName
                },
                textContent: fieldLabel
            },
            {
                tagName: "input",
                attributes: {
                    type: fieldType,
                    id: fieldName,
                    name: fieldName,
                    placeholder: placeholder,
                    class: "border border-gray-300 bg-white rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
            }
        ]
    };
};

/**
 * Recursively traverses a spec node tree to find slot === inSlotName and injects content specs
 */
export const injectSlotContent = ({ inSpecNode, inSlotName, inContentSpecs }) => {
    const localSpecNode = inSpecNode;
    const localSlotName = inSlotName;
    const localContentSpecs = inContentSpecs || [];

    if (!localSpecNode || typeof localSpecNode !== "object") return;

    if (localSpecNode.slot === localSlotName) {
        localSpecNode.children = localContentSpecs;
        return;
    }

    if (Array.isArray(localSpecNode.children)) {
        localSpecNode.children.forEach(child => {
            injectSlotContent({
                inSpecNode: child,
                inSlotName: localSlotName,
                inContentSpecs: localContentSpecs
            });
        });
    }
};

/**
 * Assembles the full God Spec JSON by combining the Template Shell with dynamic Field Specs
 */
export const assembleFormSpec = ({ inTemplateSpec, inFields }) => {
    const localTemplateSpec = inTemplateSpec || formGodSpec;
    const localFields = inFields || [];

    // 1. Deep clone template shell
    const assembledSpec = JSON.parse(JSON.stringify(localTemplateSpec));

    // 2. Build row specs for each field
    const rowSpecs = localFields.map(field => buildRowSpec({ inField: field }));

    // 3. Inject row specs into slot="body"
    injectSlotContent({
        inSpecNode: assembledSpec,
        inSlotName: "body",
        inContentSpecs: rowSpecs
    });

    return assembledSpec;
};

/**
 * Step 1: UI Render (Assembles Spec, Builds DOM, & Binds Events)
 */
export const renderFormUI = ({ inSpec, inFields, inOnSubmit }) => {
    const localSpec = inSpec || formGodSpec;
    const localFields = inFields || [];
    const localOnSubmit = inOnSubmit;

    // 1. Assemble dynamic God Spec JSON using slot="body"
    const finalSpec = assembleFormSpec({
        inTemplateSpec: localSpec,
        inFields: localFields
    });

    // 2. Build DOM Tree
    const formElement = buildSpecElement(finalSpec);

    // 3. Bind Submit Event Hook (Step 3)
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
 * Step 2: Data Hydration (Injects values into existing input elements)
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
 * Utility: Extract Data Object from Form DOM
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
 * Main Controller: Orchestrates Assembly, Rendering, Hydration, and Events
 */
export const renderForm = ({ inFields, inData, inOnSubmit }) => {
    const localFields = inFields || [];
    const localData = inData || {};
    const localOnSubmit = inOnSubmit;

    // 1. Assemble & Render UI
    const formElement = renderFormUI({
        inSpec: formGodSpec,
        inFields: localFields,
        inOnSubmit: localOnSubmit
    });

    // 2. Hydrate Data
    if (Object.keys(localData).length > 0) {
        hydrateFormData({
            inFormElement: formElement,
            inData: localData
        });
    }

    return formElement;
};

export default renderForm;
