export const getVisibleColumns = ({ inColumns }) => {
    const localColumns = Array.isArray(inColumns) ? inColumns : [];
    return localColumns.filter(col => col.isVisible);
};

export default getVisibleColumns;
