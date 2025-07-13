import { App, Modal } from "obsidian";
import { AgileProjectPluginSettings } from 'src/AgileProjectPluginSettings';

class CreateStructureModal extends Modal {
    private Settings: AgileProjectPluginSettings;
    private App: App; // Replace with actual type if available

    constructor(app: App, plugin: AgileProjectPluginSettings) {
        super(app);
        this.Settings = plugin;
        this.App = app;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.style.textAlign = 'center';
        contentEl.style.padding = '5px';
        contentEl.style.display = 'flex';
        contentEl.style.flexDirection = 'column';
        contentEl.style.alignItems = 'center';

        contentEl.createEl('h1', { text: 'Creating Agile Project Structure' });
        contentEl.createEl('p', { text: 'No Agile Project Structure is detected on the Device.' });
        contentEl.createEl('p', { text: `The Following folders will be created:` });

        contentEl.createEl('ul', {}, (ul) => {
            // Parent item
            const parentLi = ul.createEl('li', { text: this.Settings.agileDirectoryName });

            // Nested list inside parent
            const nestedUl = parentLi.createEl('ul');
            nestedUl.createEl('li', { text: this.Settings.agileEpycsDirectoryName });
            nestedUl.createEl('li', { text: this.Settings.agileStoriesDirectoryName });
            nestedUl.createEl('li', { text: this.Settings.agileTasksDirectoryName });
        });

        contentEl.createEl('p', { text: 'Would you like to create it now?' });

        let resultDiv = contentEl.createDiv();
        resultDiv.style.display = 'flex';
        resultDiv.style.justifyContent = 'space-around';
        resultDiv.style.flexDirection = 'row';

        let yesBtn = resultDiv.createEl('button', { text: 'Yes' });
        let noBtn = resultDiv.createEl('button', { text: 'No' })

        yesBtn.addEventListener('click', async () => {
            this.close();
        });

        noBtn.addEventListener('click', () => {
            this.close();
        });

        yesBtn.style.marginRight = '10px';
        noBtn.style.marginLeft = '10px';
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStructureModal;