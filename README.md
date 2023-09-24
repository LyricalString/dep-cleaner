# 🧹 Cleanup Unused Dependencies

Easily detect and automatically uninstall unused npm dependencies with a single command!

# 💡 Based on Depcheck

This utility is built upon the foundation provided by depcheck. depcheck is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json.

Our tool extends the capabilities of depcheck by automating the cleanup process and integrating with multiple package managers for a smoother user experience.

## 🚀 Features

- 🕵️‍♂️ **Detect Unused Dependencies**: The tool scans your project and identifies unused npm dependencies.
- 📦 **Fastest Package Manager**: Utilizes the quickest available package manager, prioritizing `bun`, `pnpm`, `yarn`, and `npm`.
- 🤖 **Display Mode**: Option to only display unused dependencies without uninstalling them.

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
`
## 🔧 Configuration

By default, the script uses the fastest detected package manager. Ensure you have at least one of the supported package managers (`bun`, `pnpm`, `yarn`, `npm`) installed.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
