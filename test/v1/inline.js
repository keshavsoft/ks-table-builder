const columns = ["Name", "Mobile"];
const inLineDivId = document.getElementById("inLineDivId");

// Create an array of column configurations (our schema)
const formSchema = columns.map(column => ({
    head: {
        isControl: true,
        text: column,
        theme: "default-better-focus",
        controlType: "label"
    },
    body: {
        isControl: true,
        value1: "body",
        theme: "default-better-focus",
        controlType: "input",
        "ks-enter-as-tab": true
    }
}));

// Instantiate the new parent composite
const form = document.createElement("ks-wrapper-base");

form.config = {
    head: {
        isControl: true,
        text: "Create New",
        theme: "dark-bold",
        controlType: "label"
    },
    body: {
        isWrapper: true,
        value1: "body",
        theme: "light-sm",
        controlType: "input",
        elements: formSchema
    },
    foot: {
        isArray: true,
        theme: "stacked",
        elements: [{
            isControl: true,
            text: "Save",
            controlType: "button",
            theme: "default-better-focus"
        }]
    },
    foot1: {
        isArray: true,
        theme: "inline",
        elements: [{
            isControl: true,
            text: "Save",
            controlType: "button",
            theme: "dark",
            class1: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        },
        {
            isControl: true,
            text: "Cancel",
            controlType: "button",
            theme: "dark",
            class1: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        }]
    }
};

form.setAttribute("ks-theme", "stacked");

inLineDivId.appendChild(form);