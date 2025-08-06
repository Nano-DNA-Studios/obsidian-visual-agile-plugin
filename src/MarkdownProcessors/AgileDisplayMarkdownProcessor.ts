import AgileProjectPlugin from "main";
import { App, MarkdownRenderer, TFile } from "obsidian";
import AgileDisplaySettings from "src/AgileDisplaySettings";
import MarkdownParser from "src/MarkdownParser";
import SVGFactory from "src/SVGFactory";
import VaultParser from "src/VaultParser";

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
     * @protected
     * The VaultParser instance for accessing vault and workspace functionality.
     */
    private VaultParser: VaultParser;

    /**
     * @protected
     * The MarkdownParser instance for parsing Markdown files.
     */
    private MarkdownParser: MarkdownParser;

    /**
     * @param App - The Obsidian App instance.
     * @param Plugin - The AgileProjectPlugin instance.
     */
    constructor(App: App, Plugin: AgileProjectPlugin) {
        this.App = App;
        this.Plugin = Plugin;

        this.VaultParser = new VaultParser(App, Plugin);
        this.MarkdownParser = new MarkdownParser(App, Plugin);
    }

    /**
     * @public
     * Registers the Markdown processor for displaying Agile project data.
     */
    public RegisterMarkdownProcessor(): void {
        this.Plugin.registerMarkdownCodeBlockProcessor('agile-display', (source, el, ctx) => {

            const settings = new AgileDisplaySettings();
            settings.ProcessSettings(source);
            this.DisplayAgileUI(settings, el);


            if (!settings.UseHotreload)
                return;

            //Reload when the element is in view
            const observer = new IntersectionObserver((entries) => {
                if (!entries[0].isIntersecting)
                    return;

                const settings = new AgileDisplaySettings();
                settings.ProcessSettings(source);

                el.innerHTML = ""; // clear old
                this.DisplayAgileUI(settings, el);
            });

            observer.observe(el);
        });
    }

    /**
     * @public
     * Processes the Markdown content and displays Agile project data in a custom UI.
     */
    public async DisplayAgileUI(settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {

        const wrapper = document.createElement("div");
        wrapper.className = "agile-display-wrapper";
        let epics: string[] = new VaultParser(this.App, this.Plugin).GetEpics();

        if (settings.UseSorting && settings.UseAlphabeticSorting)
            epics = settings.UseReverseSorting ? epics.sort((a, b) => b.localeCompare(a)) : epics.sort((a, b) => a.localeCompare(b));

        await Promise.all(epics.map(epic => {
            if (settings.UseEpicFilter && !epic.toLowerCase().includes(settings.EpicFilter))
                return;

            return this.ProcessEpic(epic, settings, wrapper);
        }));

        if (wrapper.childElementCount > 0) {
            element.appendChild(wrapper);
            return;
        }

        element.appendChild(this.GetErrorElement());
    }

    /**
     * @private
     * Processes an individual Epic and displays its details in the UI.
     */
    private async ProcessEpic(epic: string, settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {
        const epicFilePath = this.VaultParser.GetEpicFilePath(epic);
        const epicDescription = await this.GetDescription(epicFilePath, settings);
        const epicElement = document.createElement("div");
        epicElement.className = "epic-wrapper";

        const titleDiv = this.GetTitleElement(epic, SVGFactory.GetEpicSVG());
        epicElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, epicDescription, descriptionEl, epicFilePath, this.Plugin);
        epicElement.appendChild(descriptionEl);

        let stories = this.VaultParser.GetStories(epic);

        if (settings.UseSorting && settings.UseAlphabeticSorting)
            stories = settings.UseReverseSorting ? stories.sort((a, b) => b.localeCompare(a)) : stories.sort((a, b) => a.localeCompare(b));

        await Promise.all(stories.map(story => {
            if (settings.UseStoryFilter && !story.toLowerCase().includes(settings.StoryFilter))
                return;

            return this.ProcessStory(epic, story, settings, epicElement);
        }));

        this.OpenLeafOnClick(epicElement, epicFilePath);

        if (epicElement.childElementCount > 2)
            element.appendChild(epicElement);
    }

    /**
     * @private
     * Processes an individual Story and displays its details in the UI.
     */
    private async ProcessStory(epic: string, story: string, settings: AgileDisplaySettings, element: HTMLElement): Promise<void> {
        const storyFilePath = this.VaultParser.GetStoryFilePath(epic, story);
        const storyDescription = await this.GetDescription(storyFilePath, settings);
        const storyElement = document.createElement("div");
        storyElement.className = "story-wrapper";

        const titleDiv = this.GetTitleElement(story, SVGFactory.GetStorySVG());
        storyElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, storyDescription, descriptionEl, storyFilePath, this.Plugin);
        storyElement.appendChild(descriptionEl);

        let tasks = this.VaultParser.GetTasks(epic, story);

        if (settings.UseSorting && settings.UseAlphabeticSorting)
            tasks = settings.UseReverseSorting ? tasks.sort((a, b) => b.localeCompare(a)) : tasks.sort((a, b) => a.localeCompare(b));

        if (settings.UseSorting && settings.UsePrioritySorting)
            tasks = await this.SortByPriority(settings, tasks, epic, story);

        await Promise.all(tasks.map(task => {
            if (settings.UseTaskFilter && !task.toLowerCase().includes(settings.TaskFilter))
                return;

            return this.ProcessTask(epic, story, task, settings, storyElement);
        }));

        this.OpenLeafOnClick(storyElement, storyFilePath);

        if (storyElement.childElementCount > 2)
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
        const taskFilePath = this.VaultParser.GetTaskFilePath(epic, story, task);
        const priority = await this.MarkdownParser.ExtractTaskPriority(taskFilePath);

        if (settings.UsePriorityFilter && priority.toLowerCase() !== settings.Priority.toLowerCase())
            return;

        const taskDescription = await this.GetDescription(taskFilePath, settings);
        const taskElement = document.createElement("div");
        taskElement.className = "task-wrapper";

        const titleDiv = this.GetTaskTitleElement(task, priority);
        taskElement.appendChild(titleDiv);

        const descriptionEl = document.createElement("div");
        await MarkdownRenderer.render(this.App, taskDescription, descriptionEl, taskFilePath, this.Plugin);
        taskElement.appendChild(descriptionEl);

        this.OpenLeafOnClick(taskElement, taskFilePath);

        if (settings.UsesCompleted) {
            if (settings.Completed === await this.MarkdownParser.IsTaskCompleted(taskFilePath))
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
            if (file && file instanceof TFile)
                this.App.workspace.getLeaf(false).openFile(file);
        });
    }

    /**
     * Creates a title element with an SVG icon.
     * @param title The title text.
     * @param svgStr The SVG string for the icon.
     * @returns The title element.
     */
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
     * Creates the title element for a task.
     * @param task The task name.
     * @param priority The task priority.
     * @returns The title element.
     */
    private GetTaskTitleElement(task: string, priority: string): HTMLElement {
        const titleDiv = document.createElement("div");
        titleDiv.className = "agile-display-title";

        const icon = document.createElement("div");
        icon.innerHTML = SVGFactory.GetTaskSVG();
        titleDiv.appendChild(icon);

        const priorityIcon = document.createElement("div");
        priorityIcon.innerHTML = this.GetPriorityIconSVG(priority);
        titleDiv.appendChild(priorityIcon);

        const titleEl = document.createElement("h4");
        titleEl.textContent = task;
        titleDiv.appendChild(titleEl);

        return titleDiv;
    }

    /**
     * Creates an error element to display when no Agile Structures are found.
     * @returns The error element.
     */
    private GetErrorElement(): HTMLElement {
        const message = "No Agile Structures found with the specified filter Settings.";

        const errorWrapper = document.createElement("div");
        errorWrapper.className = "agile-display-error";

        errorWrapper.appendChild(this.GetTitleElement(message, SVGFactory.GetWarningSVG()));

        const description = document.createElement("h6");
        description.textContent = "Modify the settings to display Agile Structures.";
        errorWrapper.appendChild(description);

        return errorWrapper;
    }

    /**
     * Gets the description of a task from its file.
     * @param filePath The file path of the task.
     * @param settings The display settings for the task.
     * @returns The description of the task.
     */
    private async GetDescription(filePath: string, settings: AgileDisplaySettings): Promise<string> {
        const markdownParser = new MarkdownParser(this.App, this.Plugin);
        const description = await markdownParser.ExtractFileOverview(filePath);

        if (settings.UseShortDescription)
            return description.split('\n')[0];

        return description;
    }

    /**
     * Gets the SVG representation of the priority icon.
     * @param priority The priority level.
     * @returns The SVG string for the priority icon.
     */
    private GetPriorityIconSVG(priority: string): string {
        switch (priority.toLowerCase()) {
            case 'high':
                return SVGFactory.GetHighPrioritySVG();
            case 'medium':
                return SVGFactory.GetMediumPrioritySVG();
            case 'low':
                return SVGFactory.GetLowPrioritySVG();
            default:
                return SVGFactory.GetWarningSVG(); // Default to warning if priority is unknown
        }
    }

    /**
     * Sorts tasks by their priority if the settings require it.
     * @param settings The display settings for the Agile Display.
     * @param items The list of task names to sort.
     * @param epic The name of the Epic containing the tasks.
     * @param story The name of the Story containing the tasks.
     * @returns A promise that resolves to the sorted list of task names.
     */
    private async SortByPriority(settings: AgileDisplaySettings, items: string[], epic: string, story: string): Promise<string[]> {
        if (!settings.UseSorting || !settings.UsePrioritySorting) return items;

        const priorityOrder: Record<string, number> = {
            "high": 1,
            "medium": 2,
            "low": 3
        };

        const itemsWithPriority = await Promise.all(items.map(async (item) => {
            const filePath = this.VaultParser.GetTaskFilePath(epic, story, item);
            const priority = await this.MarkdownParser.ExtractTaskPriority(filePath);
            return {
                item,
                priorityValue: priorityOrder[priority.toLowerCase()] || 0
            };
        }));

        itemsWithPriority.sort((a, b) => a.priorityValue - b.priorityValue);

        const sortedItems = itemsWithPriority.map(obj => obj.item);

        if (settings.UseReverseSorting)
            sortedItems.reverse();

        return sortedItems;
    }
}

export default AgileDisplayMarkdownProcessor;