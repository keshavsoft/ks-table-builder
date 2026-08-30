import { renderForm } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // 1. Dynamic Field Definitions (Assembled into slot="body")
    const fieldsConfig = [
        { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
        { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
    ];

    // 2. Data Payload for Hydration Layer
    const initialData = {
        username: "Keshav",
        email: "keshav@example.com",
        phone: "+91 9876543210"
    };

    // 3. Event Callback Hook
    const handleSubmit = ({ inFormData }) => {
        console.log("Form v6 Orchestrated Data:", inFormData);
        alert(`Form v6 (Orchestration Story) Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
    };

    // Execute Pure Orchestrator
    const formElement = renderForm({
        inFields: fieldsConfig,
        inData1: initialData,
        inOnSubmit: handleSubmit
    });

    if (formElement) {
        formContainer.appendChild(formElement);
    }
}
