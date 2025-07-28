import { Notice } from "obsidian";

/**
 * @public
 * Class representing the settings for displaying Agile project data in Markdown.
 */
class AgileDisplaySettings {

    /**
     * Used to indicate whether to filter tasks by their completion status.
     */
    UsesCompleted: boolean = false;

    /**
     * Used to filter tasks by their completion status.
     */
    Completed: boolean = false;

    /**
     * Used to indicate whether to filter epics by their title.
     */
    UseEpicFilter: boolean = false;

    /**
     * Used to filter epics by their title.
     */
    EpicFilter: string = "";

    /**
     * Used to indicate whether to filter stories by their title.
     */
    UseStoryFilter: boolean = false;

    /**
     * Used to filter stories by their title.
     */
    StoryFilter: string = "";

    /**
     * Used to indicate whether to filter tasks by their title.
     */
    UseTaskFilter: boolean = false;

    /**
     * Used to filter tasks by their title.
     */
    TaskFilter: string = "";

    /**
     * Used to indicate whether to filter tasks by their short description.
     */
    UseShortDescription: boolean = true;

    /**
     * Used to filter tasks by their Priority.
     */
    UsePriorityFilter: boolean = false;

    /**
     * Used to filter tasks by their priority.
     */
    Priority: string = "";

    /**
     * Used to indicate whether to sort the tasks.
     */
    UseSorting: boolean = false;

    /**
     * Used to indicate whether to sort tasks alphabetically.
     */
    UseAlphabeticSorting: boolean = false;

    /**
     * Used to indicate whether to sort tasks by their priority.
     */
    UsePrioritySorting: boolean = false;

    /**
     * Used to indicate whether to sort tasks in reverse order.
     */
    UseReverseSorting: boolean = false;

    /**
     * Used to indicate whether to use hot-reload for the Agile Display.
     */
    UseHotreload: boolean = true;

    /**
     * Processes the settings from the given source string.
     * @param source The source string containing the settings.
     * @returns void
     */
    public ProcessSettings(source: string): void {
        const lines = source.split('\n');

        if (lines.length === 0) {
            return;
        }

        lines.forEach(line => {
            line = line.trim();
            line = line.toLowerCase();

            this.ParseCompletedProperty(line);
            this.ParseEpicProperty(line);
            this.ParseStoryProperty(line);
            this.ParseTaskProperty(line);
            this.ParseShortDescriptionProperty(line);
            this.ParsePriorityProperty(line);
            this.ParseSortingProperty(line);
            this.ParseReverseSortingProperty(line);
            this.ParseHotreloadProperty(line);
        });
    }

    /**
     * Parses the completed property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseCompletedProperty(line: string): void {
        if (!line.startsWith("completed="))
            return;

        const completedMatch = line.match(/completed=(true|false)/);

        if (!completedMatch) {
            new Notice("Invalid Completed value in Agile Display Markdown");
            return;
        }

        this.UsesCompleted = true;
        this.Completed = completedMatch[1] === "true";
    }

    /**
     * Parses the epic property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseEpicProperty(line: string): void {
        if (!line.startsWith("epic="))
            return;

        const epicMatch = line.match(/epic=(.+)/);

        if (!epicMatch) {
            new Notice("Invalid Epic value in Agile Display Markdown");
            return;
        }

        this.UseEpicFilter = true;
        this.EpicFilter = epicMatch[1].trim();
    }

    /**
     * Parses the story property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseStoryProperty(line: string): void {
        if (!line.startsWith("story="))
            return;

        const storyMatch = line.match(/story=(.+)/);

        if (!storyMatch) {
            new Notice("Invalid Story value in Agile Display Markdown");
            return;
        }

        this.UseStoryFilter = true;
        this.StoryFilter = storyMatch[1].trim();
    }

    /**
     * Parses the task property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseTaskProperty(line: string): void {
        if (!line.startsWith("task="))
            return;

        const taskMatch = line.match(/task=(.+)/);

        if (!taskMatch) {
            new Notice("Invalid Task value in Agile Display Markdown");
            return;
        }

        this.UseTaskFilter = true;
        this.TaskFilter = taskMatch[1].trim();
    }

    /**
     * Parses the short description property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseShortDescriptionProperty(line: string): void {
        if (!line.startsWith("shortdescription="))
            return;

        const shortDescriptionMatch = line.match(/shortdescription=(true|false)/);

        if (!shortDescriptionMatch) {
            new Notice("Invalid Short Description value in Agile Display Markdown");
            return;
        }

        this.UseShortDescription = shortDescriptionMatch[1] === "true";
    }

    /**
     * Parses the priority property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParsePriorityProperty(line: string): void {
        if (!line.startsWith("priority="))
            return;

        const priorityMatch = line.match(/priority=(high|medium|low)/);

        if (!priorityMatch) {
            new Notice("Invalid Priority value in Agile Display Markdown");
            return;
        }

        this.UsePriorityFilter = true;

        switch (priorityMatch[1]) {
            case "high":
                this.Priority = "High";
                break;
            case "medium":
                this.Priority = "Medium";
                break;
            case "low":
                this.Priority = "Low";
                break;
            default:
                new Notice("Unknown Priority value in Agile Display Markdown");
        }
    }

    /**
     * Parses the sorting property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseSortingProperty(line: string): void {
        if (!line.startsWith("sort="))
            return;

        const sortMatch = line.match(/sort=(alphabetic|priority)/);

        if (!sortMatch) {
            new Notice("Invalid Sort value in Agile Display Markdown");
            return;
        }

        this.UseSorting = true;

        switch (sortMatch[1]) {
            case "alphabetic":
                this.UseAlphabeticSorting = true;
                break;
            case "priority":
                this.UsePrioritySorting = true;
                break;
            default:
                new Notice("Unknown Sort value in Agile Display Markdown");
        }
    }

    /**
     * Parses the reverse sorting property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseReverseSortingProperty(line: string): void {
        if (!line.startsWith("reverse="))
            return;

        const reverseMatch = line.match(/reverse=(true|false)/);

        if (!reverseMatch) {
            new Notice("Invalid Reverse Sort value in Agile Display Markdown");
            return;
        }

        this.UseReverseSorting = reverseMatch[1] === "true";
    }

    /**
     * Parses the hot-reload property from the given line.
     * @param line The line to parse.
     * @returns void
     */
    private ParseHotreloadProperty(line: string): void {
        if (!line.startsWith("hotreload="))
            return;

        const hotreloadMatch = line.match(/hotreload=(true|false)/);

        if (!hotreloadMatch) {
            new Notice("Invalid Hot Reload value in Agile Display Markdown");
            return;
        }

        this.UseHotreload = hotreloadMatch[1] === "true";
    }
}

export default AgileDisplaySettings;