#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get all TypeScript and TSX files in the src directory
const getAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

// Common replacements for Tailwind CSS classes
const replacements = [
  // Size shorthand replacements
  { pattern: /\bh-(\d+)\s+w-\1\b/g, replacement: "size-$1" },
  { pattern: /\bw-(\d+)\s+h-\1\b/g, replacement: "size-$1" },
  { pattern: /\bsm:h-(\d+)\s+sm:w-\1\b/g, replacement: "sm:size-$1" },
  { pattern: /\bsm:w-(\d+)\s+sm:h-\1\b/g, replacement: "sm:size-$1" },
  { pattern: /\bmd:h-(\d+)\s+md:w-\1\b/g, replacement: "md:size-$1" },
  { pattern: /\bmd:w-(\d+)\s+md:h-\1\b/g, replacement: "md:size-$1" },
  { pattern: /\blg:h-(\d+)\s+lg:w-\1\b/g, replacement: "lg:size-$1" },
  { pattern: /\blg:w-(\d+)\s+lg:h-\1\b/g, replacement: "lg:size-$1" },

  // Arbitrary value replacements
  { pattern: /\bh-\[(\d+)px\]\s+w-\[(\1)px\]\b/g, replacement: "size-[$1px]" },
  { pattern: /\bw-\[(\d+)px\]\s+h-\[(\1)px\]\b/g, replacement: "size-[$1px]" },

  // Inset shorthand replacements
  { pattern: /\bleft-0\s+right-0\b/g, replacement: "inset-x-0" },
  { pattern: /\bright-0\s+left-0\b/g, replacement: "inset-x-0" },
  { pattern: /\btop-0\s+bottom-0\b/g, replacement: "inset-y-0" },
  { pattern: /\bbottom-0\s+top-0\b/g, replacement: "inset-y-0" },

  // Migration from Tailwind v2 to v3
  { pattern: /\bflex-shrink-0\b/g, replacement: "shrink-0" },
  { pattern: /\bflex-grow\b/g, replacement: "grow" },
  { pattern: /\btransform\b/g, replacement: "" },

  // Unnecessary arbitrary values
  { pattern: /\bspace-y-\[2\.5rem\]\b/g, replacement: "space-y-10" },
  { pattern: /\bm-\[1px\]\b/g, replacement: "m-px" },
  { pattern: /\bmax-w-\[42rem\]\b/g, replacement: "max-w-2xl" },
  { pattern: /\bleft-\[50%\]\b/g, replacement: "left-1/2" },
  { pattern: /\btop-\[50%\]\b/g, replacement: "top-1/2" },
  { pattern: /\btranslate-x-\[-50%\]\b/g, replacement: "-translate-x-1/2" },
  { pattern: /\btranslate-y-\[-50%\]\b/g, replacement: "-translate-y-1/2" },
  { pattern: /\bsm:mb-\[-0\.5rem\]\b/g, replacement: "sm:-mb-2" },
  { pattern: /\bw-\[80%\]\b/g, replacement: "w-4/5" },
  { pattern: /\bw-\[60%\]\b/g, replacement: "w-3/5" },
  { pattern: /\bblur-\[8px\]\b/g, replacement: "blur" },
];

// Add a function to replace unnecessary arbitrary values with standard classes
const replaceUnnecessaryArbitraryValues = (content) => {
  // Replace common arbitrary values with their standard equivalents
  content = content.replace(/h-\[1px\]/g, "h-px");
  content = content.replace(/w-\[80%\]/g, "w-4/5");
  content = content.replace(/w-\[60%\]/g, "w-3/5");
  content = content.replace(/blur-\[8px\]/g, "blur");

  // Replace w-full h-full with size-full
  content = content.replace(/(?:w-full\s+h-full|h-full\s+w-full)/g, "size-full");

  return content;
};

// Process each file
const processFile = (filePath) => {
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Apply all replacements
  replacements.forEach(({ pattern, replacement }) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  // Add the replacement of unnecessary arbitrary values
  let updatedContent = replaceUnnecessaryArbitraryValues(content);

  // Save the file if modified
  if (modified) {
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Updated ${filePath}`);
  }
};

// Main execution
const main = () => {
  const srcDir = path.join(process.cwd(), "src");
  const files = getAllFiles(srcDir);

  console.log(`Found ${files.length} files to process`);

  files.forEach(processFile);

  console.log("Done! Run your linter to check for remaining issues.");
};

main();
