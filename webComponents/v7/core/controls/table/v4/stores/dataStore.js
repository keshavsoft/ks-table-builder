export const createDataStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const rawRows = Array.isArray(localKsAttributes.rows)
        ? localKsAttributes.rows
        : (Array.isArray(localKsAttributes.data) ? localKsAttributes.data : []);

    const originalData = [...rawRows];
    let activeData = [...rawRows];

    const createUiRow = ({ inRow, inIndex, inOptions }) => {
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

    const buildUiData = ({ inRows, inOptions }) => {
        const localRows = Array.isArray(inRows) ? inRows : activeData;
        const localOptions = inOptions || localKsAttributes.uiOptions || {};

        return localRows.map((row, idx) => createUiRow({
            inRow: row,
            inIndex: idx,
            inOptions: localOptions
        }));
    };

    let currentUiData = buildUiData({ inRows: activeData });

    return {
        originalData: originalData,
        get data() {
            return activeData;
        },
        set data(inNewData) {
            const localNewData = Array.isArray(inNewData) ? inNewData : [];
            activeData = localNewData;
            currentUiData = buildUiData({ inRows: activeData });
        },
        get uiData() {
            return currentUiData;
        },
        refreshUiData: ({ inOptions }) => {
            const localOptions = inOptions;
            currentUiData = buildUiData({ inRows: activeData, inOptions: localOptions });
            return currentUiData;
        },
        resetData: () => {
            activeData = [...originalData];
            currentUiData = buildUiData({ inRows: activeData });
        }
    };
};

export default createDataStore;

