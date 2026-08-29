import { buildUiData } from "./buildUiData.js";

export const createDataStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const rawRows = Array.isArray(localKsAttributes.rows)
        ? localKsAttributes.rows
        : (Array.isArray(localKsAttributes.data) ? localKsAttributes.data : []);

    const showSerial = Boolean(localKsAttributes.showSerial ?? localKsAttributes.isSerial ?? localKsAttributes.showSNo ?? false);
    const originalData = [...rawRows];
    let activeData = [...rawRows];

    let currentUiData = buildUiData({
        inRows: activeData,
        inOptions: localKsAttributes.uiOptions
    });

    return {
        originalData: originalData,
        get data() {
            return showSerial ? currentUiData : activeData;
        },
        set data(inNewData) {
            const localNewData = Array.isArray(inNewData) ? inNewData : [];
            activeData = localNewData;
            currentUiData = buildUiData({
                inRows: activeData,
                inOptions: localKsAttributes.uiOptions
            });
        },
        get uiData() {
            return currentUiData;
        },
        refreshUiData: ({ inOptions }) => {
            const localOptions = inOptions;
            currentUiData = buildUiData({
                inRows: activeData,
                inOptions: localOptions || localKsAttributes.uiOptions
            });
            return currentUiData;
        },
        resetData: () => {
            activeData = [...originalData];
            currentUiData = buildUiData({
                inRows: activeData,
                inOptions: localKsAttributes.uiOptions
            });
        }
    };
};

export default createDataStore;
