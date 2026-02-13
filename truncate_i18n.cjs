const fs = require('fs');
// Read file with utf8 encoding
const content = fs.readFileSync('src/i18n.js', 'utf8');
// Split by newline. Handle CRLF or LF.
const lines = content.split(/\r?\n/);

// We want to keep up to line 415 (inclusive).
// Line 415 is closing brace for 'es' block: "        },"
// 1-indexed 415 is array index 414.

if (lines.length < 415) {
    console.log("File too short!");
    process.exit(1);
}

const newLines = lines.slice(0, 219);
// modify last line to remove comma if present
let lastLine = newLines[newLines.length - 1];
if (lastLine.trim().endsWith(',')) {
    lastLine = lastLine.replace(',', '');
    newLines[newLines.length - 1] = lastLine;
}

// Add closing braces
newLines.push("    }");
newLines.push("});");
newLines.push("");
newLines.push("export default i18n;");

fs.writeFileSync('src/i18n.js', newLines.join('\n'));
console.log("Truncated i18n.js successfully.");
