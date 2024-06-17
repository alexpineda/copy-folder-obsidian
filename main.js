const { Plugin, TFolder, normalizePath, Vault } = require("obsidian");

async function copyFolder(app, sourceFolderPath, destinationFolderPath) {
  const sourceFolder = app.vault.getAbstractFileByPath(
    normalizePath(sourceFolderPath)
  );

  if (sourceFolder instanceof TFolder) {
    if (!(await app.vault.exists(destinationFolderPath))) {
      try {
        await app.vault.createFolder(destinationFolderPath);
      } catch (e) {
        console.error(e);
      }
    }

    const files = [];

    Vault.recurseChildren(sourceFolder, async (file) => {
      // from observation, all folders come first, then all files
      // so we'll assume that ;)
      files.push(file);
    });

    for (const file of files) {
      const newPath = file.path.replace(
        sourceFolder.path,
        destinationFolderPath
      );

      if (!(await app.vault.exists(newPath))) {
        if (file instanceof TFolder) {
          try {
            await app.vault.createFolder(newPath);
          } catch (e) {
            console.error(e);
          }
        } else {
          try {
            await app.vault.copy(file, newPath);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}

async function getUniqueDestinationFolderName(app, folderName) {
  let uniqueFolderName = `${folderName} copy`;

  while (
    await app.vault.exists(`${app.vault.getRoot().path}/${uniqueFolderName}`)
  ) {
    uniqueFolderName = `${uniqueFolderName} copy`;
  }

  return uniqueFolderName;
}

function addDuplicateFolderMenuItem(app, menu, folder) {
  menu.addItem((item) => {
    item
      .setTitle("Duplicate folder")
      .setIcon("copy")
      .onClick(async () => {
        const folderName = await getUniqueDestinationFolderName(
          app,
          folder.name
        );
        const destinationFolderPath = `${folder.parent.path}/${folderName}`;
        try {
          copyFolder(app, folder.path, destinationFolderPath);
        } catch (e) {
          console.error(e);
        }
      });
  });
}

module.exports = class DuplicateFolderPlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
          addDuplicateFolderMenuItem(this.app, menu, file);
        }
      })
    );
  }
};
