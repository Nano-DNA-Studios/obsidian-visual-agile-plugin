import AgileProjectPlugin from "main";
import { App, Notice, TFile } from "obsidian";

/**
 * MarkdownParser class for parsing Markdown files in the Agile Project Plugin.
 */
class MarkdownParser {

    /**
     * @public
     * The Obsidian App instance for accessing vault and workspace functionality.
     */
    App: App;

    /**
     * @public
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    Plugin: AgileProjectPlugin;

    /**
     * @public
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        this.App = app;
        this.Plugin = plugin;
    }

    /**
     * @protected
     * The regular expression for extracting the Overview section from a Markdown file.
     */
    private OVERVIEW_REGEX = /# Overview\s*-{2,}\s*([\s\S]*?)(?=\n# )/;

    /**
     * @protected
     * The regular expression for checking if a Task is completed.
     */
    private COMPLETED_REGEX = /completed: (true|false)/;

    /**
     * Extracts the Overview section from a Markdown file.
     * @param filePath The path to the Markdown file.
     * @returns A promise that resolves to the Overview section text.
     */
    public async ExtractFileOverview(filePath: string): Promise<string> {
        const file = this.App.vault.getAbstractFileByPath(filePath);

        if (!(file instanceof TFile)) {
            new Notice(`File '${filePath}' not found.`);
            return '';
        }

        const markdown = await this.App.vault.read(file);
        const match = markdown.match(this.OVERVIEW_REGEX);

        if (!match) {
            new Notice(`Overview section not found in file '${filePath}'.`);
            return '';
        }

        return match[1].trim();
    }

    /**
     * Checks if a Task is completed based on the 'completed' field in the Markdown file.
     * @param filePath The path to the Markdown file.
     * @returns A promise that resolves to true if the task is completed, false otherwise.
     */
    public async IsTaskCompleted(filePath: string): Promise<boolean> {
        const file = this.App.vault.getAbstractFileByPath(filePath);

        if (!(file instanceof TFile)) {
            new Notice(`File '${filePath}' not found.`);
            return false;
        }

        const markdown = await this.App.vault.read(file);
        const match = markdown.toLowerCase().match(this.COMPLETED_REGEX);

        if (!match) {
            new Notice(`Completed section not found in file '${filePath}'.`);
            return false;
        }

        return match[1].trim() === 'true';
    }
}

export default MarkdownParser;