import { createColumn } from "./createColumn.js";

export const buildColumnsMap = ({ inRawHeaders, inRawColumns }) => {
    const localHeaders = Array.isArray(inRawHeaders) ? inRawHeaders : [];
    const localColumns = inRawColumns;

    const colMap = new Map();

    const processEntry = ({ inKey, inConfig }) => {
        const localKey = inKey;
        if (!localKey) return;
        const localConfig = (inConfig && typeof inConfig === "object") ? inConfig : {};
        const existing = colMap.get(localKey) || {};
        colMap.set(localKey, { ...existing, ...localConfig });
    };

    localHeaders.forEach(hKey => {
        if (typeof hKey === "string") {
            processEntry({ inKey: hKey, inConfig: {} });
        }
    });

    if (Array.isArray(localColumns)) {
        localColumns.forEach((colItem) => {
            if (typeof colItem === "string") {
                processEntry({ inKey: colItem, inConfig: {} });
            } else if (colItem && typeof colItem === "object") {
                if (colItem.key || colItem.field || colItem.name) {
                    const k = colItem.key || colItem.field || colItem.name;
                    processEntry({ inKey: k, inConfig: colItem });
                } else {
                    Object.entries(colItem).forEach(([k, v]) => {
                        processEntry({ inKey: k, inConfig: v });
                    });
                }
            }
        });
    } else if (localColumns && typeof localColumns === "object") {
        Object.entries(localColumns).forEach(([k, v]) => {
            processEntry({ inKey: k, inConfig: v });
        });
    }

    const keysOrder = localHeaders.length > 0
        ? Array.from(new Set([...localHeaders, ...colMap.keys()]))
        : Array.from(colMap.keys());

    return keysOrder.map((key, index) => {
        const config = colMap.get(key) || {};
        return createColumn({ inKey: key, inIndex: index, inConfig: config });
    });
};

export default buildColumnsMap;
