import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";

/**
 * Abstract class for creating file Modals in the Agile Project Plugin. Used to create Epics, Stories, and Tasks.
 */
abstract class CreateFileModal extends Modal {
    /**
     * @protected
     * The App instance for accessing Obsidian's API.
     */
    protected App: App;

    /**
     * @protected
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    protected Plugin: AgileProjectPlugin;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.App = app;
        this.Plugin = plugin;
    }

    /**
     * @public
     * Opens the Modal and sets up the UI for creating a new file.
     */
    abstract onOpen(): void;

    /**
     * @public
     * Closes the Modal and cleans up the content element.
     */
    abstract onClose(): void;

    /**
     * Creates a single-line text input field that fills the width of the parent element.
     * @param parent The parent element to attach the input field to.
     * @param labelText The text to display as the label for the input field.
     * @param placeholderText The placeholder text to display in the input field.
     * @returns The created HTMLInputElement.
     */
    protected SingleLineInput(parent: HTMLElement, labelText: string, placeholderText: string): HTMLInputElement {
        const div = parent.createDiv({ cls: 'file-create-field-div' });
        const label = div.createEl('label', { text: labelText, cls: 'file-create-field-text' });
        const input = div.createEl('input', { type: 'text', placeholder: placeholderText, cls: 'file-create-field-input' });

        return input;
    }

    /**
     * Creates a multi-line text input field that fills the width of the parent element.
     * @param parent The parent element to attach the input field to.
     * @param labelText The text to display as the label for the input field.
     * @param placeholderText The placeholder text to display in the input field.
     * @returns The created HTMLTextAreaElement.
     */
    protected MultiLineInput(parent: HTMLElement, labelText: string, placeholderText: string): HTMLTextAreaElement {
        const wrapper = parent.createDiv({ cls: 'file-create-description-div' });
        const label = wrapper.createEl('label', { text: labelText, cls: 'file-create-field-text' });
        const textarea = wrapper.createEl('textarea', { placeholder: placeholderText, cls: 'form-textarea' });

        return textarea;
    }

    /**
     * Creates a single-line dropdown field that fills the width of the parent element.
     * @param parent The parent element to attach the dropdown field to.
     * @param labelText The text to display as the label for the dropdown field.
     * @param options The list of options to include in the dropdown.
     * @returns The created HTMLSelectElement.
     */
    protected SingleLineDropdown(parent: HTMLElement, labelText: string, options: string[]): HTMLSelectElement {
        const div = parent.createDiv({ cls: 'file-create-field-div' });
        const label = div.createEl('label', { text: labelText, cls: 'file-create-field-text' });
        const select = div.createEl("select", { cls: 'file-create-field-input' });

        options.forEach((epic) => {
            select.createEl("option", {
                text: epic,
                value: epic
            });
        });

        return select;
    }
}

export default CreateFileModal;