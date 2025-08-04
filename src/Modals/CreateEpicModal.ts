import AgileProjectPlugin from "main";
import { App } from "obsidian";
import CreateFileModal from "./CreateFileModal";

/**
 * Modal for creating a new Epic in the Agile Project Plugin.
 */
class CreateEpicModal extends CreateFileModal {

    /**
     * @public
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    /**
     * Opens the Modal and sets up the UI for creating a new Epic.
     * @public
     */
    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Creating Agile Epic' });

        let nameInput = this.SingleLineInput(contentEl, 'Epic Name :', 'Enter epic name');
        let descInput = this.MultiLineInput(contentEl, 'Epic Description', 'Enter epic description');
        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });

        createBtn.addEventListener('click', async () => {
            this.Plugin.FileFactory.CreateEpic(nameInput.value, descInput.value);
            this.close();
        });
    }

    /**
     * Closes the Modal and cleans up the content element.
     */
    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateEpicModal;