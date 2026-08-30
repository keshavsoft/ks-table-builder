import { renderSkeleton, renderUserUI, hydrateFormData, bindSkeletonEvents } from "../../webComponents/v7/core/controls/form/v7/index.js";

const formContainer = document.getElementById("formContainer");

if (formContainer) {
    // -------------------------------------------------------------
    // PHASE 1: Render & Mount Structural Skeleton Layout to Page
    // -------------------------------------------------------------
    const skeletonElement = renderSkeleton({});

    // Bind Submit Event Hook onto the Skeleton
    bindSkeletonEvents({
        inFormElement: skeletonElement,
        inOnSubmit: ({ inFormData }) => {
            console.log("Flavor 2 (2-Phase Async Mount) Submitted Data:", inFormData);
            alert(`Flavor 2 (2-Phase Async Mount) Submitted!\n\n${JSON.stringify(inFormData, null, 2)}`);
        }
    });

    // Mount Skeleton Shell to Page DOM
    formContainer.appendChild(skeletonElement);

    // -------------------------------------------------------------
    // PHASE 2: (Async API Simulation) Populate User Controls into Mounted Page DOM
    // -------------------------------------------------------------
    setTimeout(() => {
        const dynamicFields = [
            { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
            { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
            { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }
        ];

        // Inject User Controls directly into the live Mounted Skeleton on Page DOM!
        renderUserUI({
            inTarget: "#formContainer",
            inFields: dynamicFields
        });

        // Hydrate Data Payload into the live Mounted Page DOM!
        hydrateFormData({
            inTarget: "#formContainer",
            inData: {
                username: "Keshav",
                email: "keshav@example.com",
                phone: "+91 9876543210"
            }
        });
    }, 800); // Simulated 800ms API fetch delay
}
