#!/usr/bin/env node

import {Logger} from "lovely-logs";
import depcheck from "depcheck";
import {execSync} from "child_process";
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

function getAvailablePackageManager() {
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

depcheck(options.path, options, (unused) => {
  const unusedDeps = unused.dependencies;
  if (unusedDeps.length) {
    if (argv["show-only"]) {
      Logger.info(`Unused dependencies: ${unusedDeps.join(", ")}`);
    } else {
      const uninstallCommand = `${packageManager} ${
        packageManager === "yarn" ? "remove" : "uninstall"
      } ${unusedDeps.join(" ")}`;
      try {
        Logger.info(
          `Uninstalling with ${packageManager}: ${unusedDeps.join(", ")}`,
        );
        execSync(uninstallCommand, { stdio: "inherit" });
      } catch (error) {
        if (error instanceof Error) {
          Logger.error(`Error during uninstallation: ${error.message}`);
        } else {
          Logger.error(`An unexpected error occurred: ${String(error)}`);
        }
      }
    }
  } else {
    Logger.info("No unused dependencies found.");
  }
  Logger.info("Done!");
});
