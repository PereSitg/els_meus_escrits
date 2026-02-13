const fs = require('fs');
const content = fs.readFileSync('src/i18n.js', 'utf8');

let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j = 0; j < line.length; j++) {
        let char = line[j];
        if (char === '{' || char === '(' || char === '[') {
            stack.push({ char, line: i + 1, col: j + 1 });
        } else if (char === '}' || char === ')' || char === ']') {
            if (stack.length === 0) {
                console.log(`Error: Unexpected '${char}' at line ${i + 1}, col ${j + 1}`);
                process.exit(1);
            }
            let last = stack.pop();
            if ((char === '}' && last.char !== '{') ||
                (char === ')' && last.char !== '(') ||
                (char === ']' && last.char !== '[')) {
                console.log(`Error: Mismatched '${char}' at line ${i + 1}, col ${j + 1}. Expected closing version of '${last.char}' from line ${last.line}`);
                process.exit(1);
            }
        }
    }
}

if (stack.length > 0) {
    let last = stack[stack.length - 1];
    console.log(`Error: Unclosed '${last.char}' from line ${last.line}, col ${last.col}`);
    process.exit(1);
}

console.log("Braces are balanced.");
