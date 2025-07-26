import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";
import CreateEpicModal from "./CreateEpicModal";
import CreateStoryModal from "./CreateStoryModal";
import CreateTaskModal from "./CreateTaskModal";
import SVGFactory from "src/SVGFactory";

/**
 * Modal for creating a new Agile file, allowing the user to choose between Epic, Story, or Task.
 */
class CreateNewAgileFileModal extends Modal {

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

        epicBtn.innerHTML = SVGFactory.GetEpicSVG();
        storyBtn.innerHTML = SVGFactory.GetStorySVG();
        taskBtn.innerHTML = SVGFactory.GetTaskSVG();

        epicBtn.addEventListener('click', () => {
            new CreateEpicModal(this.app, this.Plugin).open();
            this.close();
        });

        storyBtn.addEventListener('click', () => {
            new CreateStoryModal(this.app, this.Plugin).open();
            this.close();
        });

        taskBtn.addEventListener('click', () => {
            new CreateTaskModal(this.app, this.Plugin).open();
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
}

export default CreateNewAgileFileModal;