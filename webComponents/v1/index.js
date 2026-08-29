import { registerComponent } from "./core/componentRegister.js";
import pullAttributes from "./core/pullAttributes.js";
import resolveSpec from "./core/specResolver.js";

// 1. Cell Custom Element (ks-cell-base)
class KsTableCellContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const finalConfig = pullAttributes(this);
        const controlElement = resolveSpec({ inConfig: finalConfig });

        if (controlElement) {
            this.replaceChildren(controlElement);
        }

        return finalConfig;
    }
}

// 2. Wrapper Custom Element (ks-wrapper-base)
class KsWrapperForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const finalConfig = pullAttributes(this);
        const wrapperElement = resolveSpec({ inConfig: finalConfig });
        // console.log("finalConfig : ", finalConfig);

        if (wrapperElement) {
            this.replaceChildren(wrapperElement);
        }

        return finalConfig;
    }
}

// Register Web Components under v20
registerComponent({
    inComponentClass: KsTableCellContent,
    inTagName: "ks-cell-base",
    inVersion: "v21",
    inNamespaceKey: "classes"
});

registerComponent({
    inComponentClass: KsWrapperForm,
    inTagName: "ks-wrapper-base",
    inVersion: "v21",
    inNamespaceKey: "composite"
});