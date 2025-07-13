import AgileProjectPlugin from "main";
import { App, Modal, Notice } from "obsidian";


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

        let epycIcon = "https://github.com/Nano-DNA-Studios/obsidian-agile-project-plugin/blob/Creating-MVP/DNA.jpg?raw=true"

        let epycBtn = div.createEl('button', { cls: "image"});
        let storyBtn = div.createEl('button', { cls: "image" });
        let taskBtn = div.createEl('button', { cls: "image" });

        //let epycBtn = div.createEl('img', { cls: "image", attr: { src: epycIcon, alt: 'Epyc' } });
        //let storyBtn = div.createEl('img', { cls: "image", attr: { src: "https://private-user-images.githubusercontent.com/93613553/362830406-a0212c54-9529-4e4a-9beb-1a195dca528b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzNzkyMzIsIm5iZiI6MTc1MjM3ODkzMiwicGF0aCI6Ii85MzYxMzU1My8zNjI4MzA0MDYtYTAyMTJjNTQtOTUyOS00ZTRhLTliZWItMWExOTVkY2E1MjhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDAzNTUzMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBlOGY2NzlmOTNmMGM4ZTdjMjI3MmFmNWI0MzA4NDNkYWMzZDQzYmY4ODc2NDMwMDQ2MjQ4NjA3NWViOTFkMDImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.FoqOWCTomiwMcm4Dy6MRf3Y6chj1wwbxYWOLkidA_Pk", alt: 'Epyc' } });
        //let taskBtn = div.createEl('img', { cls: "image", attr: { src: "https://private-user-images.githubusercontent.com/93613553/362830406-a0212c54-9529-4e4a-9beb-1a195dca528b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzNzkyMzIsIm5iZiI6MTc1MjM3ODkzMiwicGF0aCI6Ii85MzYxMzU1My8zNjI4MzA0MDYtYTAyMTJjNTQtOTUyOS00ZTRhLTliZWItMWExOTVkY2E1MjhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDAzNTUzMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBlOGY2NzlmOTNmMGM4ZTdjMjI3MmFmNWI0MzA4NDNkYWMzZDQzYmY4ODc2NDMwMDQ2MjQ4NjA3NWViOTFkMDImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.FoqOWCTomiwMcm4Dy6MRf3Y6chj1wwbxYWOLkidA_Pk", alt: 'Epyc' } });

        epycBtn.addEventListener('click', () => {
            new Notice('Epyc file creation is not implemented yet!');
            this.close();
        });

        storyBtn.addEventListener('click', () => {
            new Notice('Story file creation is not implemented yet!');
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