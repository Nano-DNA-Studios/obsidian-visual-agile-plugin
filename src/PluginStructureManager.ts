import { AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import { App, Notice, TFolder } from "obsidian";

class PluginStructureManager {

    App: App;

    Settings: AgileProjectPluginSettings;

    constructor(app: App, settings: AgileProjectPluginSettings) {
        this.App = app;
        this.Settings = settings;
    }

    public CreateStructure(): void {
        this.App.vault.createFolder(this.Settings.agileDirectoryPath).then((agileFolder) => {
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileEpycsDirectoryName}`);
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

        let epycDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileEpycsDirectoryName}`);
        let storiesDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}`);
        let tasksDir = this.App.vault.getFolderByPath(`${this.Settings.agileDirectoryPath}/${this.Settings.agileTasksDirectoryName}`);

        if (!epycDir || !storiesDir || !tasksDir) {
            new Notice(`One or more required directories are missing in '${this.Settings.agileDirectoryPath}'.`);
            return false;
        }

        return true;
    }

    public CreateEpic(name: string, desc: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileEpycsDirectoryName}/${name}.md`;
        const properties = `---\ntags:\n    - Epic\n    - Agile\n---`;
        const fileContent = `${properties}\n# Overview\n---\n${desc}\n\n# Stories\n---\n`;

        if (this.App.vault.getAbstractFileByPath(filePath)) {
            new Notice(`Epyc '${name}' already exists!`);
            return;
        }

        this.App.vault.create(filePath, fileContent).then(() => {
            new Notice(`Epyc '${name}' created successfully!`);
        }).catch((error) => {
            new Notice(`Failed to create Epyc: ${error}`);
        });
    }

    public CreateStory(name: string, desc: string): void {
        const filePath = `${this.Settings.agileDirectoryPath}/${this.Settings.agileStoriesDirectoryName}/${name}.md`;
        const properties = `---\ntags:\n    - Story\n    - Agile\n---`;
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
}

export default PluginStructureManager;