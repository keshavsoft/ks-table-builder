import { getRawRows } from "./getRawRows.js";
import { buildUiData } from "./buildUiData.js";
import { refreshUiData } from "./refreshUiData.js";
import { resetData } from "./resetData.js";
import { createBodyWithConfig } from "./createBodyWithConfig.js";

export const createDataStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const rawRows = getRawRows({ inKsAttributes: localKsAttributes });
    const showSerial = Boolean(localKsAttributes.showSerial ?? localKsAttributes.isSerial ?? localKsAttributes.showSNo ?? false);

    const originalData = [...rawRows];
    let activeData = [...rawRows];
    let currentUiData = buildUiData({ inRows: activeData, inOptions: localKsAttributes.uiOptions });

    return {
        originalData: originalData,
        get dataWithConfig() {
            return createBodyWithConfig({ inRows: showSerial ? currentUiData : activeData });
        },
        get data() {
            return showSerial ? currentUiData : activeData;
        },
        set data(inNewData) {
            activeData = Array.isArray(inNewData) ? inNewData : [];
            currentUiData = buildUiData({ inRows: activeData, inOptions: localKsAttributes.uiOptions });
        },
        get uiData() {
            return currentUiData;
        },
        refreshUiData: ({ inOptions }) => {
            currentUiData = refreshUiData({
                inActiveData: activeData,
                inOptions: inOptions,
                inDefaultOptions: localKsAttributes.uiOptions
            });
            return currentUiData;
        },
        resetData: () => {
            const res = resetData({ inOriginalData: originalData, inUiOptions: localKsAttributes.uiOptions });
            activeData = res.activeData;
            currentUiData = res.currentUiData;
        }
    };
};

export default createDataStore;

