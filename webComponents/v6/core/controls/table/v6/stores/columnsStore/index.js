import { buildColumnsMap } from "./buildColumnsMap.js";

export const createColumnsStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const rawHeaders = localKsAttributes.headers;
    const rawColumns = localKsAttributes.columns;
    const showSerial = Boolean(localKsAttributes.showSerial ?? localKsAttributes.isSerial ?? localKsAttributes.showSNo ?? false);

    const columns = buildColumnsMap({
        inRawHeaders: rawHeaders,
        inRawColumns: rawColumns,
        inShowSerial: showSerial
    });

    const getVisibleColumns = () => columns.filter(col => col.isVisible);
    const getHeaders = () => getVisibleColumns().map(col => col.key);

    return {
        columns: columns,
        get headers() {
            return getHeaders();
        },
        getVisibleColumns: getVisibleColumns,
        getColumn: ({ inKey }) => {
            const localKey = inKey;
            return columns.find(col => col.key === localKey) || null;
        },
        setColumnVisibility: ({ inKey, inIsVisible }) => {
            const localKey = inKey;
            const localIsVisible = Boolean(inIsVisible);
            const targetCol = columns.find(col => col.key === localKey);
            if (targetCol) {
                targetCol.isVisible = localIsVisible;
            }
        }
    };
};

export default createColumnsStore;
