export const createColumn = ({ inKey, inIndex, inConfig }) => {
    const localKey = inKey;
    const localIndex = inIndex ?? 0;
    const localConfig = inConfig || {};

    const label = localConfig.label || localConfig.title || localConfig.name || localKey;

    return {
        key: localKey,
        label: label,
        isSortable: Boolean(localConfig.isSortable ?? localConfig.sortable ?? true),
        isVisible: Boolean(localConfig.isVisible ?? localConfig.visible ?? true),
        isSearchable: Boolean(localConfig.isSearchable ?? localConfig.searchable ?? true),
        type: localConfig.type || localConfig.controlType || "text",
        order: localConfig.order ?? localIndex,
        ...localConfig
    };
};

export default createColumn;
