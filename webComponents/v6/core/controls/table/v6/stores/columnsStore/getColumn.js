export const getColumn = ({ inColumns, inKey }) => {
    const localColumns = Array.isArray(inColumns) ? inColumns : [];
    const localKey = inKey;
    return localColumns.find(col => col.key === localKey) || null;
};

export default getColumn;
