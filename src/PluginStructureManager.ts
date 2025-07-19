import { AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import { App, Notice, TFile, TFolder } from "obsidian";

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

    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    /**
     * Creates the Agile Project directory structure in the vault.
     * This includes the main Agile directory and subdirectories for Epics, Stories, and Tasks
     */
    public CreateStructure(): void {
        this.App.vault.createFolder(this.Settings.agileDirectoryPath).then((agileFolder) => {
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileEpicsDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileStoriesDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileTasksDirectoryName}`);

            new Notice('Agile Project Structure created successfully!');
        });
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

        let epicDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileEpicsDirectoryName}`);
        let storiesDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}`);
        let tasksDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileTasksDirectoryName}`);

        if (!epicDir || !storiesDir || !tasksDir) {
            new Notice(`One or more required directories are missing in '${this.Settings.agileDirectoryPath}'.`);
            return false;
        }

        return true;
    }

    /**
     * Gets the names of all Epics in the Agile Project.
     * @returns An array of Epic names.
     */
    public GetEpics(): string[] {
        const epicsDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileEpicsDirectoryName}`);
        if (!epicsDir) {
            new Notice(`Epics directory '${this.Settings.agileEpicsDirectoryName}' not found.`);
            return [];
        }

        const epicFiles = epicsDir.children.filter(item => item instanceof TFile && item.name.endsWith(".md"));
        const epicNames = epicFiles.map(file => file.name.replace(".md", ""));

        return epicNames;
    }

    /**
     * Gets the names of all Stories in a specific Epic.
     * @param epicName The name of the Epic to get Stories from.
     * @returns An array of Story names.
     */
    public async GetStories(epicName: string): Promise<string[]> {
        const storiesDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}`);

        if (!storiesDir) {
            new Notice(`Stories directory '${this.Settings.agileStoriesDirectoryName}' not found.`);
            return [];
        }

        const storyFiles: TFile[] = storiesDir.children.filter(item => item instanceof TFile && item.name.endsWith(".md")) as TFile[];
        const matches = await Promise.all(
            storyFiles.map(async file => {
                const content = await this.App.vault.read(file);
                return content.includes(`Epic: \"[[${epicName}]]\"`);
            })
        );

        const storyFilesOfEpic = storyFiles.filter((_, i) => matches[i]);
        const storyNames = storyFilesOfEpic.map(file => file.name.replace(".md", ""));

        return storyNames;
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