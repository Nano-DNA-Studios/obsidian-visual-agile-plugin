import { App } from "obsidian";

interface AgileProjectPluginSettings {
	agileDirectoryPath: string;
	agileEpycsDirectoryName: string;
	agileStoriesDirectoryName: string;
	agileTasksDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
    agileDirectoryPath: 'Projects and Stories',
	agileEpycsDirectoryName: 'Epycs',
	agileStoriesDirectoryName: 'Stories',
	agileTasksDirectoryName: 'Tasks',
	mySetting: 'default'
}

export {DEFAULT_SETTINGS}
export type { AgileProjectPluginSettings};