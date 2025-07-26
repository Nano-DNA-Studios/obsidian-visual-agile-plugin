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

    /**
     * @protected
     * The name of the Agile Project directory.
     */
    private TASK_DIR_NAME = 'Tasks';

    /**
     * @protected
     * The regular expression for matching Markdown file extensions.
     */
    private MARKDOWN_EXTENSION = /\.md$/;

    /**
     * @protected
     * The regular expression for extracting the Overview section from a Markdown file.
     */
    private OVERVIEW_REGEX = /# Overview\s*-{2,}\s*([\s\S]*?)(?=\n# )/;

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
     * Gets the directories for all Epics in the Agile Project.
     * @returns An array of TFolder objects representing the Epic directories.
     */
    public GetEpicDirectories(): TFolder[] {

        if (!this.IsValidStructure()) {
            new Notice(`Invalid structure! Please create a folder named '${this.Settings.agileDirectoryPath}' in the root of your vault.`);
            return [];
        }

        const epicsDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}`);

        if (!epicsDir) {
            new Notice(`Epic directory not found.`);
            return [];
        }

        const epicFolders = epicsDir.children.filter(item => item instanceof TFolder);

        return epicFolders as TFolder[];
    }

    /**
     * Gets the file path for a specific Epic.
     * @param epicName The name of the Epic to get the file path for.
     * @returns The file path of the Epic, or an empty string if not found.
     */
    public GetEpicFilePath(epicName: string): string {
        const epicDirectories = this.GetEpicDirectories();
        const epicPath = epicDirectories.find(folder => folder.name === epicName)?.path;

        if (!epicPath) {
            new Notice(`Epic '${epicName}' does not exist.`);
            return '';
        }

        const epicFile = this.App.vault.getAbstractFileByPath(`${epicPath}/${epicName}.md`);

        if (!epicFile) {
            new Notice(`Epic file '${epicName}.md' does not exist.`);
            return '';
        }

        return epicFile.path;
    }

    /**
     * Gets the names of all Epics in the Agile Project.
     * @returns An array of Epic names.
     */
    public GetEpics(): string[] {
        const epicFolders = this.GetEpicDirectories();
        const epicNames = epicFolders.map(folder => folder.name);
        return epicNames;
    }

    /**
     * Gets the directories for all Stories in a specific Epic.
     * @param epicName The name of the Epic to get Stories from.
     * @returns An array of TFolder objects representing the Story directories.
     */
    public GetStoryDirectories(epicName: string): TFolder[] {

        if (!this.IsValidStructure()) {
            new Notice(`Invalid structure! Please create a folder named '${this.Settings.agileDirectoryPath}' in the root of your vault.`);
            return [];
        }

        const storiesDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${epicName}`);

        if (!storiesDir) {
            new Notice(`Story directory not found.`);
            return [];
        }

        const storyFolders: TFolder[] = storiesDir.children.filter(item => item instanceof TFolder) as TFolder[];
        return storyFolders;
    }

    /**
     * Gets the file path for a specific Story.
     * @param epicName The name of the Epic to get the Story from.
     * @param storyName The name of the Story to get the file path for.
     * @returns The file path of the Story, or an empty string if not found.
     */
    public GetStoryFilePath(epicName: string, storyName: string): string {
        const storyDirectories = this.GetStoryDirectories(epicName);
        const storyPath = storyDirectories.find(folder => folder.name === storyName)?.path;

        if (!storyPath) {
            new Notice(`Story '${storyName}' does not exist.`);
            return '';
        }

        const storyFile = this.App.vault.getAbstractFileByPath(`${storyPath}/${storyName}.md`);

        if (!storyFile) {
            new Notice(`Story file '${storyName}.md' does not exist.`);
            return '';
        }

        return storyFile.path;
    }

    /**
     * Gets the names of all Stories in a specific Epic.
     * @param epicName The name of the Epic to get Stories from.
     * @returns An array of Story names.
     */
    public GetStories(epicName: string): string[] {
        const storyFolders: TFolder[] = this.GetStoryDirectories(epicName);
        const storyNames = storyFolders.map(folder => folder.name);
        return storyNames;
    }

    /**
     * Gets the directories for all Tasks in a specific Story.
     * @param epicName The name of the Epic to get the Tasks from.
     * @param storyName The name of the Story to get the Task directories for.
     * @returns An array of TFolder objects representing the Task directories.
     */
    public GetTaskDirectories(epicName: string, storyName: string): TFolder[] {
        const storyDirectories = this.GetStoryDirectories(epicName);
        const storyDir = storyDirectories.find(folder => folder.name === storyName);

        if (!storyDir) {
            new Notice(`Story '${storyName}' does not exist in Epic '${epicName}'.`);
            return [];
        }

        const tasksDir = storyDir.children.filter(
            item => item instanceof TFolder && item.name === this.TASK_DIR_NAME
        ) as TFolder[];

        if (tasksDir.length === 0) {
            new Notice(`Tasks directory not found in '${storyName}'.`);
        }

        return tasksDir;
    }

    /**
     * Gets the names of all Tasks in a specific Story.
     * @param epicName The name of the Epic to get the Tasks from.
     * @param storyName The name of the Story to get the Task directories for.
     * @returns An array of Task names.
     */
    public GetTasks(epicName: string, storyName: string): string[] {
        const taskDirectories = this.GetTaskDirectories(epicName, storyName);
        if (!taskDirectories || taskDirectories.length === 0) return [];

        const tasksDir = taskDirectories[0];
        if (!(tasksDir instanceof TFolder)) {
            new Notice(`Tasks directory not found.`);
            return [];
        }

        const taskNames = tasksDir.children
            .filter(item => item instanceof TFile)
            .map(file => file.name.replace(this.MARKDOWN_EXTENSION, ''));

        return taskNames;
    }

    /**
     * Gets the file path of a specific Task.
     * @param epicName The name of the Epic to get the Task from.
     * @param storyName The name of the Story to get the Task from.
     * @param taskName The name of the Task to get the file path for.
     * @returns The file path of the Task, or an empty string if not found.
     */
    public GetTaskFilePath(epicName: string, storyName: string, taskName: string): string {
        const taskDirectories = this.GetTaskDirectories(epicName, storyName);
        if (!taskDirectories || taskDirectories.length === 0) return '';

        const tasksDir = taskDirectories[0];
        if (!(tasksDir instanceof TFolder)) {
            new Notice(`Tasks directory not found.`);
            return '';
        }

        const taskFile = tasksDir.children.find(task => task.name.replace(this.MARKDOWN_EXTENSION, '') === taskName);

        if (!taskFile) {
            new Notice(`Task file '${taskName}' does not exist.`);
            return '';
        }

        return taskFile.path;
    }

    public async ExtractFileOverview(filePath: string): Promise<string> {
        const file = this.App.vault.getAbstractFileByPath(filePath);
        
        if (!(file instanceof TFile)) {
            new Notice(`File '${filePath}' not found.`);
            return '';
        }

        const markdown = await this.App.vault.read(file);
        const match = markdown.match(this.OVERVIEW_REGEX);

        if (!match) {
            new Notice(`Overview section not found in file '${filePath}'.`);
            return '';
        }

        return match[1].trim();
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