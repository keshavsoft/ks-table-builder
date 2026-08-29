# KeshavSoft `ks-web-components`

> **Reusable Custom HTML Web Components + Tailwind CSS design tokens for forms, controls, and tables.**

`ks-web-components` is a reusable UI component layer from **KeshavSoft**.  
The project provides custom HTML elements that can be composed into forms and table-related interfaces without repeatedly writing the same HTML and styling logic.

The main idea is simple:

```text
Developer Input
      ↓
JavaScript / Schema
      ↓
Custom Web Components
      ↓
Composed HTML Controls
      ↓
Browser UI
```

---

## 🌐 Project Links

| Resource | Link |
|---|---|
| GitHub | https://github.com/keshavsoft/ks-web-components |
| NPM | https://www.npmjs.com/package/ks-web-components |
| Documentation | https://keshavsoft.github.io/ks-web-components/ |
| Local Test | http://localhost:3000/test/v4/ |

---

# 1. What is `ks-web-components`?

Imagine that every application contains forms:

- Name
- Mobile
- Email
- Password
- Date
- Checkbox
- Button
- Table cell
- Status
- Amount

Normally, developers create the HTML and CSS for these controls again and again.

This project takes a different approach.

Instead of writing all the UI markup manually, the application can use custom elements such as:

```html
<ks-web-component
    ks-control-type="input"
    ks-placeholder="Enter your name">
</ks-web-component>
```

The component layer takes responsibility for creating and styling the actual control.

This makes the UI:

- reusable
- consistent
- configurable
- composable
- easier to maintain

---

# 2. The Story Behind the Project

The project can be understood through one simple example.

Suppose the application needs a form with:

```text
Name
Mobile
Email
```

Instead of manually creating three labels, three inputs, CSS classes, spacing and layout rules, JavaScript can describe the fields.

For example:

```javascript
const columns = ["Name", "Mobile", "Email"];
```

The array can then be transformed into a form schema:

```javascript
const formSchema = columns.map(column => ({
    labelText: column,
    inputType: "text"
}));
```

That schema becomes input for a reusable component.

The component creates the form.

The browser finally displays:

```text
Name      [_____________________]

Mobile    [_____________________]

Email     [_____________________]

          [ Save ]
```

So the important concept is:

> **Describe the UI once, let the component system build the repetitive HTML.**

---

# 3. Screenshot Story

The project testing flow can be understood using two screenshots.

## Screenshot 1 — Final Browser Output

The first screenshot shows the rendered `v4` horizontal form.

It contains:

- Name
- Mobile
- Email
- Save button

This is the **output** of the component system.

The browser is showing the final UI that the developer wants to verify.

---

## Screenshot 2 — JavaScript Configuration

The second screenshot shows the JavaScript source.

The important starting point is:

```javascript
const columns = ["Name", "Mobile", "Email"];
```

The code then maps the column names into a form configuration:

```javascript
const formSchema = columns.map(column => ({
    // configuration
}));
```

This is the **input/configuration side** of the story.

Therefore:

```text
Screenshot 2
JavaScript configuration
        ↓
     Schema
        ↓
Custom Component
        ↓
Screenshot 1
Rendered Form
```

This makes the testing folder particularly useful because developers can change the configuration and immediately check the resulting UI in the browser.

---

# 4. Main Features

## Custom HTML Elements

The project uses browser-native Custom Elements.

Example:

```html
<ks-web-component
    ks-control-type="input">
</ks-web-component>
```

This provides a consistent interface for creating controls.

---

## Input Controls

Input components support different HTML input types.

Examples include:

```html
<ks-web-component
    ks-control-type="input"
    ks-type="text">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-type="email">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-type="number">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-type="date">
</ks-web-component>
```

The v4 tests also demonstrate password, disabled, read-only, autofocus, pre-filled values and custom classes.

---

# 5. Themes

Components can be configured with different themes.

Example:

```html
<ks-web-component
    ks-control-type="input"
    ks-theme="pill">
</ks-web-component>
```

Another example:

```html
<ks-web-component
    ks-control-type="input"
    ks-theme="danger">
</ks-web-component>
```

This keeps visual decisions configurable rather than forcing every application to write separate CSS.

---

# 6. Horizontal Forms

One of the important higher-level components is:

```html
<ks-horizontal-form>
</ks-horizontal-form>
```

The component is designed for schema-driven horizontal forms.

A JavaScript configuration can look like:

```javascript
const formSchema = [
    {
        theme: "split-30-70",
        order: "label,input",
        labelText: "First Name",
        inputType: "text",
        inputPlaceholder: "Enter your first name..."
    },
    {
        theme: "split-30-70",
        order: "label,input",
        labelText: "Email Address",
        inputType: "email",
        inputPlaceholder: "name@example.com"
    }
];

const form = document.createElement("ks-horizontal-form");

form._options = formSchema;

document.body.appendChild(form);
```

