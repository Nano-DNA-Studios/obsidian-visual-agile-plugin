import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import StructureChecker from 'src/StructureChecker';

// Remember to rename these classes and interfaces!

interface AgileProjectPluginSettings {
	agileDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
	agileDirectoryName: 'Projects and Stories',
	mySetting: 'default'
}

export default class AgileProjectPlugin extends Plugin {
	settings: AgileProjectPluginSettings;

	async onload() {
		await this.loadSettings();

		new Notice('Agile Project Plugin loaded!');

		new StructureChecker(this.app).CheckStructure();


		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
