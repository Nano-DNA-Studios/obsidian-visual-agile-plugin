import AgileProjectPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

/**
 * Setting tab for the Agile Project Plugin.
 * Allows users to configure plugin settings such as directory names.
 */
class AgilePluginSettingTab extends PluginSettingTab {

    /**
     * @public
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    Plugin: AgileProjectPlugin;

    /**
     * @public
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
        this.Plugin = plugin;
    }

    /**
     * @public
     * Displays the settings UI for the Agile Project Plugin.
     */
    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Agile Project Plugin Settings' });

        const agileDirectoryName = new Setting(containerEl)
            .setName('Agile Directory Name')
            .setDesc('The name of the directory where Agile projects and stories are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileDirectoryPath)
                .onChange(async (value) => {
                    this.Plugin.StructureManager.RenameDirectory(this.Plugin.Settings.agileDirectoryPath, value);
                    this.Plugin.Settings.agileDirectoryPath = value;
                    await this.Plugin.saveSettings();
                }));

        const agileEpicsDirectoryName = new Setting(containerEl)
            .setName('Epics Directory Name')
            .setDesc('The name of the directory where Agile Epics are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileEpicsDirectoryName)
                .onChange(async (value) => {
                    this.Plugin.StructureManager.RenameSubdirectory(this.Plugin.Settings.agileDirectoryPath, this.Plugin.Settings.agileEpicsDirectoryName, value);
                    this.Plugin.Settings.agileEpicsDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));

        const agileStoriesDirectoryName = new Setting(containerEl)
            .setName('Stories Directory Name')
            .setDesc('The name of the directory where Agile Stories are stored.')
            .addText(text => text
                .setPlaceholder('Enter directory name')
                .setValue(this.Plugin.Settings.agileStoriesDirectoryName)
                .onChange(async (value) => {
                    this.Plugin.StructureManager.RenameSubdirectory(this.Plugin.Settings.agileDirectoryPath, this.Plugin.Settings.agileStoriesDirectoryName, value);
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
                    this.Plugin.StructureManager.RenameSubdirectory(this.Plugin.Settings.agileDirectoryPath, this.Plugin.Settings.agileTasksDirectoryName, value);
                    this.Plugin.Settings.agileTasksDirectoryName = value;
                    await this.Plugin.saveSettings();
                }));
    }
}

export default AgilePluginSettingTab;