import { getRawRows } from "./getRawRows.js";
import { buildUiData } from "./buildUiData.js";
import { refreshUiData } from "./refreshUiData.js";
import { resetData } from "./resetData.js";

const createRowsWithConfig = ({ inRows }) => {
    const rowsWithConfig = inRows?.map(element => {
        let tdChildren = [];
        for (const [key, value] of Object.entries(element)) {
            tdChildren.push({
                tagName: "td",
                textContent: value,
                attributes: {
                    class: "border border-gray-300 px-4 py-2 text-sm text-gray-800"
                }
            });
        };

        return {
            tagName: "tr",
            children: tdChildren
        }
    });

    return rowsWithConfig;
};

export const createDataStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const rawRows = getRawRows({ inKsAttributes: localKsAttributes });
    const showSerial = Boolean(localKsAttributes.showSerial ?? localKsAttributes.isSerial ?? localKsAttributes.showSNo ?? false);

    const originalData = [...rawRows];
    let activeData = [...rawRows];
    let currentUiData = buildUiData({ inRows: activeData, inOptions: localKsAttributes.uiOptions });
    const rowsWithConfig = createRowsWithConfig({ inRows: activeData });

    return {
        originalData: originalData,
        get dataWithConfig() {
            return rowsWithConfig ? rowsWithConfig : [];
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

