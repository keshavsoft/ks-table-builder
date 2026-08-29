import { buildColumnsMap } from "./buildColumnsMap.js";
import { getVisibleColumns } from "./getVisibleColumns.js";
import { getHeaders } from "./getHeaders.js";
import { getColumn } from "./getColumn.js";
import { setColumnVisibility } from "./setColumnVisibility.js";

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

    return {
        columns: columns,
        get headers() {
            return getHeaders({ inColumns: columns });
        },
        getVisibleColumns: () => getVisibleColumns({ inColumns: columns }),
        getColumn: ({ inKey }) => getColumn({ inColumns: columns, inKey: inKey }),
        setColumnVisibility: ({ inKey, inIsVisible }) => setColumnVisibility({ inColumns: columns, inKey: inKey, inIsVisible: inIsVisible })
    };
};

export default createColumnsStore;

