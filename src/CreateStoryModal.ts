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
        let descInput = this.SingleLineInput(contentEl, 'Story Description:', 'Enter story description');

        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });
        createBtn.addEventListener('click', async () => {
            this.Plugin.StructureChecker.CreateStory(nameInput.value, descInput.value);
            new Notice('Story file creation is not implemented yet!');
            this.close();
        });

        new Setting(contentEl)
            .setName("Options")
            .addDropdown(drop => {
                drop.addOption("a", "Option A");
                drop.addOption("b", "Option B");
                drop.addOption("c", "Option C");
                drop.setValue("a"); // default
                drop.onChange(value => {
                    console.log("Selected:", value);
                });
            });


        //Wrap all of this into a Function and return the drop down. Put it in the CreateNewAgileFileModal.ts
        // Create wrapper
		const wrapper = contentEl.createEl("div", { cls: "dropdown-wrapper" });

		// Create select
		const select = wrapper.createEl("select");

		// Add options
		["Option A", "Option B", "Option C"].forEach((label, i) => {
			select.createEl("option", {
				text: label,
				value: `option-${i}`
			});
		});

		// Handle change
		select.onchange = () => {
			console.log("Selected:", select.value);
		};

        // Additional UI elements for story creation can be added here
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStoryModal;