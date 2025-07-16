import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import AgilePluginSettingTab from 'src/AgilePluginSettingTab';
import { DEFAULT_SETTINGS, AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import CreateEpicModal from 'src/Modals/CreateEpicModal';
import CreateNewAgileFileModal from 'src/Modals/CreateNewAgileFileModal';
import CreateStoryModal from 'src/Modals/CreateStoryModal';
import CreateStructureModal from 'src/Modals/CreateStructureModal';
import CreateTaskModal from 'src/Modals/CreateTaskModal';
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
				this.saveSettings();
			}
		}, 100);

		new Notice('Agile Project Plugin loaded!');

		this.StructureChecker = new PluginStructureManager(this.app, this.Settings);

		this.addRibbonIcon('sheets-in-box', 'Update Agile', () => {
			new CreateNewAgileFileModal(this.app, this).open();
		});

		this.addSettingTab(new AgilePluginSettingTab(this.app, this));

		this.addCommand({
			id: 'create-agile-file',
			name: 'Create New Agile File',
			callback: () => new CreateNewAgileFileModal(this.app, this).open()
		});

		this.addCommand({
			id: 'create-agile-epic',
			name: 'Create New Epic File',
			callback: () => new CreateEpicModal(this.app, this).open()
		});

		this.addCommand({
			id: 'create-agile-story',
			name: 'Create New Story File',
			callback: () => new CreateStoryModal(this.app, this).open()
		});

		this.addCommand({
			id: 'create-agile-task',
			name: 'Create New Task File',
			callback: () => new CreateTaskModal(this.app, this).open()
		});

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





