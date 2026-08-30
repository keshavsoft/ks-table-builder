import { renderForm } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // Dynamic User Controls Configuration
    const fieldsConfig = [
        { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
        { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
    ];

    // Initial Data Payload
    const initialData = {
        username: "Keshav",
        email: "keshav@example.com",
        phone: "+91 9876543210"
    };

    // Event Callback Hook
    const handleSubmit = ({ inFormData }) => {
        console.log("Flavor 1 (One-Time Creation) Submitted Data:", inFormData);
        alert(`Flavor 1 (One-Time Creation) Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
    };

    // Flavor 1: One-time creation and render via renderForm
    const formElement = renderForm({
        inFields: fieldsConfig,
        inData: initialData,
        inOnSubmit: handleSubmit
    });

    if (formElement) {
        formContainer.appendChild(formElement);
    }
}
