import AgileProjectPlugin from "main";
import { App } from "obsidian";
import CreateFileModal from "./CreateFileModal";

/**
 * Modal for creating a new Story in the Agile Project Plugin.
 */
class CreateStoryModal extends CreateFileModal {

    /**
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    /**
     * Opens the Modal and sets up the UI for creating a new Story.
     * @public
     */
    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Create New Story' });
        contentEl.createEl('p', { text: 'Please enter the details for the new story.' });

        let nameInput = this.SingleLineInput(contentEl, 'Story Name:', 'Enter story name');
        let epicSelect = this.SingleLineDropdown(contentEl, 'Epic Name:', this.Plugin.StructureChecker.GetEpics());
        let descInput = this.MultiLineInput(contentEl, 'Story Description', 'Enter story description');

        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });
        createBtn.addEventListener('click', async () => {
            this.Plugin.FileFactory.CreateStory(nameInput.value, descInput.value, epicSelect.value);
            this.close();
        });
    }

    /**
     * Closes the Modal and cleans up the content element.
     */
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStoryModal;