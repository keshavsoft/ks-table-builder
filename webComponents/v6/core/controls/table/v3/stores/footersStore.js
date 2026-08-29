export const createFootersStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const footers = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);

    return {
        footers: footers
    };
};

export default createFootersStore;
