import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import AgilePluginSettingTab from 'src/AgilePluginSettingTab';
import { DEFAULT_SETTINGS, AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import CreateMewAgileFileModal from 'src/CreateNewAgileFileModal';
import CreateStructureModal from 'src/CreateStructureModal';
import PluginStructureManager from 'src/PluginStructureManager';

// Remember to rename these classes and interfaces!

export default class AgileProjectPlugin extends Plugin {

	Settings: AgileProjectPluginSettings;

	StructureChecker: PluginStructureManager;

	async onload() {
		await this.loadSettings();

		setTimeout(() => {

			if (!this.StructureChecker.IsValidStructure()) {
				new Notice(`Invalid structure! Please create a folder named '${this.Settings.agileDirectoryPath}' in the root of your vault.`);
				new CreateStructureModal(this.app, this).open();
			}

		}, 100);

		new Notice('Agile Project Plugin loaded!');

		this.StructureChecker = new PluginStructureManager(this.app, this.Settings);



		this.addRibbonIcon('sheets-in-box', 'Update Agile', () => {
			new Notice('Update Agile functionality is not implemented yet!');
			new CreateMewAgileFileModal(this.app, this).open();
		});

		this.addSettingTab(new AgilePluginSettingTab(this.app, this));

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
	}

	async loadSettings() {
		this.Settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.Settings);
	}
}
