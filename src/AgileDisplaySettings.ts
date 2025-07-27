import { Notice } from "obsidian";

class AgileDisplaySettings {

    UsesCompleted: boolean = false;
    Completed: boolean = false;

    FilterEpic: boolean = false;
    Epic: string = "";

    FilterStory: boolean = false;
    Story: string = "";

    FilterTask: boolean = false;
    Task: string = "";

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
        });
    }

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

    private ParseEpicProperty(line: string): void {
        if (!line.startsWith("epic="))
            return;

        const epicMatch = line.match(/epic=(.+)/);

        if (!epicMatch) {
            new Notice("Invalid Epic value in Agile Display Markdown");
            return;
        }

        this.FilterEpic = true;
        this.Epic = epicMatch[1].trim();

        new Notice(`Filtering epics by: ${this.Epic}`);
    }

    private ParseStoryProperty(line: string): void {
        if (!line.startsWith("story="))
            return;

        const storyMatch = line.match(/story=(.+)/);

        if (!storyMatch) {
            new Notice("Invalid Story value in Agile Display Markdown");
            return;
        }

        this.FilterStory = true;
        this.Story = storyMatch[1].trim();

        new Notice(`Filtering stories by: ${this.Story}`);
    }

    private ParseTaskProperty(line: string): void {
        if (!line.startsWith("task="))
            return;

        const taskMatch = line.match(/task=(.+)/);

        if (!taskMatch) {
            new Notice("Invalid Task value in Agile Display Markdown");
            return;
        }

        this.FilterTask = true;
        this.Task = taskMatch[1].trim();

        new Notice(`Filtering tasks by: ${this.Task}`);
    }
}

export default AgileDisplaySettings;