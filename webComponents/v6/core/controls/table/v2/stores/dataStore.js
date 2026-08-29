export const createDataStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const rows = Array.isArray(localKsAttributes.rows) ? localKsAttributes.rows : [];

    return {
        originalData: rows,
        data: rows
    };
};

export default createDataStore;
