import { App } from "obsidian";

interface AgileProjectPluginSettings {
	agileDirectoryPath: string;
	agileEpycsDirectoryName: string;
	agileStoriesDirectoryName: string;
	agileTasksDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
    agileDirectoryPath: 'Agile',
	agileEpycsDirectoryName: 'Epycs',
	agileStoriesDirectoryName: 'Stories',
	agileTasksDirectoryName: 'Tasks',
	mySetting: 'default'
}

export {DEFAULT_SETTINGS}
export type { AgileProjectPluginSettings};