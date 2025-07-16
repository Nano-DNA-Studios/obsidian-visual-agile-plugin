import AgileProjectPlugin from "main";
import { App, Notice } from "obsidian";
import CreateFileModal from "./CreateFileModal";

class CreateEpicModal extends CreateFileModal {

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Creating Agile Epic' });

        let nameInput = this.SingleLineInput(contentEl, 'Epic Name :', 'Enter epic name');
        let descInput = this.SingleLineInput(contentEl, 'Epic Description :', 'Enter epic description');

        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });

        createBtn.addEventListener('click', async () => {

            this.Plugin.StructureChecker.CreateEpic(nameInput.value, descInput.value);
            new Notice('Epic file creation is not implemented yet!');
            this.close();
        });
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateEpicModal;