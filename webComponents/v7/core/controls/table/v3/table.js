import domElementBuilder from "../../../../domCreation/v2/index.js";

export const createTable = ({ inTheadElement, inTbodyElement, inTfootElement }) => {
    const localTheadElement = inTheadElement;
    const localTbodyElement = inTbodyElement;
    const localTfootElement = inTfootElement;

    return domElementBuilder({
        inSpec: {
            tagName: "table",
            children: [localTheadElement, localTbodyElement, localTfootElement].filter(Boolean),
            attributes: {
                class: "w-full border-collapse border border-gray-300 my-4"
            }
        }
    });
};

export default createTable;
