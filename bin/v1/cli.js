#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The package root, one level up from bin/
const packageRoot = path.join(__dirname, '..');
const filesToCopy = ['index.js'];

function showHelp() {
    console.log(`
🚀 KS Web Components CLI
========================

KS Web Components is a robust, JSON-driven Web Component library for generating complex data tables, vertical forms, and interactive input cells.

Usage:
  npx ks-web-components <command>

Commands:
  init        Extracts the active KS Web Components source folder and index.js to the current directory.
  docs        Prints the README / Documentation to the console.
  defaults    Prints the predefined JSON configurations for styling.
  usage       Prints a quick Javascript usage cheat sheet.
  help        Shows this help message.

Options:
  --help, -h  Shows this help message.

Example:
  npx ks-web-components defaults
`);
}

function getActiveVersion() {
    const indexJsPath = path.join(packageRoot, 'index.js');
    if (!fs.existsSync(indexJsPath)) {
        throw new Error('Could not find index.js to determine active version.');
    }
    const indexJsContent = fs.readFileSync(indexJsPath, 'utf8');
    const versionMatch = indexJsContent.match(/webComponents\/(v\d+)/);
    if (!versionMatch) {
        throw new Error('Could not determine active version from index.js.');
    }
    return versionMatch[1];
}

// Utility to recursively copy a directory
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function initScaffold() {
    console.log('📦 Extracting KS Web Components source files...');

    try {
        const activeVersion = getActiveVersion();
        const sourceDir = path.join(packageRoot, 'webComponents', activeVersion);
        const targetDir = path.join(process.cwd(), 'webComponents', activeVersion);

        // Copy the active version directory
        if (fs.existsSync(sourceDir)) {
            if (fs.existsSync(targetDir)) {
                console.warn(`⚠️  Target directory ./webComponents/${activeVersion} already exists. Files will be overwritten.`);
            }
            copyDirectory(sourceDir, targetDir);
            console.log(`✅ Successfully copied webComponents/${activeVersion} to ./webComponents/${activeVersion}`);
        } else {
            console.warn(`⚠️ Source directory not found: ${sourceDir}. Skipping...`);
        }

        // Copy individual files (like index.js)
        for (const file of filesToCopy) {
            const sourceFile = path.join(packageRoot, file);
            const targetFile = path.join(process.cwd(), file);
            if (fs.existsSync(sourceFile)) {
                fs.copyFileSync(sourceFile, targetFile);
                console.log(`✅ Successfully copied ${file} to ./${file}`);
            }
        }

        // Scaffold a sample index.html
        const indexHtmlPath = path.join(process.cwd(), 'index.html');
        if (!fs.existsSync(indexHtmlPath)) {
            const templatePath = path.join(__dirname, 'template.html');
            if (fs.existsSync(templatePath)) {
                const indexHtmlContent = fs.readFileSync(templatePath, 'utf8');
                fs.writeFileSync(indexHtmlPath, indexHtmlContent);
                console.log(`✅ Scaffolding complete: Created ./index.html starter file`);
            } else {
                console.warn(`⚠️ Could not find template.html at ${templatePath}. Skipping index.html creation.`);
            }
        }

        console.log(`\nYou can now import and customize the KS Web Components directly from your own project!`);
    } catch (error) {
        console.error(`❌ Failed to copy files: ${error.message}`);
        process.exit(1);
    }
}

function printDocs() {
    console.log('\n📖 KS Web Components Documentation');
    console.log('===================================\n');
    try {
        const readmePath = path.join(packageRoot, 'README.md');
        if (fs.existsSync(readmePath)) {
            console.log(fs.readFileSync(readmePath, 'utf8'));
        } else {
            console.log('❌ README.md not found.');
        }
    } catch (err) {
        console.error('❌ Error reading docs:', err.message);
    }
}

function printDefaults() {
    console.log('\n🎨 Predefined JSON Stylings');
    console.log('===========================\n');
    try {
        const activeVersion = getActiveVersion();
        const baseDir = path.join(packageRoot, 'webComponents', activeVersion, 'cellRenderers', 'renderInputControl', 'v7');
        
        const textClassesPath = path.join(baseDir, 'PREDEFINED_TEXT_CLASSES.json');
        const buttonClassesPath = path.join(baseDir, 'PREDEFINED_BUTTON_CLASSES.json');
        
        if (fs.existsSync(textClassesPath)) {
            console.log('--- PREDEFINED_TEXT_CLASSES.json ---\n');
            console.log(fs.readFileSync(textClassesPath, 'utf8'));
        }
        
        if (fs.existsSync(buttonClassesPath)) {
            console.log('\n--- PREDEFINED_BUTTON_CLASSES.json ---\n');
            console.log(fs.readFileSync(buttonClassesPath, 'utf8'));
        }
    } catch (err) {
        console.error('❌ Error reading defaults:', err.message);
    }
}

function printUsage() {
    console.log(`
💡 KS Web Components Quick Usage
================================

To use the web component dynamically via Javascript:

1. Import the library via CDN:
   <script src="https://keshavsoft.github.io/ks-web-components/dist/v12/ks-web-components.js" type="module"></script>

2. Define your options in Javascript and append to DOM:
   <script>
       const options = {
           inHtmlType: "text",
           inValue: "Hello World",
           inClassName: "text.primary"
       };

       const cell = document.createElement("ks-table-cell-content-common");
       cell.options = options;
       document.body.appendChild(cell);
   </script>
`);
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h') || args[0] === 'help') {
    showHelp();
} else if (args[0] === 'init') {
    initScaffold();
} else if (args[0] === 'docs') {
    printDocs();
} else if (args[0] === 'defaults') {
    printDefaults();
} else if (args[0] === 'usage') {
    printUsage();
} else {
    console.error(`❌ Unknown command: ${args[0]}`);
    showHelp();
    process.exit(1);
}
