import { App, Notice, TFile, TFolder } from "obsidian";
import AgileProjectPlugin from "main";

class VaultParser {
    /**
     * @protected
     * The Obsidian App instance for accessing vault and workspace functionality.
     */
    App: App;

    /**
     * @protected
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    protected Plugin: AgileProjectPlugin;

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
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        this.App = app;
        this.Plugin = plugin;
    }

    /**
     * Gets the directories for all Epics in the Agile Project.
     * @returns An array of TFolder objects representing the Epic directories.
     */
    public GetEpicDirectories(): TFolder[] {

        if (!this.Plugin.StructureManager.IsValidStructure()) {
            new Notice(`Invalid structure! Please create a folder named '${this.Plugin.Settings.agileDirectoryPath}' in the root of your vault.`);
            return [];
        }

        const epicsDir = this.App.vault.getFolderByPath(`${this.Plugin.Settings.agileDirectoryPath}`);

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

        if (!this.Plugin.StructureManager.IsValidStructure()) {
            new Notice(`Invalid structure! Please create a folder named '${this.Plugin.Settings.agileDirectoryPath}' in the root of your vault.`);
            return [];
        }

        const storiesDir = this.App.vault.getFolderByPath(`${this.Plugin.Settings.agileDirectoryPath}/${epicName}`);

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
}

export default VaultParser;