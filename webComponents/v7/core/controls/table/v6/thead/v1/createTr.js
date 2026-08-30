import domElementBuilder from "../../../../../../domCreation/v2/index.js";

export const createTr = ({ inThChildren }) => {
    const localThChildren = Array.isArray(inThChildren) ? inThChildren : [];

    return domElementBuilder({
        inSpec: {
            tagName: "tr",
            children: localThChildren
        }
    });
};

export default createTr;
