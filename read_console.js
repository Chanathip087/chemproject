const fs = require('fs');

const css = fs.readFileSync('style.css', 'utf8');

// Find all occurrences of /* and */
let index = 0;
let comments = [];

while (true) {
  let openIndex = css.indexOf('/*', index);
  if (openIndex === -1) break;
  let closeIndex = css.indexOf('*/', openIndex + 2);
  if (closeIndex === -1) {
    console.log(`Unclosed comment starting at character position ${openIndex}`);
    // Print the context of the unclosed comment
    console.log(css.substring(openIndex, openIndex + 200));
    process.exit(1);
  }
  index = closeIndex + 2;
}

console.log('All comments are closed successfully!');
