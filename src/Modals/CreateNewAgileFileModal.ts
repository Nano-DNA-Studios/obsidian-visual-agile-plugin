import AgileProjectPlugin from "main";
import { App, Modal, Notice } from "obsidian";
import CreateEpicModal from "./CreateEpicModal";
import CreateStoryModal from "./CreateStoryModal";


class CreateMewAgileFileModal extends Modal {
    private Plugin: AgileProjectPlugin;
    private App: App;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.App = app;
        this.Plugin = plugin;
    }

    onOpen() {
        let { contentEl } = this;

        contentEl.addClass('centered-modal');

        contentEl.createEl('h1', { text: 'Create New Agile File' });
        contentEl.createEl('p', { text: 'Select the type of Agile File you want to create' });

        let div = contentEl.createDiv();

        div.style.display = 'flex';
        div.style.justifyContent = 'space-around';
        div.style.flexDirection = 'row';

        let epycIcon = "https://github.com/Nano-DNA-Studios/obsidian-agile-project-plugin/blob/Creating-MVP/imgs/Epyc.png?raw=true"
        let storyIcon = "https://github.com/Nano-DNA-Studios/obsidian-agile-project-plugin/blob/Creating-MVP/imgs/Story.png?raw=true";
        let taskIcon = "https://github.com/Nano-DNA-Studios/obsidian-agile-project-plugin/blob/Creating-MVP/imgs/Task.png?raw=true";

        let epycBtn = div.createEl('img', { cls: "image", attr: { src: epycIcon, alt: 'Epyc' } });
        let storyBtn = div.createEl('img', { cls: "image", attr: { src: storyIcon, alt: 'Story' } });
        let taskBtn = div.createEl('img', { cls: "image", attr: { src: taskIcon, alt: 'Task' } });

        epycBtn.addEventListener('click', () => {
            new Notice('Epyc file creation is not implemented yet!');
            new CreateEpicModal(this.App, this.Plugin).open();
            this.close();
        });

        storyBtn.addEventListener('click', () => {
            new Notice('Story file creation is not implemented yet!');
            new CreateStoryModal(this.App, this.Plugin).open();
            this.close();
        });

        taskBtn.addEventListener('click', () => {
            new Notice('Task file creation is not implemented yet!');
            this.close();
        });

        // Additional UI elements and logic for creating a new Agile file can be added here
    }

    onClose(): void {
        let { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateMewAgileFileModal;