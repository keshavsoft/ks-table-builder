import { createUiRow } from "./createUiRow.js";

export const buildUiData = ({ inRows, inOptions }) => {
    const localRows = Array.isArray(inRows) ? inRows : [];
    const localOptions = inOptions || {};

    return localRows.map((row, idx) => createUiRow({
        inRow: row,
        inIndex: idx,
        inOptions: localOptions
    }));
};

export default buildUiData;
