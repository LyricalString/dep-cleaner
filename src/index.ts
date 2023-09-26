#!/usr/bin/env node

import { Logger } from "lovely-logs";
import depcheck from "depcheck";
import { execSync } from "child_process";
import inquirer from 'inquirer';

console.log('test')

function getAvailablePackageManager(): string {
  const managers = ["bun", "pnpm", "yarn", "npm"];
  for (const manager of managers) {
    try {
      execSync(`${manager} --version`, { stdio: "ignore" });
      return manager;
    } catch (error) {
      // Ignore the error and try the next package manager
    }
  }
  throw new Error("No package manager found!");
}

const packageManager = getAvailablePackageManager();
const noConfirm = process.argv.includes("--no-confirm");  // <-- Check for the flag

const options = {
  path: process.cwd(),
  specials: [],
};

Logger.info(`Using ${packageManager} as package manager.`);

depcheck(options.path, options, async (unused) => {
  const unusedDeps = unused.dependencies;
  if (unusedDeps.length) {
    Logger.info("Unused dependencies detected:\n" + unusedDeps.map(dep => `- ${dep}`).join("\n"));

    if (noConfirm) {
      uninstallDependencies(unusedDeps);  // <-- Directly uninstall if flag is set
    } else {
      // Use inquirer for the interactive checkboxes
      const answers = await inquirer.prompt([{
        type: 'checkbox',
        message: 'Select dependencies to uninstall:',
        name: 'depsToUninstall',
        choices: unusedDeps,
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one dependency.';
          }
          return true;
        }
      }]);

      if (answers.depsToUninstall.length) {
        uninstallDependencies(answers.depsToUninstall);  // <-- Uninstall the selected deps
      } else {
        Logger.info("Uninstallation aborted by the user.");
      }
    }
  } else {
    Logger.info("No unused dependencies found.");
  }
});

function uninstallDependencies(deps: string[]) {
  const uninstallCommand = `${packageManager} ${
    packageManager === "yarn" ? "remove" : "uninstall"
  } ${deps.join(" ")}`;
  try {
    Logger.info(`Uninstalling with ${packageManager}: ${deps.join(", ")}`);
    execSync(uninstallCommand, { stdio: "inherit" });
    Logger.info("Uninstallation completed.");
  } catch (error) {
    if (error instanceof Error) {
      Logger.error(`Error during uninstallation: ${error.message}`);
    } else {
      Logger.error(`An unexpected error occurred: ${String(error)}`);
    }
  }
}