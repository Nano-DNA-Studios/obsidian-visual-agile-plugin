import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";

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

    protected SingleLineInput (parent: HTMLElement, labelText: string, placeholderText: string): HTMLInputElement {
        const div = parent.createDiv({ cls: 'file-create-field-div' });
        const label = div.createEl('label', { text: labelText , cls: 'file-create-field-text' });
        const input = div.createEl('input', { type: 'text', placeholder: placeholderText, cls: 'file-create-field-input' });

        return input;
    }
}

export default CreateFileModal;