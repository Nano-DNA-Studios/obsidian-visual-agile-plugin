import AgileProjectPlugin from "main";
import { App, Plugin, TFile } from "obsidian";


class AgileDisplayMarkdownProcessor {

    /**
     * @protected
     * The Obsidian App instance for accessing vault and workspace functionality.
     */
    protected App: App;

    /**
     * @protected
     * The AgileProjectPlugin instance for accessing plugin-specific functionality.
     */
    protected Plugin: AgileProjectPlugin;

    /**
     * @param App - The Obsidian App instance.
     * @param Plugin - The AgileProjectPlugin instance.
     */
    constructor(App: App, Plugin: AgileProjectPlugin) {
        this.App = App;
        this.Plugin = Plugin;
    }

    /**
     * @public
     * Registers the Markdown processor for displaying Agile project data.
     */
    public RegisterMarkdownProcessor(): void {
        this.Plugin.registerMarkdownCodeBlockProcessor('agile-display', (source, el, ctx) => {
            this.ProcessMarkdown(source, el);
        });
    }

    /**
     * @public
     * Processes the Markdown content and displays Agile project data in a custom UI.
     */
    public ProcessMarkdown(markdown: string, element: HTMLElement): void {

        const wrapper = document.createElement("div");
        const epics: string[] = this.Plugin.StructureManager.GetEpics();

        epics.forEach(epic => {
            this.ProcessEpic(epic, wrapper);
        });

        element.appendChild(wrapper);
    }

    /**
     * @private
     * Processes an individual Epic and displays its details in the UI.
     */
    private ProcessEpic(epic: string, element: HTMLElement): void {
        const epicElement = document.createElement("div");
        epicElement.className = "epic-wrapper";

        const title = document.createElement("h2");
        title.textContent = epic;
        epicElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = "This is an example of a custom UI component created using the Obsidian API.";
        epicElement.appendChild(description);

        const stories = this.Plugin.StructureManager.GetStories(epic);

        stories.forEach(story => {
            this.ProcessStory(epic, story, epicElement);
        });

        this.OpenLeafOnClick(epicElement, this.Plugin.StructureManager.GetEpicFilePath(epic));

        element.appendChild(epicElement);
    }

    /**
     * @private
     * Processes an individual Story and displays its details in the UI.
     */
    private ProcessStory(epic: string, story: string, element: HTMLElement): void {
        const storyElement = document.createElement("div");
        storyElement.className = "story-wrapper";

        const title = document.createElement("h4");
        title.textContent = story;
        storyElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = "This is an example of a custom UI component created using the Obsidian API.";
        storyElement.appendChild(description);

        const tasks = this.Plugin.StructureManager.GetTasks(epic, story);

        tasks.forEach(task => {
            this.ProcessTask(epic, story, task, storyElement);
        });

        this.OpenLeafOnClick(storyElement, this.Plugin.StructureManager.GetStoryFilePath(epic, story));

        element.appendChild(storyElement);
    }

    /**
     * Processes an individual Task and displays its details in the UI.
     * @param epic - The Epic to which the Task belongs.
     * @param story - The Story to which the Task belongs.
     * @param task - The Task to be processed.
     * @param element - The parent element to which the Task UI will be appended.
     */
    private ProcessTask(epic: string, story: string, task: string, element: HTMLElement): void {
        const taskElement = document.createElement("div");
        taskElement.className = "task-wrapper";

        const title = document.createElement("h6");
        title.textContent = task;
        taskElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = "This is an example of a custom UI component created using the Obsidian API.";
        taskElement.appendChild(description);

        this.OpenLeafOnClick(taskElement, this.Plugin.StructureManager.GetTaskFilePath(epic, story, task));

        element.appendChild(taskElement);
    }

    /**
     * @private
     * Adds a click event listener to the element that opens the corresponding file in a new leaf.
     * @param element - The HTML element to attach the click event to.
     * @param path - The file path to open when the element is clicked.
     */
    private OpenLeafOnClick(element: HTMLElement, path: string): void {
        element.addEventListener('click', async () => {
            const file = await this.App.vault.getAbstractFileByPath(path);
            if (file) {
                this.App.workspace.getLeaf(false).openFile(file as TFile);
            }
        });
    }
}

export default AgileDisplayMarkdownProcessor;