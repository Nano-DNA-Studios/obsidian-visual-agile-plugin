
/**
 * Interface and default settings for the Agile Project Plugin.
 * @module AgileProjectPluginSettings
 */
interface AgileProjectPluginSettings {
	agileDirectoryPath: string;
	agileEpicsDirectoryName: string;
	agileStoriesDirectoryName: string;
	agileTasksDirectoryName: string;
	mySetting: string;
}

/**
 * Default settings for the Agile Project Plugin.
 * These settings are used when the plugin is first installed or when settings are reset.
 */
const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
	agileDirectoryPath: 'Projects and Stories',
	agileEpicsDirectoryName: 'Epics',
	agileStoriesDirectoryName: 'Stories',
	agileTasksDirectoryName: 'Tasks',
	mySetting: 'default'
}

export { DEFAULT_SETTINGS }
export type { AgileProjectPluginSettings };