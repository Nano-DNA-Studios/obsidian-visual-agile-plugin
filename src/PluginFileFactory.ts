import { App, Notice } from "obsidian";
import { AgileProjectPluginSettings } from "./AgileProjectPluginSettings";

class PluginFileFactory {

    App: App;

    Settings: AgileProjectPluginSettings;

    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    private GetTodaysDate(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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