The important point is that the developer supplies configuration rather than manually building every row.

---

# 7. Supported Horizontal Form Layouts

The schema-driven horizontal form supports layouts such as:

| Theme | Purpose |
|---|---|
| `default` | Standard layout |
| `borderless` | Layout without borders/padding |
| `compact` | Smaller spacing |
| `borderless-center-anchor` | Center-aligned 50/50 layout |
| `split-50-50` | 50% / 50% |
| `split-40-60` | 40% / 60% |
| `split-60-40` | 60% / 40% |
| `split-30-70` | 30% / 70% |
| `split-70-30` | 70% / 30% |

These layouts are powered by CSS Grid/Tailwind-oriented classes.

---

# 8. Component Composition

The project is not only about individual input controls.

It uses a composition approach.

Conceptually:

```text
ks-horizontal-form
        ↓
ks-horizontal-form-row
        ↓
ks-web-component
        ↓
Input / Label / Checkbox / Button
```

This allows small components to become building blocks for larger UI patterns.

---

# 9. Tailwind CSS Design Tokens

The project also provides reusable Tailwind-oriented design tokens.

For example, table cell content can have semantic styles such as:

```text
table.cell.primary
table.cell.numeric
table.cell.bold
table.cell.centered
```

These can represent common visual rules such as:

```text
Primary text
Numeric values
Total values
Centered content
```

Instead of repeatedly deciding how every table cell should look, the application can use a shared token vocabulary.

---

# 10. Architecture

The high-level architecture is:

```text
┌──────────────────────────────────────────────┐
│          Higher-Level Application            │
│                                              │
│       jsTableBuilderViews / App              │
└──────────────────────┬───────────────────────┘
                       │
                       │ consumes components
                       │ and tokens
                       ▼
┌──────────────────────────────────────────────┐
│             ks-web-components                │
│                                              │
│  Custom Elements     Tailwind Token Registry │
│                                              │
│  Forms               Table Cell Styles       │
│  Inputs              Buttons                 │
│  Checkboxes          Labels                  │
└──────────────────────────────────────────────┘
                       │
                       ▼
                 Browser HTML UI
```

The component package acts as a low-level UI layer that can be consumed by higher-level application/framework projects.

---

# 11. Repository Structure

A simplified project structure is:

```text
ks-web-components/
│
├── .github/
├── .vscode/
│
├── bin/
│   └── CLI related files
│
├── docs/
│   └── Documentation and generated assets
│
├── test/
│   ├── v1/
│   ├── v2/
│   ├── v3/
│   ├── v4/
│   └── ...
│
├── webComponents/
│   └── Custom Web Component implementations
│
├── viteBuild/
│   └── Build helper/orchestration modules
│
├── index.js
├── package.json
├── vite.config.js
│
├── README.md
├── DEV.md
├── HOWTO.md
├── ARCHITECTURE.md
└── DETAILS.md
```

---

# 12. Why is the `test` Folder Important?

The `test` directory is effectively a browser playground for the component library.

It allows individual components and combinations to be checked visually.

For example, the v4 index contains links for:

- Label
- Input
- Button
- Checkbox
- Vertical Form
- JS Options

This is useful because a component library should not only be tested through source code.

The developer also needs to see:

```text
Configuration
     ↓
Component
     ↓
Actual browser rendering
```

The test pages provide that visual verification.

---

# 13. V4 Input Test

The v4 input test demonstrates several capabilities.

### Themes

```html
<ks-web-component
    ks-control-type="input"
    ks-theme="default">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-theme="pill">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-theme="danger">
</ks-web-component>
```

### States

```html
<ks-web-component
    ks-control-type="input"
    ks-disabled="true">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-read-only="true">
</ks-web-component>
```

```html
<ks-web-component
    ks-control-type="input"
    ks-autofocus="true">
</ks-web-component>
```

### Values and custom classes

```html
<ks-web-component
    ks-control-type="input"
    ks-value="Pre-filled value"
    ks-class-name="border-purple-500 bg-purple-50">
</ks-web-component>
```

This makes `test/v4` a good place to understand what attributes the components accept and what the browser output looks like.

---

# 14. Local Development

Clone the repository:

```bash
git clone https://github.com/keshavsoft/ks-web-components.git
```

Enter the project:

