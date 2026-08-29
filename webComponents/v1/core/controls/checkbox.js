const COMMON_ATTRIBUTES = {
    "aria-described-by": "aria-describedby",
    "aria-label": "aria-label",
    "data-key": "data-key",
    "dir": "dir",
    "id": "id",
    "name": "name",
    "role": "role",
    "tab-index": "tabindex",
    "title": "title"
};

const CHECKBOX_ATTRIBUTES = {
    "form": "form",
    "value": "value"
};

const getCommonAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(COMMON_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    const className = localKsAttributes["class"] || localKsAttributes["class-name"] || localKsAttributes["className"];
    if (className) {
        localResult["class"] = className;
    }

    return localResult;
};

const getCheckboxAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(CHECKBOX_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    return localResult;
};

export const renderCheckbox = ({ inKsAttributes } = {}) => {
    const localKsAttributes = inKsAttributes || {};

    const localCommonAttrs = getCommonAttributes({ inKsAttributes: localKsAttributes });
    const localCheckboxAttrs = getCheckboxAttributes({ inKsAttributes: localKsAttributes });

    const isChecked = localKsAttributes["checked"] === true || localKsAttributes["checked"] === "true" || localKsAttributes["value"] === "true";

    return {
        tagName: "input",
        properties: {
            type: "checkbox",
            checked: isChecked,
            value: localKsAttributes["value"] || ""
        },
        attributes: { ...localCommonAttrs, ...localCheckboxAttrs },
        events: {}
    };
};

export default renderCheckbox;
