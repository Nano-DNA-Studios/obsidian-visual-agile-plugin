import { App, Notice } from "obsidian";
import { AgileProjectPluginSettings } from "./AgileProjectPluginSettings";

/**
 * Factory class for creating files in the Agile Project Plugin.
 * This class handles the creation of Agile files such as Epics, Stories, and Tasks.
 */
class PluginFileFactory {

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
     * @param app The Obsidian App instance for accessing vault and workspace functionality.
     * @param settings The settings for the Agile Project Plugin.
     */
    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    /**
     * @protected
     * Gets the current date in the format YYYY-MM-DD.
     */
    private GetTodaysDate(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Creates a new Epic file.
     * @param name The name of the Epic.
     * @param description The description of the Epic.
     * @returns 
     */
    public CreateEpic(name: string, description: string): void {
        const epicDirectory = `${this.Settings.agileDirectoryPath}/${name}`;
        const filePath = `${epicDirectory}/${name}.md`;
        const fileContent = `${this.GetEpicProperties()}\n${this.GetEpicFileContent(description)}`;

        if (this.App.vault.getFolderByPath(epicDirectory)) {
            new Notice(`Epic Directory '${name}' already exists!`);
            return;
        }

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Epic '${name}' already exists!`);
            return;
        }

        this.App.vault.createFolder(epicDirectory).then(() => {
            new Notice(`Epic Directory '${name}' created successfully!`);

            this.App.vault.create(filePath, fileContent).then((file) => {
                new Notice(`Epic '${name}' created successfully!`);
                this.App.workspace.getLeaf(false).openFile(file);
            }).catch((error) => {
                new Notice(`Failed to create Epic: ${error}`);
            });
        }).catch((error) => {
            new Notice(`Failed to create Epic Directory: ${error}`);
            return;
        });
    }

    /**
     * Creates a new Story file.
     * @param storyName The name of the Story.
     * @param description The description of the Story.
     * @param epicName The name of the Epic the Story belongs to.
     * @returns 
     */
    public CreateStory(storyName: string, description: string, epicName: string): void {
        const storyDirectory = `${this.Settings.agileDirectoryPath}/${epicName}/${storyName}`;
        const filePath = `${storyDirectory}/${storyName}.md`;
        const fileContent = `${this.GetStoryProperties(epicName)}\n${this.GetStoryFileContent(description)}`;

        if (this.App.vault.getFolderByPath(storyDirectory)) {
            new Notice(`Story Directory '${storyName}' already exists!`);
            return;
        }

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Story '${storyName}' already exists!`);
            return;
        }

        this.App.vault.createFolder(storyDirectory).then(() => {
            new Notice(`Story Directory '${storyName}' created successfully!`);

            this.App.vault.create(filePath, fileContent).then((file) => {
                new Notice(`Story '${storyName}' created successfully!`);
                this.App.workspace.getLeaf(false).openFile(file);
            }).catch((error) => {
                new Notice(`Failed to create Story: ${error}`);
            });
        }).catch((error) => {
            new Notice(`Failed to create Story Directory: ${error}`);
            return;
        });
    }

    /**
     * Creates a new Task file.
     * @param taskName The name of the Task.
     * @param desc The description of the Task.
     * @param epicName The name of the Epic the Task belongs to.
     * @param storyName The name of the Story the Task belongs to.
     * @param priority The priority level of the Task.
     * @returns 
     */
    public CreateTask(taskName: string, desc: string, epicName: string, storyName: string, priority: string): void {
        const taskDirectory = `${this.Settings.agileDirectoryPath}/${epicName}/${storyName}`;
        const filePath = `${taskDirectory}/${taskName}.md`;
        
        //const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileTasksDirectoryName}/${taskName}.md`;
        //const properties = this.GetTaskProperties(epicName, storyName, priority);
        //const taskContent = this.GetTaskFileContent(desc);
        const fileContent = `${this.GetTaskProperties(epicName, storyName, priority)}\n${this.GetTaskFileContent(desc)}`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Task '${taskName}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then((file) => {
            new Notice(`Task '${taskName}' created successfully!`);
            this.App.workspace.getLeaf(false).openFile(file);
        }).catch((error) => {
            new Notice(`Failed to create Task: ${error}`);
        });
    }

    /**
     * Creates a new Task file.
     * @param epicName The name of the Epic the Task belongs to.
     * @param storyName The name of the Story the Task belongs to.
     * @param priority The priority level of the Task.
     * @returns 
     */
    private GetTaskProperties(epicName: string, storyName: string, priority: string): string {
        return [
            "---",
            `Epic: "[[${epicName}]]"`,
            `Story: "[[${storyName}]]"`,
            `Priority: ${priority}`,
            "tags:",
            "    - Task",
            "    - Agile",
            "Completed: false",
            `Date Created: ${this.GetTodaysDate()}`,
            "Date Finished: ",
            "---"
        ].join("\n");
    }

    /**
     * Gets the frontmatter properties for a Story file.
     * @param epicName The name of the Epic the Story belongs to.
     * @returns The frontmatter properties for the Story file.
     */
    private GetStoryProperties(epicName: string): string {
        return [
            "---",
            `Epic: "[[${epicName}]]"`,
            "tags:",
            "    - Story",
            "    - Agile",
            `Date Created: ${this.GetTodaysDate()}`,
            "Date Finished: ",
            "---"
        ].join("\n");
    }

    /**
     * Gets the frontmatter properties for an Epic file.
     * @returns The frontmatter properties for the Epic file.
     */
    private GetEpicProperties(): string {
        return [
            "---",
            "tags:",
            "    - Epic",
            "    - Agile",
            `Date Created: ${this.GetTodaysDate()}`,
            "---"
        ].join("\n");
    }

    /**
     * Gets the frontmatter properties for a Task file.
     * @param description The description of the Task.
     * @returns The frontmatter properties for the Task file.
     */
    private GetTaskFileContent(description: string): string {
        return [
            "# Overview",
            "---",
            `${description}`,
            "# Notes and Exploration",
            "---",
            ""
        ].join("\n");
    }

    /**
     * Gets the frontmatter properties for a Story file.
     * @param description The description of the Story.
     * @returns The frontmatter properties for the Story file.
     */
    private GetStoryFileContent(description: string): string {
        return [
            "# Overview",
            "---",
            `${description}`,
            "# Tasks",
            "---",
            ""
        ].join("\n");
    }

    /**
     * Gets the frontmatter properties for an Epic file.
     * @param description The description of the Epic.
     * @returns The frontmatter properties for the Epic file.
     */
    private GetEpicFileContent(description: string): string {
        return [
            "# Overview",
            "---",
            `${description}`,
            "# Stories",
            "---",
            ""
        ].join("\n");
    }
}

export default PluginFileFactory;