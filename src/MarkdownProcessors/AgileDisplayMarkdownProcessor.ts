import AgileProjectPlugin from "main";
import { App, MarkdownRenderer, Notice, TFile } from "obsidian";
import MarkdownParser from "src/MarkdownParser";
import SVGFactory from "src/SVGFactory";
import VaultParser from "src/VaultParser";

class AgileDisplaySettings {
    UsesCompleted: boolean = false;
    Completed: boolean = false;
}

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

            const settings: AgileDisplaySettings = this.ProcessMarkdown(source);
            this.DisplayAgileUI(settings, el);
        });
    }

    private ProcessMarkdown(source: string): AgileDisplaySettings {

        const settings = new AgileDisplaySettings();
        const lines = source.split('\n');

        if (lines.length === 0) {
            return settings;
        }

        lines.forEach(line => {

            line = line.trim();
            line = line.toLowerCase();

            if (line.startsWith("completed=")) {
                const completedMatch = line.match(/completed=(true|false)/);
                if (!completedMatch) {
                    new Notice("Invalid Completed value in Agile Display Markdown");
                    return settings;
                }

                new Notice(`Completed set to ${completedMatch[1]}`);

                settings.UsesCompleted = true;
                settings.Completed = completedMatch[1] === "true";
            }
        });


        return settings
    }


    /**
     * @public
     * Processes the Markdown content and displays Agile project data in a custom UI.
     */
    public DisplayAgileUI(settings: AgileDisplaySettings, element: HTMLElement): void {

        const wrapper = document.createElement("div");
        const epics: string[] = new VaultParser(this.App, this.Plugin).GetEpics();

        epics.forEach(epic => {
            this.ProcessEpic(epic, settings, wrapper);
        });

        element.appendChild(wrapper);
    }

    /**
     * @private
     * Processes an individual Epic and displays its details in the UI.
     */
    private async ProcessEpic(epic: string, settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {
        const vaultParser = new VaultParser(this.App, this.Plugin);
        const markdownParser = new MarkdownParser(this.App, this.Plugin);

        const epicFilePath = vaultParser.GetEpicFilePath(epic);
        const epicDescription = await markdownParser.ExtractFileOverview(epicFilePath);
        const epicElement = document.createElement("div");
        epicElement.className = "epic-wrapper";

        const titleDiv = this.GetTitleElement(epic, SVGFactory.GetEpicSVG());
        epicElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, epicDescription, descriptionEl, epicFilePath, this.Plugin);
        epicElement.appendChild(descriptionEl);

        const stories = vaultParser.GetStories(epic);

        stories.forEach(story => {
            this.ProcessStory(epic, story, settings, epicElement);
        });

        this.OpenLeafOnClick(epicElement, epicFilePath);

        element.appendChild(epicElement);
    }

    /**
     * @private
     * Processes an individual Story and displays its details in the UI.
     */
    private async ProcessStory(epic: string, story: string, settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {
        
        const vaultParser = new VaultParser(this.App, this.Plugin);
        const markdownParser = new MarkdownParser(this.App, this.Plugin);

        const storyFilePath = vaultParser.GetStoryFilePath(epic, story);
        const storyDescription = await markdownParser.ExtractFileOverview(storyFilePath);
        const storyElement = document.createElement("div");
        storyElement.className = "story-wrapper";

        const titleDiv = this.GetTitleElement(story, SVGFactory.GetStorySVG());
        storyElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, storyDescription, descriptionEl, storyFilePath, this.Plugin);
        storyElement.appendChild(descriptionEl);

        const tasks = vaultParser.GetTasks(epic, story);

        tasks.forEach(task => {
            this.ProcessTask(epic, story, task, settings, storyElement);
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
    private async ProcessTask(epic: string, story: string, task: string, settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {

        const vaultParser = new VaultParser(this.App, this.Plugin);
        const markdownParser = new MarkdownParser(this.App, this.Plugin);

        const taskFilePath = vaultParser.GetTaskFilePath(epic, story, task);
        const taskDescription = await markdownParser.ExtractFileOverview(taskFilePath);
        const taskElement = document.createElement("div");
        taskElement.className = "task-wrapper";

        const titleDiv = this.GetTitleElement(task, SVGFactory.GetTaskSVG());
        taskElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, taskDescription, descriptionEl, taskFilePath, this.Plugin);
        taskElement.appendChild(descriptionEl);

        this.OpenLeafOnClick(taskElement, taskFilePath);

        if (settings.UsesCompleted) {
            if (settings.Completed === await markdownParser.IsTaskCompleted(taskFilePath))
                element.appendChild(taskElement);
        } else
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

    
}

export default AgileDisplayMarkdownProcessor;