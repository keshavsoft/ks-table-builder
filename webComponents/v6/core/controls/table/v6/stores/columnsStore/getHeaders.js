import { getVisibleColumns } from "./getVisibleColumns.js";

export const getHeaders = ({ inColumns }) => {
    const localColumns = Array.isArray(inColumns) ? inColumns : [];
    return getVisibleColumns({ inColumns: localColumns }).map(col => col.key);
};

export default getHeaders;
