import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import AgilePluginSettingTab from 'src/AgilePluginSettingTab';
import StructureChecker from 'src/StructureChecker';

// Remember to rename these classes and interfaces!

interface AgileProjectPluginSettings {
	agileDirectoryName: string;
	agileEpycsDirectoryName: string;
	agileStoriesDirectoryName: string;
	agileTasksDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
	agileDirectoryName: 'Projects and Stories',
	agileEpycsDirectoryName: 'Epycs',
	agileStoriesDirectoryName: 'Stories',
	agileTasksDirectoryName: 'Tasks',
	mySetting: 'default'
}

export default class AgileProjectPlugin extends Plugin {
	settings: AgileProjectPluginSettings;

	async onload() {
		await this.loadSettings();

		new Notice('Agile Project Plugin loaded!');

		new StructureChecker(this.app, this.settings).CheckStructure();

		this.addSettingTab(new AgilePluginSettingTab(this.app, this));

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {

		this.settings = Object.assign({}, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
