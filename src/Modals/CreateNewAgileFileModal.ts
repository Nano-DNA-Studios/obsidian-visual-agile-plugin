import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";
import CreateEpicModal from "./CreateEpicModal";
import CreateStoryModal from "./CreateStoryModal";
import CreateTaskModal from "./CreateTaskModal";

/**
 * Modal for creating a new Agile file, allowing the user to choose between Epic, Story, or Task.
 */
class CreateNewAgileFileModal extends Modal {
    
    /**
     * @public
     * The App instance for accessing Obsidian's API.
     */
    private App: App;

    /**
     * @public
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    private Plugin: AgileProjectPlugin;

    /**
     * @public
     * @param app The App instance for accessing Obsidian's API.
     * @param plugin The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.App = app;
        this.Plugin = plugin;
    }

    /**
     * @public
     * Opens the Modal and sets up the UI for creating a new Agile file.
     */
    onOpen() {
        let { contentEl } = this;

        contentEl.addClass('centered-modal');

        contentEl.createEl('h1', { text: 'Create New Agile File' });
        contentEl.createEl('p', { text: 'Select the type of Agile File you want to create' });

        let div = contentEl.createDiv({ cls: 'file-create-type-div' });

        let epicBtn = div.createDiv();
        let storyBtn = div.createDiv();
        let taskBtn = div.createDiv();

        epicBtn.innerHTML = this.GetEpicSVG();
        storyBtn.innerHTML = this.GetStorySVG();
        taskBtn.innerHTML = this.GetTaskSVG();

        epicBtn.addEventListener('click', () => {
            new CreateEpicModal(this.App, this.Plugin).open();
            this.close();
        });

        storyBtn.addEventListener('click', () => {
            new CreateStoryModal(this.App, this.Plugin).open();
            this.close();
        });

        taskBtn.addEventListener('click', () => {
            new CreateTaskModal(this.App, this.Plugin).open();
            this.close();
        });
    }

    /**
     * @public
     * Closes the Modal and cleans up the content element.
     */
    onClose(): void {
        let { contentEl } = this;
        contentEl.empty();
    }

    /**
     * Gets the SVG string for the Epic icon.
     * @returns SVG string for the Epic icon.
     * @private
     */
    private GetEpicSVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#A259FF"/>
  <path d="M13 2L6 13H11L11 22L18 11H13L13 2Z" fill="white"/>
</svg>`;
    }

    /**
     * Gets the SVG string for the Story icon.
     * @returns SVG string for the Story icon.
     * @private
     */
    private GetStorySVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#4CD964"/>
  <path d="M6 4C6 2.9 6.9 2 8 2H16C17.1 2 18 2.9 18 4V21L12 17L6 21V4Z" fill="white"/>
</svg>`;
    }

    /**
     * Gets the SVG string for the Task icon.
     * @returns SVG string for the Task icon.
     * @private
     */
    private GetTaskSVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#32ADE6"/>
  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
</svg>`;
    }
}

export default CreateNewAgileFileModal;