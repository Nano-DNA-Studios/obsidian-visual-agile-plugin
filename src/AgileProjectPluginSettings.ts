import { App } from "obsidian";

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

export {DEFAULT_SETTINGS}
export type { AgileProjectPluginSettings};