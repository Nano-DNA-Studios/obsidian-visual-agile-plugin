import { App, Notice } from "obsidian";
import CreateFileModal from "./CreateFileModal";
import AgileProjectPlugin from "main";
import "../../styles.css";

/**
 * Modal for creating a new Task in the Agile Project Plugin.
 */
class CreateTaskModal extends CreateFileModal {

    /**
     * @public
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app, plugin);
    }

    /**
     * @public
     * Opens the Modal and sets up the UI for creating a new Task.
     */
    onOpen(): void {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Creating Agile Task' });

        let nameInput = this.SingleLineInput(contentEl, 'Task Name :', 'Enter task name');
        let epicDropdown = this.SingleLineDropdown(contentEl, 'Epic Name :', this.Plugin.StructureManager.GetEpics());
        let storyDropdown = this.SingleLineDropdown(contentEl, 'Story Name :', []);
        let priorityDropdown = this.SingleLineDropdown(contentEl, 'Task Priority :', ['Low', 'Medium', 'High']);
        let descInput = this.MultiLineInput(contentEl, 'Task Description', 'Enter task description');
        let createBtn = contentEl.createEl('button', { text: 'Create', cls: 'full-width' });

        epicDropdown.addEventListener('change', () => this.UpdateStoryDropdown(epicDropdown.value, storyDropdown));

        createBtn.addEventListener('click', async () => {
            this.Plugin.FileFactory.CreateTask(nameInput.value, descInput.value, epicDropdown.value, storyDropdown.value, priorityDropdown.value);
            this.close();
        });

        this.UpdateStoryDropdown(epicDropdown.value, storyDropdown);
    }

    /**
     * @public
     * Closes the Modal and cleans up the content element.
     */
    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }

    /**
     * Updates the Story dropdown based on the selected Epic.
     * @param epicName The name of the selected Epic.
     * @param storyDropdown The Story dropdown element to update.
     */
    private UpdateStoryDropdown(epicName: string, storyDropdown: HTMLSelectElement): void {
        storyDropdown.empty();
        this.Plugin.StructureManager.GetStories(epicName).then((stories) => {
            stories.forEach(story => {
                storyDropdown.createEl('option', { text: story, value: story });
            });
        }).catch((error) => {
            new Notice(`Failed to update stories: ${error}`);
        });
    }
}

export default CreateTaskModal;