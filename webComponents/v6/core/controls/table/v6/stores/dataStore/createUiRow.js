export const createUiRow = ({ inRow, inIndex, inOptions }) => {
    const localRow = inRow || {};
    const localIndex = inIndex;
    const localOptions = inOptions || {};

    const serialKey = localOptions.serialKey || "sNo";
    const includeSerial = localOptions.includeSerial ?? true;

    const uiRow = { ...localRow };

    if (includeSerial) {
        uiRow[serialKey] = localIndex + 1;
    }

    if (localOptions.optionsConfig) {
        const optionsKey = localOptions.optionsKey || "options";
        uiRow[optionsKey] = localOptions.optionsConfig;
    }

    return uiRow;
};

export default createUiRow;
