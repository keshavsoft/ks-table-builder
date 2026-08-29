import { buildUiData } from "./buildUiData.js";

export const resetData = ({ inOriginalData, inUiOptions }) => {
    const localOriginalData = Array.isArray(inOriginalData) ? inOriginalData : [];
    const activeData = [...localOriginalData];
    const currentUiData = buildUiData({ inRows: activeData, inOptions: inUiOptions });
    return { activeData, currentUiData };
};

export default resetData;
