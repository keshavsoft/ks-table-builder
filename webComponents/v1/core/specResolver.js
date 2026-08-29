import renderButton from "./controls/button.js";
import renderCheckbox from "./controls/checkbox.js";
import renderInput from "./controls/input.js";
import renderLabel from "./controls/label.js";
import renderTable from "./controls/table.js";

import domElementBuilder from "../domCreation/v1/index.js";
import themes from "./themes.json" with { type: "json" };

const controlRenderers = {
    button: renderButton,
    checkbox: renderCheckbox,
    input: renderInput,
    label: renderLabel,
    table: renderTable
};

const NON_CHILD_KEYS = new Set([
    "theme",
    "layout",
    "isControl",
    "is3Part",
    "is3Part1",
    "isArray",
    "isWrapper",
    "controlType",
    "control-type",
    "type",
    "className",
    "class",
    "text",
    "value",
    "headers",
    "rows"
]);

const renderLeafControl = ({ inConfig, inFallbackControlType }) => {
    const localConfig = inConfig || {};
    const controlType = localConfig["control-type"] || localConfig["controlType"] || inFallbackControlType || "input";
    const renderer = controlRenderers[controlType] || renderInput;

    if (controlType === "table") {
        return renderer({ inKsAttributes: localConfig });
    }

    const spec = renderer({ inKsAttributes: localConfig });
    const themeName = localConfig["theme"] || "default";
    const themeClasses = themes[themeName]?.[controlType];

    return domElementBuilder({
        inSpec: spec,
        inControlType: controlType,
        inThemeName: themeName,
        inClassList: themeClasses
    });
};

const renderArrayContainer = ({ inArray, inConfig }) => {
    const localArray = inArray || [];
    const localConfig = inConfig || {};

    const children = localArray.map(childConfig => {
        return resolveSpec({ inConfig: childConfig });
    }).filter(Boolean);

    const layout = localConfig.layout || "horizontal";
    const layoutClass = layout === "vertical" ? "flex flex-col w-full gap-2" : "flex flex-row items-center gap-2 w-full";

    return domElementBuilder({
        inSpec: {
            tagName: "div",
            children: children
        },
        inClassList: layoutClass
    });
};

const renderObjectContainer = ({ inConfig }) => {
    const localConfig = inConfig || {};

    const childKeys = Object.keys(localConfig).filter(k => !NON_CHILD_KEYS.has(k) && typeof localConfig[k] === "object" && localConfig[k] !== null);

    if (childKeys.length === 0) {
        return null;
    }

    const children = childKeys.map(key => {
        const childConfig = localConfig[key];
        const inferredControlType = controlRenderers[key.toLowerCase()] ? key.toLowerCase() : undefined;
        return resolveSpec({ inConfig: childConfig, inKey: key, inInferredType: inferredControlType });
    }).filter(Boolean);

    const layout = localConfig.layout || "horizontal";
    const layoutClass = layout === "vertical" ? "flex flex-col w-full gap-2" : "flex flex-row items-center gap-2 w-full";

    return domElementBuilder({
        inSpec: {
            tagName: "div",
            children: children
        },
        inClassList: layoutClass
    });
};

export const resolveSpec = ({ inConfig, inKey, inInferredType }) => {
    const localConfig = inConfig || {};

    // 1. Array resolution
    if (Array.isArray(localConfig)) {
        return renderArrayContainer({ inArray: localConfig });
    }

    if (localConfig.isArray && Array.isArray(localConfig.elements)) {
        return renderArrayContainer({ inArray: localConfig.elements, inConfig: localConfig });
    }

    if (localConfig.elements && Array.isArray(localConfig.elements)) {
        return renderArrayContainer({ inArray: localConfig.elements, inConfig: localConfig });
    }

    // 2. Leaf Control / Table resolution
    const controlType = localConfig["control-type"] || localConfig["controlType"] || localConfig["type"] || inInferredType;
    if (localConfig.isControl || (controlType && controlRenderers[controlType])) {
        return renderLeafControl({ inConfig: localConfig, inFallbackControlType: controlType });
    }

    // 3. Object Container / Key-Value Pair resolution
    if (typeof localConfig === "object" && localConfig !== null) {
        const objectContainer = renderObjectContainer({ inConfig: localConfig });
        if (objectContainer) {
            return objectContainer;
        }

        // Fallback for single control node
        if (localConfig.text || localConfig.value || localConfig.theme || controlType) {
            return renderLeafControl({ inConfig: localConfig, inFallbackControlType: controlType });
        }
    }

    return null;
};

export default resolveSpec;

