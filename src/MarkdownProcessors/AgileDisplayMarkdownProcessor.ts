import AgileProjectPlugin from "main";
import { App, MarkdownRenderer, TFile } from "obsidian";

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

        const titleDiv = this.GetTitleElement(epic, this.GetEpicSVG());
        epicElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, epicDescription, descriptionEl, epicFilePath, this.Plugin);
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

        const titleDiv = this.GetTitleElement(story, this.GetStorySVG());
        storyElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, storyDescription, descriptionEl, storyFilePath, this.Plugin);
        storyElement.appendChild(descriptionEl);

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

        const titleDiv = this.GetTitleElement(task, this.GetTaskSVG());
        taskElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, taskDescription, descriptionEl, taskFilePath, this.Plugin);
        taskElement.appendChild(descriptionEl);

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

    private GetTitleElement(title: string, svgStr: string): HTMLElement {
        const titleDiv = document.createElement("div");
        titleDiv.className = "agile-display-title";

        const icon = document.createElement("div");
        icon.innerHTML = svgStr
        titleDiv.appendChild(icon);

        const titleEl = document.createElement("h4");
        titleEl.textContent = title;
        titleDiv.appendChild(titleEl);

        return titleDiv;
    }

    /**
     * Gets the SVG string for the Epic icon.
     * @returns SVG string for the Epic icon.
     * @private
     */
    private GetEpicSVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#A259FF"/>
  <path d="M13 2L6 13H11L11 22L18 11H13L13 2Z" fill="white"/>
</svg>`;
    }

    /**
     * Gets the SVG string for the Story icon.
     * @returns SVG string for the Story icon.
     * @private
     */
    private GetStorySVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#4CD964"/>
  <path d="M6 4C6 2.9 6.9 2 8 2H16C17.1 2 18 2.9 18 4V21L12 17L6 21V4Z" fill="white"/>
</svg>`;
    }

    /**
     * Gets the SVG string for the Task icon.
     * @returns SVG string for the Task icon.
     * @private
     */
    private GetTaskSVG(): string {
        return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#32ADE6"/>
  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
</svg>`;
    }
}

export default AgileDisplayMarkdownProcessor;