import { App } from "obsidian";

interface AgileProjectPluginSettings {
	agileDirectoryPath: string;
	agileEpicsDirectoryName: string;
	agileStoriesDirectoryName: string;
	agileTasksDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
    agileDirectoryPath: 'Projects and Stories',
	agileEpicsDirectoryName: 'Epics',
	agileStoriesDirectoryName: 'Stories',
	agileTasksDirectoryName: 'Tasks',
	mySetting: 'default'
}

export {DEFAULT_SETTINGS}
export type { AgileProjectPluginSettings};