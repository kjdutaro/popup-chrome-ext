#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to prompt the user for the project name
async function promptForProjectName() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of your new project:',
      default: 'popup-chrome-ext',
    },
  ]);

  return answers.projectName;
}

// Define the path to the template files
const templateDir = path.resolve(__dirname);

(async () => {
  try {
    // Prompt for project name
    const projectName = await promptForProjectName();
    const targetDir = path.resolve(process.cwd(), projectName);

    // Create the target directory and copy the template files
    await fs.copy(templateDir, targetDir, {
      filter: (src) => !src.includes('node_modules') && !src.includes('cli.js')
    });

    console.log(`Popup Chrome Extension created in ${targetDir}`);
  } catch (err) {
    console.error(`Error creating extension: ${err}`);
  }
})();
