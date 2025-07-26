import AgileProjectPlugin from "main";
import { App, Notice, TFile } from "obsidian";


class MarkdownParser {
    //code for parsing markdown content
    //This includes parsing headings, lists, and other markdown elements.

    App: App;

    Plugin: AgileProjectPlugin;

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

    public ParseHeadings(markdown: string): string[] {
        const headingRegex = /^(#+)\s+(.*)$/gm;
        const headings: string[] = [];
        let match;

        while ((match = headingRegex.exec(markdown)) !== null) {
            headings.push(match[2]);
        }

        return headings;
    }

    public ParseLists(markdown: string): string[] {
        const listRegex = /^\s*[-*]\s+(.*)$/gm;
        const lists: string[] = [];
        let match;

        while ((match = listRegex.exec(markdown)) !== null) {
            lists.push(match[1]);
        }

        return lists;
    }

}

export default MarkdownParser;