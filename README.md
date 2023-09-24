# Cleanup Unused Dependencies

Easily detect and automatically uninstall unused npm dependencies with a single command!

## 🚀 Features

- 🕵️‍♂️ **Detect Unused Dependencies**: The tool scans your project and identifies unused npm dependencies.
- 📦 **Fastest Package Manager**: Utilizes the quickest available package manager, prioritizing `bun`, `pnpm`, `yarn`, and `npm`.
- 🤖 **Display Mode**: Option to only display unused dependencies without uninstalling them.

## 🛠 Installation

```
npm install -g cleanup-unused-deps
```

## 📖 Usage

To detect and uninstall unused dependencies:

```
cleanup-unused-deps
```

To only display the unused dependencies without uninstalling:

```
cleanup-unused-deps --show-only
```
`
## 🔧 Configuration

By default, the script uses the fastest detected package manager. Ensure you have at least one of the supported package managers (`bun`, `pnpm`, `yarn`, `npm`) installed.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
