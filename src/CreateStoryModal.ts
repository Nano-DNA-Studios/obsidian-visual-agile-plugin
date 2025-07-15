import AgileProjectPlugin from "main";
import { App, Modal, Notice, Setting } from "obsidian";
import CreateFileModal from "./CreateFileModal";


class CreateStoryModal extends CreateFileModal {
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Create New Story' });
        contentEl.createEl('p', { text: 'Please enter the details for the new story.' });

        let nameInput = this.SingleLineInput(contentEl, 'Story Name:', 'Enter story name');
        let epicSelect = this.SingleLineDropdown(contentEl, 'Epic Name:', this.Plugin.StructureChecker.GetEpics());
        let descInput = this.SingleLineInput(contentEl, 'Story Description:', 'Enter story description');

        //this.CreateEpicDropdown(contentEl);

        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });
        createBtn.addEventListener('click', async () => {
            this.Plugin.StructureChecker.CreateStory(nameInput.value, descInput.value, epicSelect.value);
            new Notice('Story file creation is not implemented yet!');
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStoryModal;