import { AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import { App, Notice, TFile, TFolder } from "obsidian";

class PluginStructureManager {

    App: App;

    Settings: AgileProjectPluginSettings;

    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    public CreateStructure(): void {
        this.App.vault.createFolder(this.Settings.agileDirectoryPath).then((agileFolder) => {
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileEpicsDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileStoriesDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileTasksDirectoryName}`);

            new Notice('Agile Project Structure created successfully!');
        });
    }

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

    public CreateEpic(name: string, desc: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileEpicsDirectoryName}/${name}.md`;
        const properties = `---\ntags:\n    - Epic\n    - Agile\n---`;
        const fileContent = `${properties}\n# Overview\n---\n${desc}\n\n# Stories\n---\n`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Epic '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then(() => {
            new Notice(`Epic '${name}' created successfully!`);
        }).catch((error) => {
            new Notice(`Failed to create Epic: ${error}`);
        });
    }

    public CreateStory(name: string, desc: string, epic: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}/${name}.md`;
        const properties = `---\nEpic: \"[[${epic}]]\"\ntags:\n    - Story\n    - Agile\n---`;
        const fileContent = `${properties}\n# Overview\n---\n${desc}\n\n# Tasks\n---\n`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Story '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then(() => {
            new Notice(`Story '${name}' created successfully!`);
        }).catch((error) => {
            new Notice(`Failed to create Story: ${error}`);
        });
    }

    public CreateTask(name: string, desc: string, epic: string, story: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileTasksDirectoryName}/${name}.md`;
        const properties = `---\nEpic: \"[[${epic}]]\"\nStory: \"[[${story}]]\"\ntags:\n    - Task\n    - Agile\n---`;
        const fileContent = `${properties}\n# Overview\n---\n${desc}\n\n# Notes and Exploration\n---\n`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Task '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then(() => {
            new Notice(`Task '${name}' created successfully!`);
        }).catch((error) => {
            new Notice(`Failed to create Task: ${error}`);
        });
    }

    public GetEpics(): string[] {
        const epicsDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileEpicsDirectoryName}`);
        if (!epicsDir) {
            new Notice(`Epics directory '${this.Settings.agileEpicsDirectoryName}' not found.`);
            return [];
        }

        const epicFiles = epicsDir.children.filter(item => item instanceof TFile && item.name.endsWith(".md"));
        const epicNames = epicFiles.map(file => file.name.split('.')[0]);

        return epicNames;
    }

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
        const storyNames = storyFilesOfEpic.map(file => file.name.split('.')[0]);

        return storyNames;
    }
}

export default PluginStructureManager;