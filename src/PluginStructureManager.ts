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
        let result = false;
        const root: TFolder = this.App.vault.getRoot();

        let parentDir : TFolder | null = this.App.vault.getFolderByPath(this.Settings.agileDirectoryPath)

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

    public CreateEpic (name: string, desc: string): void
    {
        this.App.vault.create(`${this.Settings.agileDirectoryPath}/${this.Settings.agileEpycsDirectoryName}/${name}.md`, `# ${name}\n\n${desc}`).then(() => {
            new Notice(`Epyc '${name}' created successfully!`);
        }).catch((error) => {
            new Notice(`Failed to create Epyc: ${error}`);
        });
    }
}

export default PluginStructureManager;