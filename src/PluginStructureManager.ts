import { AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import { App, Notice, TFolder } from "obsidian";

/**
 * Manager class for the structure of the Agile Project Plugin.
 * This class handles the creation and validation of the Agile Project directory structure.
 */
class PluginStructureManager {

    /**
     * @protected
     * The Obsidian App instance for accessing vault and workspace functionality.
     */
    App: App;

    /**
     * @protected
     * The settings for the Agile Project Plugin.
     */
    Settings: AgileProjectPluginSettings;

    
    /**
     * @param app The Obsidian App instance for accessing vault and workspace functionality.
     * @param settings The settings for the Agile Project Plugin.
     */
    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    /**
     * Creates the Agile Project directory structure in the vault.
     * This includes the main Agile directory and subdirectories for Epics, Stories, and Tasks
     */
    public CreateStructure(): void {
        this.App.vault.createFolder(this.Settings.agileDirectoryPath).then((agileFolder) => new Notice('Agile Project Structure created successfully!'));
    }

    /**
     * Checks if the Agile Project directory structure is valid.
     * @returns True if the structure is valid, false otherwise.
     */
    public IsValidStructure(): boolean {

        let parentDir: TFolder | null = this.App.vault.getFolderByPath(this.Settings.agileDirectoryPath)

        if (!parentDir) {
            new Notice(`Parent directory '${this.Settings.agileDirectoryPath}' not found.`);
            return false;
        }

        if (parentDir.children.length == 0) {
            new Notice(`Parent directory '${this.Settings.agileDirectoryPath}' is empty.`);
            return false;
        }

        return true;
    }

    /**
     * Renames a directory in the vault.
     * @param oldName The current name of the directory.
     * @param newName The new name for the directory.
     */
    public RenameDirectory(oldName: string, newName: string): void {
        const root = this.App.vault.getRoot();

        root.children.forEach((item) => {
            if (!(item instanceof TFolder))
                return;

            if (item.name == oldName)
                this.App.vault.rename(item, newName);
        });
    }

    /**
     * Renames a subdirectory in the vault.
     * @param parentDir The path of the parent directory.
     * @param oldName The current name of the subdirectory.
     * @param newName The new name for the subdirectory.
     * @returns 
     */
    public RenameSubdirectory(parentDir: string, oldName: string, newName: string): void {
        const parent: TFolder | null = this.App.vault.getFolderByPath(parentDir);

        if (!parent) {
            new Notice(`Parent directory '${parentDir}' not found.`);
            return;
        }

        parent.children.forEach((item) => {
            if (!(item instanceof TFolder))
                return;

            if (item.name == oldName)
                this.App.vault.rename(item, `${parent.name}/${newName}`);
        });
    }
}

export default PluginStructureManager;