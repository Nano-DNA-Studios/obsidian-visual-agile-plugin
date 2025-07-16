import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";
import { text } from "stream/consumers";

abstract class CreateFileModal extends Modal {
    protected App: App;
    protected Plugin: AgileProjectPlugin;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.App = app;
        this.Plugin = plugin;
    }

    abstract onOpen(): void;
    abstract onClose(): void;

    protected SingleLineInput(parent: HTMLElement, labelText: string, placeholderText: string): HTMLInputElement {
        const div = parent.createDiv({ cls: 'file-create-field-div' });
        const label = div.createEl('label', { text: labelText, cls: 'file-create-field-text' });
        const input = div.createEl('input', { type: 'text', placeholder: placeholderText, cls: 'file-create-field-input' });

        return input;
    }

    protected MultiLineInput(parent: HTMLElement, labelText: string, placeholderText: string): HTMLTextAreaElement {
        const wrapper = parent.createDiv({ cls: 'file-create-description-div' });
        const label = wrapper.createEl('label', { text: labelText, cls: 'file-create-field-text' });
        const textarea = wrapper.createEl('textarea', { placeholder: placeholderText, cls: 'form-textarea' });

        return textarea;
    }


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