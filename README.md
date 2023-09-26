# 🧹 Cleanup Unused Dependencies

Easily detect and automatically uninstall unused npm dependencies with a single command!

# 💡 Based on Depcheck

This utility is built upon the foundation provided by depcheck. depcheck is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json.

Our tool extends the capabilities of depcheck by automating the cleanup process and integrating with multiple package managers for a smoother user experience.

## 🚀 Features

- 🕵️‍♂️ **Detect Unused Dependencies**: The tool scans your project and identifies unused npm dependencies.
- 📦 **Fastest Package Manager**: Utilizes the quickest available package manager, prioritizing `bun`, `pnpm`, `yarn`, and `npm`.
- 🤖 **Display Mode**: Option to only display unused dependencies without uninstalling them.
- ✅ **Interactive Cleanup**: Offers an interactive mode to select which unused dependencies to uninstall. 
- 🚫 *+Skip Confirmation**: Speed up the cleanup process by bypassing user confirmation using the **--no-confirm** flag.

## 🛠 Installation

Using npm:
```
npm install -g dep-cleaner
```

Using yarn:
```
yarn global add dep-cleaner
```

Using pnpm:
```
pnpm add -g dep-cleaner
```

Using bun:
```
bun add global dep-cleaner
```

## 📖 Usage

To detect and uninstall unused dependencies:

```
dep-cleaner
```

To only display the unused dependencies without uninstalling:

```
dep-cleaner --show-only
```

# 🤖 Automation Integration

To maximize the benefits of `dep-cleaner`, it's highly recommended to integrate it into your project's automation workflow. This ensures that unused dependencies are consistently identified and removed, keeping your project lean and efficient.

## Continuous Integration (CI):

Integrate `dep-cleaner` into your CI pipeline to automatically check for unused dependencies during every build. This way, you'll be alerted if any unused dependencies exist before deploying or releasing your code.

### Example for a CI script:

```
# Install dep-cleaner
npm install -g dep-cleaner

# Run dep-cleaner
dep-cleaner
```

## Git Hooks:

Using tools like [Husky](https://github.com/typicode/husky), you can add pre-commit or pre-push hooks that run `dep-cleaner` to ensure no unused dependencies are committed to the repository.

### Example using Husky:

1. **Install Husky:**

```
npm install husky --save-dev
```

2. **Add a pre-push hook:**

```
"husky": {
    "hooks": {
        "pre-push": "dep-cleaner"
    }
}
```

This ensures that before every push to the repository, `dep-cleaner` runs and cleans up any unused dependencies.

## Recommendations:

- **Continuous Integration (CI)**: For teams or larger projects, integrating into the CI pipeline ensures a clean codebase during every build.

- **Development Environment**: For individual developers, using Git hooks ensures the local codebase remains clean during development.

By making `dep-cleaner` a part of your regular development and deployment process, you ensure a leaner, more efficient, and less error-prone codebase.

## 🔧 Configuration

By default, the script uses the fastest detected package manager. Ensure you have at least one of the supported package managers (`bun`, `pnpm`, `yarn`, `npm`) installed.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
