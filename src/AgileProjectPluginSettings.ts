
/**
 * Interface and default settings for the Agile Project Plugin.
 * @module AgileProjectPluginSettings
 */
interface AgileProjectPluginSettings {
	agileDirectoryPath: string;
	showRibbonIcon: boolean;
}

/**
 * Default settings for the Agile Project Plugin.
 * These settings are used when the plugin is first installed or when settings are reset.
 */
const DEFAULT_SETTINGS: AgileProjectPluginSettings = {
	agileDirectoryPath: 'Projects and Stories',
	showRibbonIcon: true,
}

export { DEFAULT_SETTINGS }
export type { AgileProjectPluginSettings };