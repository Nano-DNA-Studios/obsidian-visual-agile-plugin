import AgileProjectPlugin from "main";
import { App, Modal } from "obsidian";


class HelpScreenModal extends Modal {

    private Plugin: AgileProjectPlugin;

    constructor(app: App, plugin: AgileProjectPlugin) {
        super(app);
        this.Plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('centered-modal');
        contentEl.createEl('h1', { text: 'Agile Plugin Help' });

        contentEl.createEl('p', { text: 'This Plugin is used to keep track and manage tasks using an Agile format. Using this Plugin, you can organize Tasks using Epics and Stories just like in Jira. ' });
        contentEl.createEl('p', { text: `Your Epics, Stories and Tasks will each have a file to represent them, and will be stored under \"${this.Plugin.Settings.agileDirectoryPath}\". This can be changed in the Settings. The files will be organized under the following format. (Display the Organization format?)` });
        contentEl.createEl('p', { text: 'To use this Plugin and create new Agile Files, you can use the Ribbon Icons listed on the left side. It has the name \"Update Agile\". Additionally you can use Commands through the Command Palette (Ctrl + P), search for \"Agile\" in the Command Palette. The Ribbon Icon can be removed in the Settings.' });
        contentEl.createEl('p', { text: 'The Plugin also comes with a Custom Code Block to Display your Agile Structures. Create a Code Block with the Type \"agile-display\". This will display your Epics, Stories and Tasks in an Organized, Hierarchical fashion.' });

        contentEl.createEl('p', { text: 'The Agile Display also has some Settings that can be Edited, they are as Follows :' });
        contentEl.createEl('p', { text: 'Epic - Filters the Epics that are displayed, can be any Characters or Words' });
        contentEl.createEl('p', { text: 'Story - Filters the Stories that are displayed, can be any Characters or Words' });
        contentEl.createEl('p', { text: 'Task - Filters the Tasks that are displayed, can be any Characters or Words' });
        contentEl.createEl('p', { text: 'ShortDescription - Toggles displaying only 1 line from the Description, or all lines. True = 1 line, False = All lines' });
        contentEl.createEl('p', { text: 'Completed - Toggles Displaying Only Completed or Uncompleted Tasks, True = Completed Tasks, False = Uncompleted Tasks.' });
        contentEl.createEl('p', { text: 'Sort - Options for Sorting the Names of the Structures, Can be sorted Alphabetically or by Priority, use keywords \"Alphabetical\" or \"Priority\"' });
        contentEl.createEl('p', { text: 'Priority - Shows only the Tasks of a certain Priority. (Low, Medium, High)' });
        contentEl.createEl('p', { text: 'HotReload - Toggles if the Display will reload when back in view, otherwise it will only reload when Obsidian reloads. True if unmentioned, Can be set to False' });

        contentEl.createEl('p', { text: 'Example :' });
        contentEl.createEl('pre', { text: '```agile-display\nEpic=Epic Name\nStory=Story Name\nTask=Task Name\nShortDescription=true\nCompleted=true\nSort=Alphabetical\nPriority=Medium\nHotReload=true\n```' });

        contentEl.createEl('p', { text: 'If your Agile Display yields no results it will display a message saying no Structures are found.' });
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default HelpScreenModal;