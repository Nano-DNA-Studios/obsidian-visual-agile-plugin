import { App } from "obsidian";

interface IAgileProjectPluginSettings {
	agileDirectoryName: string;
	mySetting: string;
}

const DEFAULT_SETTINGS: IAgileProjectPluginSettings = {
    agileDirectoryName: 'Projects and Stories',
    mySetting: 'default'
}

export {DEFAULT_SETTINGS}
export type { IAgileProjectPluginSettings };