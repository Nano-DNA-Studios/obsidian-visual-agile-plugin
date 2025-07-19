import { Notice, Plugin } from 'obsidian';
import AgilePluginSettingTab from 'src/AgilePluginSettingTab';
import { DEFAULT_SETTINGS, AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';
import CreateEpicModal from 'src/Modals/CreateEpicModal';
import CreateNewAgileFileModal from 'src/Modals/CreateNewAgileFileModal';
import CreateStoryModal from 'src/Modals/CreateStoryModal';
import CreateStructureModal from 'src/Modals/CreateStructureModal';
import CreateTaskModal from 'src/Modals/CreateTaskModal';
import PluginFileFactory from 'src/PluginFileFactory';
import PluginStructureManager from 'src/PluginStructureManager';

/**
 * Main class for the Agile Project Plugin.
 * This class initializes the plugin, sets up the structure, and provides commands and settings.
 */
export default class AgileProjectPlugin extends Plugin {

	/**
	 * @public
	 * The settings for the Agile Project Plugin.
	 */
	public Settings: AgileProjectPluginSettings;

	/**
	 * @public
	 * The PluginStructureManager instance for managing the Agile Project directory structure.
	 */
	public StructureManager: PluginStructureManager;

	/**
	 * @public
	 * The PluginFileFactory instance for creating Agile Project files.
	 */
	public FileFactory: PluginFileFactory;

	/**
	 * @public
	 * Initializes the Agile Project Plugin.
	 */
	async onload() {
		await this.loadSettings();

		new Notice('Agile Project Plugin loaded!');

		this.StructureManager = new PluginStructureManager(this.app, this.Settings);
		this.FileFactory = new PluginFileFactory(this.app, this.Settings);

		setTimeout(() => {
			if (!this.StructureManager.IsValidStructure()) {
				new Notice(`Invalid structure! Please create a folder named '${this.Settings.agileDirectoryPath}' in the root of your vault.`);
				new CreateStructureModal(this.app, this).open();
				this.saveSettings();
			}
		}, 100);

		//Ribbon icon
		this.addRibbonIcon('sheets-in-box', 'Update Agile', () => {
			new CreateNewAgileFileModal(this.app, this).open();
		});

		//Settings Tab
		this.addSettingTab(new AgilePluginSettingTab(this.app, this));

		//Commands
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

	/**
	 * @public
	 * Unloads the Agile Project Plugin.
	 */
	onunload() {
	}

	/**
	 * @public
	 * Loads the settings for the Agile Project Plugin.
	 */
	async loadSettings() {
		this.Settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * @public
	 * Saves the settings for the Agile Project Plugin.
	 */
	async saveSettings() {
		await this.saveData(this.Settings);
	}
}