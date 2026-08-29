import domElementBuilder from "../../../../../domCreation/v2/index.js";

export const createTd = ({ inCellConfig }) => {
    const localCellConfig = inCellConfig;

    let cellContent = domElementBuilder({
        inSpec: {
            tagName: "input",
            attributes: {
                class: "w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none transition-all duration-200 hover:border-gray-400 focus:border-blue-600 focus:ring-8 focus:ring-blue-300/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.25),0_0_25px_rgba(37,99,235,0.45)]"
            }
        }
    });

    return domElementBuilder({
        inSpec: {
            tagName: "td",
            children: cellContent ? [cellContent] : [],
            attributes: {
                class: "border border-gray-300 px-4 py-2 bg-gray-50"
            }
        }
    });
};

export default createTd;
