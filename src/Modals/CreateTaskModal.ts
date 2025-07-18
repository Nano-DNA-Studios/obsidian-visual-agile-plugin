import { App, Notice } from "obsidian";
import CreateFileModal from "./CreateFileModal";
import AgileProjectPlugin from "main";
import "../../styles.css";

class CreateTaskModal extends CreateFileModal {

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    onOpen(): void {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Creating Agile Task' });

        let nameInput = this.SingleLineInput(contentEl, 'Task Name :', 'Enter task name');
        let epicDropdown = this.SingleLineDropdown(contentEl, 'Epic Name :', this.Plugin.StructureChecker.GetEpics());
        let storyDropdown = this.SingleLineDropdown(contentEl, 'Story Name :', []);
        let priorityDropdown = this.SingleLineDropdown(contentEl, 'Task Priority :', ['Low', 'Medium', 'High']);
        let descInput = this.MultiLineInput(contentEl, 'Task Description', 'Enter task description');
        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });

        epicDropdown.addEventListener('change', () => this.UpdateStoryDropdown(epicDropdown.value, storyDropdown));

        createBtn.addEventListener('click', async () => {
            this.Plugin.StructureChecker.CreateTask(nameInput.value, descInput.value, epicDropdown.value, storyDropdown.value, priorityDropdown.value);
            this.close();
        });

        this.UpdateStoryDropdown(epicDropdown.value, storyDropdown);
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }

    private UpdateStoryDropdown(epicName: string, storyDropdown: HTMLSelectElement): void {
        storyDropdown.empty();
        this.Plugin.StructureChecker.GetStories(epicName).then((stories) => {
            stories.forEach(story => {
                storyDropdown.createEl('option', { text: story, value: story });
            });
        }).catch((error) => {
            new Notice(`Failed to update stories: ${error}`);
        });
    }
}

export default CreateTaskModal;