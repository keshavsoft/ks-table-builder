const inLineDivId = document.getElementById("inLineDivId");

// HTML Table Control Example with 2 columns: Name and Mobile
const table = document.createElement("ks-table-base");

table.config = {
    headers: ["Name", "Mobile"],
    rows: [
        {
            Name: {
                controlType: "input",
                placeholder: "Enter Name",
                theme: "default-better-focus"
            },
            Mobile: {
                controlType: "input",
                type: "tel",
                placeholder: "Enter Mobile Number",
                theme: "default-better-focus",
                "ks-enter-as-tab": true
            }
        }
    ]
};

inLineDivId.appendChild(table);