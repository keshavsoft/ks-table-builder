const inLineDivId = document.getElementById("inLineDivId");

fetch("./StockItems.json")
    .then(res => res.json())
    .then(stockData => {
        const table = document.createElement("ks-table-base");

        // Display sample stock items in rows
        const sampleRows = stockData.slice(0, 105);

        table.config = {
            isSearch: true,
            showFooter: false,
            headers: ["StockItemName", "StockParentName", "StockCategory", "StockBaseUnits", "Uom"],
            rows: sampleRows,
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
                    StockCategory: {
                        controlType: "input",
                        placeholder: "Enter Category",
                        theme: "default-better-focus"
                    },
                    StockBaseUnits: {
                        controlType: "input",
                        placeholder: "Enter Base Units",
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

        inLineDivId.appendChild(table);
    })
    .catch(err => {
        console.error("Error loading StockItems.json:", err);
    });
