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
}

export default PluginStructureManager;