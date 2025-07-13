import AgileProjectPlugin from "main";
import { App, Notice, PluginSettingTab, Setting, TFolder } from "obsidian";


class AgilePluginSettingTab extends PluginSettingTab {
    App: App;

    Plugin: AgileProjectPlugin;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
        this.App = app;
        this.Plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Agile Project Plugin Settings' });

        const agileDirectoryName = new Setting(containerEl)
            .setName('Agile Directory Name')
            .setDesc('The name of the directory where Agile projects and stories are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileDirectoryName)
                .onChange(async (value) => {
                    this.RenameDirectory(this.Plugin.Settings.agileDirectoryName, value);
                    this.Plugin.Settings.agileDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));

        const agileEpycsDirectoryName = new Setting(containerEl)
            .setName('Epycs Directory Name')
            .setDesc('The name of the directory where Agile Epycs are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileEpycsDirectoryName)
                .onChange(async (value) => {
                    this.RenameSubdirectory(this.Plugin.Settings.agileDirectoryName, this.Plugin.Settings.agileEpycsDirectoryName, value);
                    this.Plugin.Settings.agileEpycsDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));

        const agileStoriesDirectoryName = new Setting(containerEl)
            .setName('Stories Directory Name')
            .setDesc('The name of the directory where Agile Stories are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileStoriesDirectoryName)
                .onChange(async (value) => {
                    this.RenameSubdirectory(this.Plugin.Settings.agileDirectoryName, this.Plugin.Settings.agileStoriesDirectoryName, value);
                    this.Plugin.Settings.agileStoriesDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));

        const agileTasksDirectoryName = new Setting(containerEl)
            .setName('Tasks Directory Name')
            .setDesc('The name of the directory where Agile Tasks are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name') 
                .setValue(this.Plugin.Settings.agileTasksDirectoryName)
                .onChange(async (value) => {
                    this.RenameSubdirectory(this.Plugin.Settings.agileDirectoryName, this.Plugin.Settings.agileTasksDirectoryName, value);
                    this.Plugin.Settings.agileTasksDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));
    }

    private RenameDirectory(oldName: string, newName: string): void {
        const root = this.app.vault.getRoot();

        root.children.forEach((item) => {
            if (!(item instanceof TFolder)) 
                return;

            if (item.name == oldName)
                this.app.vault.rename(item, newName);
        });
    }

    private RenameSubdirectory(parentDir : string, oldName: string, newName: string): void {
       
        let parent : TFolder | null = this.app.vault.getFolderByPath(parentDir);

        if (!parent) {
            new Notice(`Parent directory '${parentDir}' not found.`);
            return;
        }

        parent.children.forEach((item) => {
            if (!(item instanceof TFolder)) 
                return;

            if (item.name == oldName)
                this.app.vault.rename(item, `${parent.name}/${newName}`);
        });
    }
}

export default AgilePluginSettingTab;