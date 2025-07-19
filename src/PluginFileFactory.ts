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
     * @param desc The description of the Epic.
     * @returns 
     */
    public CreateEpic(name: string, desc: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileEpicsDirectoryName}/${name}.md`;
        const properties = this.GetEpicProperties();
        const epicContent = this.GetEpicFileContent(desc);
        const fileContent = `${properties}\n${epicContent}`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Epic '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then((file) => {
            new Notice(`Epic '${name}' created successfully!`);
            this.App.workspace.getLeaf(false).openFile(file);
        }).catch((error) => {
            new Notice(`Failed to create Epic: ${error}`);
        });
    }

    /**
     * Creates a new Story file.
     * @param name The name of the Story.
     * @param desc The description of the Story.
     * @param epic The name of the Epic the Story belongs to.
     * @returns 
     */
    public CreateStory(name: string, desc: string, epic: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}/${name}.md`;
        const properties = this.GetStoryProperties(epic);
        const storyContent = this.GetStoryFileContent(desc);
        const fileContent = `${properties}\n${storyContent}`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Story '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then((file) => {
            new Notice(`Story '${name}' created successfully!`);
            this.App.workspace.getLeaf(false).openFile(file);
        }).catch((error) => {
            new Notice(`Failed to create Story: ${error}`);
        });
    }

    /**
     * Creates a new Task file.
     * @param name The name of the Task.
     * @param desc The description of the Task.
     * @param epic The name of the Epic the Task belongs to.
     * @param story The name of the Story the Task belongs to.
     * @param priority The priority level of the Task.
     * @returns 
     */
    public CreateTask(name: string, desc: string, epic: string, story: string, priority: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileTasksDirectoryName}/${name}.md`;
        const properties = this.GetTaskProperties(epic, story, priority);
        const taskContent = this.GetTaskFileContent(desc);
        const fileContent = `${properties}\n${taskContent}`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Task '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then((file) => {
            new Notice(`Task '${name}' created successfully!`);
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
            "Date Finished: yyyy-mm-dd",
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
            "Date Finished: yyyy-mm-dd",
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