import { renderForm } from "../../webComponents/v7/core/controls/form/v5/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // Sample Data Payload for Step 2 (Hydration)
    const initialData = {
        username: "Keshav",
        email: "keshav@example.com"
    };

    // Step 3 Event Callback (Submit Hook)
    const handleSubmit = ({ inFormData }) => {
        console.log("Form Submitted with Data:", inFormData);
        alert(`Form Submitted!\nData: ${JSON.stringify(inFormData, null, 2)}`);
    };

    // Execute 3-Step Lifecycle Controller
    const formElement = renderForm({
        inData: initialData,
        inOnSubmit: handleSubmit
    });

    if (formElement) {
        formContainer.appendChild(formElement);
    }
}
