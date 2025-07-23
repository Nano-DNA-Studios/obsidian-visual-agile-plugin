import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";
import "../../styles.css";
import { get } from "http";

/**
 * Modal for creating the Agile Project structure in the vault.
 */
class CreateStructureModal extends Modal {

    /**
     * @public
     * The App instance for accessing Obsidian's API.
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

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');

        contentEl.createEl('h1', { text: 'Creating Agile Project Structure' });
        contentEl.createEl('p', { text: 'Agile Project Directory not detected in the Vault.' });
        contentEl.createEl('p', { text: 'This plugin requires a specific directory structure to function properly.' });
        contentEl.createEl('p', { text: 'This will be created automatically by pressing \"Yes\".' });
        contentEl.createEl('p', { text: 'As your Agile Project grows it will take the following form' });

        contentEl.createEl('pre', { cls: 'code-block' }, (pre) => {
            pre.createEl('code', {
                text: this.getStructure(),
            });
        });




        // contentEl.createEl('ul', {}, (ul) => {
        //     const parentLi = ul.createEl('li', { text: this.Plugin.Settings.agileDirectoryPath });

        //     const nestedUl = parentLi.createEl('ul');
        //     const epic1Li = nestedUl.createEl('li', { text: "Epic 1" });
        //     const epic2Li = nestedUl.createEl('li', { text: "Epic 2" });

        //     epic1Li.createEl('ul', {}, (subUl) => {
        //         const story1Li = subUl.createEl('li', { text: "Story 1" });
        //         story1Li.createEl('ul', {}, (storyUl) => {
        //             const taskDir = storyUl.createEl('li', { text: "Tasks" });
        //             taskDir.createEl('ul', {}, (taskUl) => {
        //                 taskUl.createEl('li', { text: "Task 1" });
        //                 taskUl.createEl('li', { text: "Task 2" });
        //                 taskUl.createEl('li', { text: "Task 3" });
        //             });
        //         });

        //         const story2Li = subUl.createEl('li', { text: "Story 2" });
        //         story2Li.createEl('ul', {}, (storyUl) => {
        //             const taskDir = storyUl.createEl('li', { text: "Tasks" });
        //             taskDir.createEl('ul', {}, (taskUl) => {
        //                 taskUl.createEl('li', { text: "Task 1" });
        //                 taskUl.createEl('li', { text: "Task 2" });
        //                 taskUl.createEl('li', { text: "Task 3" });
        //             });
        //         });
        //     });

        //    epic2Li.createEl('ul', {}, (subUl) => {
        //        const story1Li = subUl.createEl('li', { text: "Story 1" });
        //         story1Li.createEl('ul', {}, (storyUl) => {
        //             const taskDir = storyUl.createEl('li', { text: "Tasks" });
        //             taskDir.createEl('ul', {}, (taskUl) => {
        //                 taskUl.createEl('li', { text: "Task 1" });
        //                 taskUl.createEl('li', { text: "Task 2" });
        //                 taskUl.createEl('li', { text: "Task 3" });
        //             });
        //         });

        //         const story2Li = subUl.createEl('li', { text: "Story 2" });
        //         story2Li.createEl('ul', {}, (storyUl) => {
        //             const taskDir = storyUl.createEl('li', { text: "Tasks" });
        //             taskDir.createEl('ul', {}, (taskUl) => {
        //                 taskUl.createEl('li', { text: "Task 1" });
        //                 taskUl.createEl('li', { text: "Task 2" });
        //                 taskUl.createEl('li', { text: "Task 3" });
        //             });
        //         });
        //    });
        // });

        contentEl.createEl('p', { text: 'Click "Yes" to create this structure automatically' });

        let resultDiv = contentEl.createDiv({ cls: 'result-div' });
        let yesBtn = resultDiv.createEl('button', { text: 'Yes', cls: 'result-button' });
        let noBtn = resultDiv.createEl('button', { text: 'No', cls: 'result-button' })

        yesBtn.addEventListener('click', () => {
            this.close();
            this.Plugin.StructureManager.CreateStructure();
        });

        noBtn.addEventListener('click', () => {
            this.close();
            this.Plugin.unload();
        });
    }

    private getStructure(): string {
        return `
Projects and Stories
├── Epic 1
│   ├── Story 1
│   │   └── Tasks
│   │       ├── Task 1
│   │       ├── Task 2
│   │       └── Task 3
│   └── Story 2
│       └── Tasks
│           ├── Task 1
│           ├── Task 2
│           └── Task 3
└── Epic 2
    ├── Story 1
    │   └── Tasks
    │       ├── Task 1
    │       ├── Task 2
    │       └── Task 3
    └── Story 2
        └── Tasks
            ├── Task 1
            ├── Task 2
            └── Task 3
    `.trim();
    }


    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default CreateStructureModal;