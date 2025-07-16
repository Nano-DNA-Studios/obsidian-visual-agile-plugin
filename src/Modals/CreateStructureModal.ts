import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";
import "../../styles.css";

class CreateStructureModal extends Modal {

    private Plugin: AgileProjectPlugin;
    private App: App;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.App = app;
        this.Plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');

        contentEl.createEl('h1', { text: 'Creating Agile Project Structure' });
        contentEl.createEl('p', { text: 'Agile Project Directories are not detected in the Vault.' });
        contentEl.createEl('p', { text: `The following directory structure must be made.` });

        contentEl.createEl('ul', {}, (ul) => {
            const parentLi = ul.createEl('li', { text: this.Plugin.Settings.agileDirectoryPath });

            const nestedUl = parentLi.createEl('ul');
            nestedUl.createEl('li', { text: this.Plugin.Settings.agileEpycsDirectoryName });
            nestedUl.createEl('li', { text: this.Plugin.Settings.agileStoriesDirectoryName });
            nestedUl.createEl('li', { text: this.Plugin.Settings.agileTasksDirectoryName });
        });

        contentEl.createEl('p', { text: 'Click "Yes" to create this structure automatically' });

        let resultDiv = contentEl.createDiv({ cls: 'result-div' });
        let yesBtn = resultDiv.createEl('button', { text: 'Yes', cls: 'result-button' });
        let noBtn = resultDiv.createEl('button', { text: 'No', cls: 'result-button' })

        yesBtn.addEventListener('click', () => {
            this.close();
            this.Plugin.StructureChecker.CreateStructure();
        });

        noBtn.addEventListener('click', () => {
            this.close();
            this.Plugin.unload();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStructureModal;