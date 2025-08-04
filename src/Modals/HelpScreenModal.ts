import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";

/**
 * Modal for displaying help information about the Agile Project Plugin.
 */
class HelpScreenModal extends Modal {

    /**
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    private Plugin: AgileProjectPlugin;

    /**
     * Constructor for the HelpScreenModal.
     * @param app - The Obsidian App instance.
     * @param plugin - The AgileProjectPlugin instance.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.Plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.addClass('centered-modal');

        // Title
        contentEl.createEl('h1', { text: 'Agile Plugin Help' });

        // Intro
        contentEl.createEl('p', { text: 'Use this plugin to manage tasks in an Agile format, similar to Jira. Organize your work with Epics, Stories, and Tasks.' });

        // Folder Info
        contentEl.createEl('p', { text: `Each Epic, Story, and Task is stored as a file under "${this.Plugin.Settings.agileDirectoryPath}". You can change this path in the settings.` });

        // Usage
        contentEl.createEl('h2', { text: 'Creating Agile Files' });
        contentEl.createEl('p', { text: 'Use the "Update Agile" icon on the left sidebar or press Ctrl + P and search for "Agile" to use commands. You can hide the sidebar icon in Settings.' });

        // Display
        contentEl.createEl('h2', { text: 'Agile Display' });
        contentEl.createEl('p', { text: 'To show your Agile structure, use a code block like this:' });

        contentEl.createEl('pre', {}, (pre) => {
            pre.createEl('code', {
                text: this.GetAgileDisplayCodeBlock()
            });
        });

        // Settings list
        contentEl.createEl('h3', { text: 'Display Options' });

        const options = [
            ['Epic', 'Filter Epics by name'],
            ['Story', 'Filter Stories by name'],
            ['Task', 'Filter Tasks by name'],
            ['ShortDescription', 'true = 1 line; false = full description'],
            ['Completed', 'true = only completed; false = only incomplete'],
            ['Sort', '"Alphabetical" or "Priority"'],
            ['Priority', 'Filter by Low, Medium, or High'],
            ['HotReload', 'true = auto-refresh on view; false = refresh on restart']
        ];

        for (const [key, desc] of options) {
            contentEl.createEl('p', {}, (el) => {
                el.createEl('b', { text: `${key}: ` });
                el.appendText(desc);
            });
        }

        // End note
        contentEl.createEl('p', { text: 'If nothing matches your filters, the display will say "No Structures Found."' });
    }

    /**
     * Gets the code block for displaying Agile project data.
     * @returns The code block as a string.
     */
    private GetAgileDisplayCodeBlock(): string {
        return `\`\`\`agile-display\nEpic=Epic Name\nStory=Story Name\nTask=Task Name\nShortDescription=true\nCompleted=true\nSort=Alphabetical\nPriority=Medium\nHotReload=true\n\`\`\``;
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default HelpScreenModal;