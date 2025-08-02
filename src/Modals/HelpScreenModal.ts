import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";


class HelpScreenModal extends Modal {

    private Plugin: AgileProjectPlugin;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.Plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Agile Project Plugin Help' });

        contentEl.createEl('p', { text: 'This plugin helps you manage Agile projects within Obsidian.' });

        //You can create Epics, Stories, and Tasks using the Commands in the Command Palette or the Ribbon Icon.


        
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}