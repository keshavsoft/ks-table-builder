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

const BUTTON_ATTRIBUTES = {
    "form": "form",
    "type": "type",
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

const getButtonAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(BUTTON_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    return localResult;
};

const getEvents = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localEvents = {};

    localEvents["click"] = (event) => {
        console.log("Button clicked event : ", event);
    };

    return localEvents;
};

export const renderButton = ({ inKsAttributes } = {}) => {
    const localKsAttributes = inKsAttributes || {};

    const localCommonAttrs = getCommonAttributes({ inKsAttributes: localKsAttributes });
    const localButtonAttrs = getButtonAttributes({ inKsAttributes: localKsAttributes });
    const localEvents = getEvents({ inKsAttributes: localKsAttributes });

    return {
        tagName: "button",
        textContent: localKsAttributes["text"] || localKsAttributes["labelText"] || "",
        properties: {
            disabled: localKsAttributes["disabled"] === true || localKsAttributes["disabled"] === "true"
        },
        attributes: { ...localCommonAttrs, ...localButtonAttrs },
        events: localEvents
    };
};

export default renderButton;
