export const createColumnsStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const headers = Array.isArray(localKsAttributes.headers) ? localKsAttributes.headers : [];

    return {
        headers: headers
    };
};

export default createColumnsStore;
