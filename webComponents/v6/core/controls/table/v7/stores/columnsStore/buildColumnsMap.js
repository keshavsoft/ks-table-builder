import { createColumn } from "./createColumn.js";

export const buildColumnsMap = ({ inRawHeaders, inRawColumns, inShowSerial }) => {
    const localHeaders = Array.isArray(inRawHeaders) ? inRawHeaders : [];
    const localColumns = inRawColumns;
    const localShowSerial = Boolean(inShowSerial);

    const colMap = new Map();

    if (localShowSerial) {
        colMap.set("sNo", {
            key: "sNo",
            label: "#",
            isSortable: false,
            isVisible: true,
            isSearchable: false,
            type: "serial",
            order: -1
        });
    }

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

    let keysOrder = Array.from(colMap.keys());
    if (localShowSerial && !keysOrder.includes("sNo")) {
        keysOrder = ["sNo", ...keysOrder];
    } else if (localShowSerial && keysOrder.includes("sNo")) {
        keysOrder = ["sNo", ...keysOrder.filter(k => k !== "sNo")];
    }

    return keysOrder.map((key, index) => {
        const config = colMap.get(key) || {};
        return createColumn({ inKey: key, inIndex: index, inConfig: config });
    });
};

export default buildColumnsMap;
