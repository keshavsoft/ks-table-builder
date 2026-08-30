import { renderSkeletonHtml, renderUserUI, hydrateFormData, bindSkeletonEvents } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // Generate Raw HTML String Markup
    const rawHtmlString = renderSkeletonHtml({});

    // Inject raw HTML String into page DOM
    formContainer.innerHTML = rawHtmlString;

    // Hook Events & Controls into HTML-generated page DOM
    const formElement = formContainer.querySelector("form");
    bindSkeletonEvents({
        inFormElement: formElement,
        inOnSubmit: ({ inFormData }) => {
            alert(`HTML String Form Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
        }
    });

    renderUserUI({
        inTarget: "#formContainer",
        inFields: [
            { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
            { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
            { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
        ]
    });

    hydrateFormData({
        inTarget: "#formContainer",
        inData: {
            username: "Keshav",
            email: "keshav@example.com",
            phone: "+91 9876543210"
        }
    });
}
