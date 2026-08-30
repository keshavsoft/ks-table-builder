export const setColumnVisibility = ({ inColumns, inKey, inIsVisible }) => {
    const localColumns = Array.isArray(inColumns) ? inColumns : [];
    const localKey = inKey;
    const localIsVisible = Boolean(inIsVisible);
    const targetCol = localColumns.find(col => col.key === localKey);
    if (targetCol) {
        targetCol.isVisible = localIsVisible;
    }
};

export default setColumnVisibility;
