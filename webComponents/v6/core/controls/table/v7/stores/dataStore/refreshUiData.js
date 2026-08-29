import { buildUiData } from "./buildUiData.js";

export const refreshUiData = ({ inActiveData, inOptions, inDefaultOptions }) => {
    const localActiveData = Array.isArray(inActiveData) ? inActiveData : [];
    const localOptions = inOptions || inDefaultOptions;
    return buildUiData({ inRows: localActiveData, inOptions: localOptions });
};

export default refreshUiData;
