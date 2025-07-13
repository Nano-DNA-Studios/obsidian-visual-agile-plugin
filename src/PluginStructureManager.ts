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

        this.App.vault.createFolder(this.Settings.agileDirectoryName).then((agileFolder) => {
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileEpycsDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileStoriesDirectoryName}`);
            this.App.vault.createFolder(`${agileFolder.path}/${this.Settings.agileTasksDirectoryName}`);

            new Notice('Agile Project Structure created successfully!');
        });
    }


    public IsValidStructure(): boolean {
        let result = false;
        const root: TFolder = this.App.vault.getRoot();

        root.children.forEach((item) => {

            if (!(item instanceof TFolder))
                return;

            if (item.name == this.Settings.agileDirectoryName) {
                if (!this.IsValidSubstructure(item)) {
                    new Notice(`Invalid substructure in folder: ${item.name}. It should contain 'Epics', 'Stories', and 'Tasks' folders.`);
                    return;
                }

                new Notice(`Found Projects and Stories folder: ${item.name}`);
                result = true;
            }
        });

        return result;
    }

    private IsValidSubstructure(folder: TFolder): boolean {
        let epycs = false;
        let stories = false;
        let tasks = false;

        folder.children.forEach((item) => {
            if (!(item instanceof TFolder))
                return;

            if (item.name == 'Epycs')
                epycs = true;
            else if (item.name == 'Stories')
                stories = true;
            else if (item.name == 'Tasks')
                tasks = true;
        });

        return epycs && stories && tasks;
    }
}

export default PluginStructureManager;