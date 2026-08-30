import { renderSkeleton, renderUserUI, hydrateFormData, bindSkeletonEvents } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // PHASE 1: Render & Mount Skeleton Shell
    const skeletonElement = renderSkeleton({});

    bindSkeletonEvents({
        inFormElement: skeletonElement,
        inOnSubmit: ({ inFormData }) => {
            alert(`2-Phase Form Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
        }
    });

    formContainer.appendChild(skeletonElement);

    // PHASE 2: Async Population of User Controls into Mounted Page DOM
    setTimeout(() => {
        const dynamicFields = [
            { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
            { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
            { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
        ];

        renderUserUI({
            inTarget: "#formContainer",
            inFields: dynamicFields
        });

        hydrateFormData({
            inTarget: "#formContainer",
            inData: {
                username: "Keshav",
                email: "keshav@example.com",
                phone: "+91 9876543210"
            }
        });
    }, 600);
}
