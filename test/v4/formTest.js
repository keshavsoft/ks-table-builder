import buildSpecElement from "../../webComponents/v7/domCreation/v2/buildSpecElement.js";
import formGodSpec from "../../webComponents/v7/core/controls/form/v2/formGodSpec.json" with { type: "json" };

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    const formElement = buildSpecElement(formGodSpec);
    if (formElement) {
        formContainer.appendChild(formElement);
    }
}
