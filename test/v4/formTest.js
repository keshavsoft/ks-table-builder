import { renderForm } from "../../webComponents/v7/core/controls/form/v5/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // 1. Dynamic Field Definitions (Injected into "slot": "body")
    const fieldsConfig = [
        { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
        { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
    ];

    // 2. Data Payload for Step 2 (Hydration)
    const initialData = {
        username: "Keshav",
        email: "keshav@example.com",
        phone: "+91 9876543210"
    };

    // 3. Event Callback for Step 3 (Submit Hook)
    const handleSubmit = ({ inFormData }) => {
        console.log("Form v4 Submitted Data:", inFormData);
        alert(`Form v4 (Slot Injection) Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
    };

    // Render Form v4 (Slot-Injected Assembly)
    const formElement = renderForm({
        inFields: fieldsConfig,
        inData: initialData,
        inOnSubmit: handleSubmit
    });

    if (formElement) {
        formContainer.appendChild(formElement);
    }
}
