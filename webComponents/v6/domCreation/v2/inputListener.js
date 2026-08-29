const attachKeydownListener = ({ inElement }) => {
    const localElement = inElement;
    if (!localElement) return;

    localElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            const focusableElements = Array.from(
                document.querySelectorAll("input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])")
            );
            const currentIndex = focusableElements.indexOf(localElement);
            if (currentIndex >= 0 && currentIndex + 1 < focusableElements.length) {
                focusableElements[currentIndex + 1].focus();
            }
        }
    });
};

const attachKeypressListener = ({ inElement }) => {
    const localElement = inElement;
    if (!localElement) return;

    localElement.addEventListener("keypress", (e) => {
        console.log("aaaaaaaaaaaaa");

    });
};

export const attachInputListener = ({ inElement }) => {
    const localElement = inElement;
    if (!localElement) return;

    attachKeydownListener({ inElement: localElement });
    attachKeypressListener({ inElement: localElement });
};

export default attachInputListener;
