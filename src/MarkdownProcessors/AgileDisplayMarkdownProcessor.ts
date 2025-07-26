import AgileProjectPlugin from "main";
import { App, TFile } from "obsidian";


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
    private async ProcessEpic(epic: string, element: HTMLElement): Promise<void> {
        const epicFilePath = this.Plugin.StructureManager.GetEpicFilePath(epic);
        const epicDescription = await this.Plugin.StructureManager.ExtractFileOverview(epicFilePath);
        const epicElement = document.createElement("div");
        epicElement.className = "epic-wrapper";
        
        const titleEl = document.createElement("h2");
        titleEl.textContent = epic;
        epicElement.appendChild(titleEl);

        const descriptionEl = document.createElement("p");
        descriptionEl.textContent = epicDescription;
        epicElement.appendChild(descriptionEl);

        const stories = this.Plugin.StructureManager.GetStories(epic);

        stories.forEach(story => {
            this.ProcessStory(epic, story, epicElement);
        });

        this.OpenLeafOnClick(epicElement, epicFilePath);

        element.appendChild(epicElement);
    }

    /**
     * @private
     * Processes an individual Story and displays its details in the UI.
     */
    private async ProcessStory(epic: string, story: string, element: HTMLElement): Promise<void> {
        const storyFilePath = this.Plugin.StructureManager.GetStoryFilePath(epic, story);
        const storyDescription = await this.Plugin.StructureManager.ExtractFileOverview(storyFilePath);
        const storyElement = document.createElement("div");
        storyElement.className = "story-wrapper";

        const title = document.createElement("h4");
        title.textContent = story;
        storyElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = storyDescription;
        storyElement.appendChild(description);

        const tasks = this.Plugin.StructureManager.GetTasks(epic, story);

        tasks.forEach(task => {
            this.ProcessTask(epic, story, task, storyElement);
        });

        this.OpenLeafOnClick(storyElement, storyFilePath);

        element.appendChild(storyElement);
    }

    /**
     * Processes an individual Task and displays its details in the UI.
     * @param epic - The Epic to which the Task belongs.
     * @param story - The Story to which the Task belongs.
     * @param task - The Task to be processed.
     * @param element - The parent element to which the Task UI will be appended.
     */
    private async ProcessTask(epic: string, story: string, task: string, element: HTMLElement): Promise<void> {
        const taskFilePath = this.Plugin.StructureManager.GetTaskFilePath(epic, story, task);
        const taskDescription = await this.Plugin.StructureManager.ExtractFileOverview(taskFilePath);
        const taskElement = document.createElement("div");
        taskElement.className = "task-wrapper";

        const title = document.createElement("h6");
        title.textContent = task;
        taskElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = taskDescription;
        taskElement.appendChild(description);

        this.OpenLeafOnClick(taskElement, taskFilePath);

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