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

const LABEL_ATTRIBUTES = {
    "for": "for"
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

const getLabelAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(LABEL_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName] ?? localKsAttributes["htmlFor"];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    return localResult;
};

const renderLabel = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const localCommonAttrs = getCommonAttributes({ inKsAttributes: localKsAttributes });
    const localLabelAttrs = getLabelAttributes({ inKsAttributes: localKsAttributes });

    return {
        tagName: "label",
        textContent: localKsAttributes["text"] || localKsAttributes["labelText"] || "",
        attributes: { ...localCommonAttrs, ...localLabelAttrs },
        events: {}
    };
};

export default renderLabel;
