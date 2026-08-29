const inLineDivId = document.getElementById("inLineDivId");

ksTable1 = document.createElement("ks-table-base");

ksTable1.config = {
    showSerial: true,
    isSearch: true,
    showHeader: true,
    showBody: true,
    showFooter: false,
    headers: ["StockItemName", "StockParentName", "Uom"],
    rows: [{
        "StockItemName": "0.09/30mm",
        "StockParentName": "FISH  KNITTED FABRIC",
        "Uom": "kgs"
    },
    {
        "StockItemName": "0.11-25",
        "StockParentName": "FISH  KNITTED FABRIC",
        "Uom": "kgs"
    }],
    columns: [
        {
            StockItemName: {
                controlType: "input",
                placeholder: "Enter Item Name",
                theme: "default-better-focus"
            },
            StockParentName: {
                controlType: "input",
                placeholder: "Enter Parent Name",
                theme: "default-better-focus",
                isVisible: false
            },
            Uom: {
                controlType: "input",
                placeholder: "Enter UOM",
                theme: "default-better-focus",
                "ks-enter-as-tab": true
            }
        }
    ],
    footers: [
        {
            StockItemName: {
                controlType: "input",
                placeholder: "Enter Item Name",
                theme: "default-better-focus"
            },
            StockParentName: {
                controlType: "input",
                placeholder: "Enter Parent Name",
                theme: "default-better-focus"
            },
            Uom: {
                controlType: "input",
                placeholder: "Enter UOM",
                theme: "default-better-focus",
                "ks-enter-as-tab": true
            }
        }
    ]
};

inLineDivId.appendChild(ksTable1);
