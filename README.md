# Duplicate Folder Plugin for Obsidian

This plugin allows you to duplicate ( copy ) folders in your Obsidian vault, including all nested folders and files.

## Features

- Duplicate a folder and its contents with a single click.
- Automatically handles naming conflicts by appending "copy" to the duplicated folder name.
- Preserves the original folder structure and file contents.

## Usage

1. Right-click on a folder in the Obsidian file explorer.
2. Select "Duplicate folder" from the context menu.
3. The folder and its contents will be duplicated with a unique name in the same parent directory.

## Errors

The plugin will fail silently on individual folders and files but continue processing what it can. Copy errors are logged to the console for your convenience.

## Limitations

- The plugin only duplicates folders within the same vault. It does not support duplicating folders across different vaults.
- The plugin does not handle symbolic links or special file types.

## Contributing

If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This plugin is released under the [MIT License](LICENSE).

## Credits

This plugin was developed by [Alex Pineda](https://github.com/alexpineda).

## Acknowledgements

- [Obsidian](https://obsidian.md/) for providing an amazing note-taking platform.
- Claude Opus for writing the initial (broken) version 