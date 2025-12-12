const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files with dark: classes
const output = execSync(
  'cd "e:\\EDGEBIC_Web_Description" && grep -r "dark:" "app/(app)/(marketing)" -l',
  { encoding: 'utf-8', shell: 'bash' }
);

const files = output.trim().split('\n').filter(f => f);

console.log(`Found ${files.length} files with dark: classes`);

let processed = 0;
let errors = 0;

files.forEach((file) => {
  try {
    const fullPath = path.join('e:\\EDGEBIC_Web_Description', file);
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Remove dark: prefixed classes using regex
    // This regex matches dark: followed by any non-whitespace characters (the class name)
    // It handles cases like: dark:bg-slate-900, dark:text-white, dark:hover:bg-gray-700
    const originalContent = content;

    // Match dark: classes with various patterns
    content = content.replace(/\s+dark:[^\s"'`}>\]]+/g, '');

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      processed++;
      console.log(`✓ Processed: ${file}`);
    } else {
      console.log(`○ No changes: ${file}`);
    }
  } catch (error) {
    errors++;
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\nSummary:`);
console.log(`- Processed: ${processed} files`);
console.log(`- Errors: ${errors} files`);
console.log(`- Total: ${files.length} files`);
