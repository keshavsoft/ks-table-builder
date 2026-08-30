export const getRawRows = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    if (Array.isArray(localKsAttributes.rows)) return localKsAttributes.rows;
    if (Array.isArray(localKsAttributes.data)) return localKsAttributes.data;
    return [];
};

export default getRawRows;
