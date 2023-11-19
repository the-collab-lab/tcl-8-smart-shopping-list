/**
 * Updates the Firebase-generated workflow files to use:
 *  1. The latest version of @actions/checkout
 *  2. The latest version of @actions/setup-node
 *  3. The Node.js version specified in the .nvmrc file
 */

import { readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

/**
 * Replace the text in a file with the provided replacements.
 * @param {string} path The path to the file.
 * @param {Array<[RegExp | string, string]>} [replacements] An expression matching the pattern to replace, and the replacement text.
 */
async function updateFileContents(path, replacements) {
  try {
    let fileText = await readFile(path, 'utf8');
    let updated = false;
    const fileName = basename(path);

    // Iterate over the replacement tuples and replace the text in the file.
    for (const [searchExp, replacement] of replacements) {
      if (!fileText.includes(replacement)) {
        fileText = fileText.replace(searchExp, replacement);
        updated = true;
      }
    }

    // If no changes were made, we can skip writing the file.
    if (!updated) {
      console.log(`No changes needed for ${fileName}.`);
      return Promise.resolve();
    }

    // Write the updated text into the file.
    await writeFile(path, fileText, 'utf8');

    console.log(`Updated ${fileName}.`);

    return Promise.resolve();
  } catch (err) {
    console.error(err.message);
  }
}

const WORKFLOWS_DIR = `./.github/workflows`;
const WORKFLOW_FILENAMES = [
  join(WORKFLOWS_DIR, 'firebase-hosting-merge.yml'),
  join(WORKFLOWS_DIR, 'firebase-hosting-pull-request.yml'),
];

// NOTE: .yml files are whitespace-sensitive!
// The indentation in the WORKFLOW_STEPS is 6 spaces,
// which is the same as the indentation in the original file.
const NEW_WORKFLOW_STEPS = `
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'`;

const WORKFLOW_FILE_REPLACEMENTS = [
  ['npm install', 'npm ci'],
  [/\s*- uses: actions\/checkout@v\d$/m, NEW_WORKFLOW_STEPS],
];

await Promise.all(
  WORKFLOW_FILENAMES.map(fileName =>
    updateFileContents(fileName, WORKFLOW_FILE_REPLACEMENTS),
  ),
);

console.log('Done!');
process.exit();