```bash
cd ks-web-components
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the test page:

```text
http://localhost:3000/test/v4/
```

If your Vite server selects another port, use the URL printed in the terminal.

---

# 15. Build the Package

The project defines a Vite build command:

```bash
npm run build
```

The build process uses `vite.config.js`.

The configuration:

1. Finds the highest available component version.
2. Creates the target version directory.
3. Cleans the build directory.
4. Runs the Vite library build.
5. Generates the package output under the documentation distribution area.

Conceptually:

```text
webComponents/
      ↓
Find highest component version
      ↓
Clean target build directory
      ↓
Vite library build
      ↓
docs/dist/v{version}/
```

---

# 16. Package Information

The package is published as:

```text
ks-web-components
```

The package is an ES module:

```json
{
    "type": "module"
}
```

Its main entry point is:

```text
index.js
```

The package also exposes a CLI entry point:

```text
bin/cli.js
```

The repository currently defines:

```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    }
}
```

---

# 17. Main Technologies

| Technology | Purpose |
|---|---|
| JavaScript | Component and schema logic |
| Web Components | Custom HTML elements |
| HTML | Component/test markup |
| Tailwind CSS | Utility classes/design tokens |
| Vite | Development server and library build |
| Node.js | Build/CLI environment |
| ES Modules | Modern JavaScript module system |
| Puppeteer | Browser automation dependency |

---

# 18. Example: From Columns to Form

A very simple version of the screenshot's concept is:

```javascript
const columns = [
    "Name",
    "Mobile",
    "Email"
];

const formSchema = columns.map(column => ({
    labelText: column,
    inputType: "text"
}));
```

Then the schema can be supplied to a reusable form component:

```javascript
const form = document.createElement(
    "ks-horizontal-form"
);

form._options = formSchema;

document.body.appendChild(form);
```

The advantage is that adding another field becomes a data change:

```javascript
const columns = [
    "Name",
    "Mobile",
    "Email",
    "Address"
];
```

Rather than manually creating another complete HTML row.

---

# 19. The Core Philosophy

The project can be summarized in five ideas:

### 1. Describe

Describe what the UI needs.

### 2. Configure

Store the description as component options/schema.

### 3. Compose

Combine small Web Components into larger components.

### 4. Render

Allow the browser to render the resulting native HTML structure.

### 5. Reuse

Use the same components and tokens across multiple applications.

```text
Describe
   ↓
Configure
   ↓
Compose
   ↓
Render
   ↓
Reuse
```

---

# 20. Relationship With Higher-Level Projects

`ks-web-components` is designed to work as a component layer.

A higher-level framework such as `jsTableBuilderViews` can consume:

```text
Custom HTML Elements
        +
Tailwind Design Tokens
        +
Reusable Form Components
        +
Reusable Table Cell Components
```

This creates a separation between:

```text
Application / Framework Logic
```

and:

```text
Reusable UI Components
```

That separation makes it easier to evolve the component implementation without rewriting every application that consumes it.

---

# 21. Where to Start

If you are new to this repository, follow this order:

```text
1. README.md
       ↓
2. test/v4/index.html
       ↓
3. test/v4/input.html
       ↓
4. test/v4/inline.js
       ↓
5. webComponents/
       ↓
6. DETAILS.md
       ↓
7. ARCHITECTURE.md
       ↓
8. vite.config.js
```

Start with the tests because they show the component behavior visually.

Then move into the component implementation.

Finally study the build and architecture files.

---

# 22. Quick Mental Model

When you look at this project, remember:

```text
                 USER / DEVELOPER
                        │
                        ▼
                 JavaScript Schema
                        │
                        ▼
               Custom Web Components
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
          Forms                 Tables
             │                     │
             └──────────┬──────────┘
                        ▼
               Tailwind Design Tokens
                        │
                        ▼
                  Browser UI
```

The repository is therefore best understood as a **reusable UI/component foundation**, rather than simply a collection of HTML examples.

---

## 📚 Further Documentation

- **Developer Guide:** `DEV.md`
- **How-To Guide:** `HOWTO.md`
- **Architecture:** `ARCHITECTURE.md`
- **Schema/Form Details:** `DETAILS.md`
- **Browser Tests:** `test/`
- **Component Source:** `webComponents/`

---

## License

ISC

---

## KeshavSoft

Built and maintained as part of the KeshavSoft component ecosystem.

**`ks-web-components` — describe the UI, compose the components, and let the browser do the rendering.**

## 🌐 Documentation Matrix

* 🛠️ **Developer & Build Guide**: [DEV.md](./DEV.md) | [docs/index.html](https://keshavsoft.github.io/ks-web-components/dev.html)
ks-knowledge-funcs/howto.html)

* 📖 **Docs Hub**: [https://keshavsoft.github.io/ks-knowledge-funcs/](https://keshavsoft.github.io/ks-knowledge-funcs/)
