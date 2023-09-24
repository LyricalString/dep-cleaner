#!/usr/bin/env node

import { Logger } from "lovely-logs";
import depcheck from "depcheck";
import { execSync } from "child_process";
import readline from "readline";

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

const options = {
  path: process.cwd(),
  specials: [],
};

Logger.info(`Using ${packageManager} as package manager.`);

depcheck(options.path, options, async (unused) => {
  const unusedDeps = unused.dependencies;
  if (unusedDeps.length) {
    Logger.info("Unused dependencies detected:\n" + unusedDeps.map(dep => `- ${dep}`).join("\n"));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Do you want to uninstall these dependencies? (yes/no) ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        const uninstallCommand = `${packageManager} ${
          packageManager === "yarn" ? "remove" : "uninstall"
        } ${unusedDeps.join(" ")}`;
        try {
          Logger.info(`Uninstalling with ${packageManager}: ${unusedDeps.join(", ")}`);
          execSync(uninstallCommand, { stdio: "inherit" });
          Logger.info("Uninstallation completed.");
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Error during uninstallation: ${error.message}`);
          } else {
            Logger.error(`An unexpected error occurred: ${String(error)}`);
          }
        }
      } else {
        Logger.info("Uninstallation aborted by the user.");
      }
      rl.close();
    });
  } else {
    Logger.info("No unused dependencies found.");
  }
});
