import { renderSkeletonHtml, renderUserUI, hydrateFormData, bindSkeletonEvents } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // -------------------------------------------------------------
    // PHASE 1: Generate Raw HTML String Markup from God Spec
    // -------------------------------------------------------------
    const rawHtmlString = renderSkeletonHtml({});
    console.log("Generated Skeleton HTML String Markup:\n", rawHtmlString);

    // Inject HTML String Markup directly into page innerHTML!
    formContainer.innerHTML = rawHtmlString;

    // -------------------------------------------------------------
    // PHASE 2: Bind Events & Populate Controls into HTML Page DOM
    // -------------------------------------------------------------
    const formElement = formContainer.querySelector("form");

    // Bind Skeleton Events
    bindSkeletonEvents({
        inFormElement: formElement,
        inOnSubmit: ({ inFormData }) => {
            alert(`HTML String Flavor Form Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
        }
    });

    // Inject User Controls into the HTML-generated skeleton body slot
    renderUserUI({
        inTarget: "#formContainer",
        inFields: [
            { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
            { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
            { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
        ]
    });

    // Hydrate Initial Data Payload
    hydrateFormData({
        inTarget: "#formContainer",
        inData: {
            username: "Keshav",
            email: "keshav@example.com",
            phone: "+91 9876543210"
        }
    });
}
