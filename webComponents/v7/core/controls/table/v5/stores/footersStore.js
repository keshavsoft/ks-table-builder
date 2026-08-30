export const createFootersStore = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const rawFooters = Array.isArray(localKsAttributes.footers)
        ? localKsAttributes.footers
        : (localKsAttributes.footer ? [localKsAttributes.footer] : []);

    const footers = rawFooters.map(footerRow => {
        if (footerRow && typeof footerRow === "object") {
            return { ...footerRow };
        }
        return {};
    });

    const getFooterForColumn = ({ inKey, inRowIndex }) => {
        const localKey = inKey;
        const localRowIndex = inRowIndex ?? 0;
        const footerRow = footers[localRowIndex];
        if (!footerRow) return null;
        return footerRow[localKey] || null;
    };

    return {
        footers: footers,
        hasFooters: () => footers.length > 0,
        getFooterForColumn: getFooterForColumn
    };
};

export default createFootersStore;

