import AgileProjectPlugin from "main";
import { App, Plugin, TFile } from "obsidian";


class AgileDisplayMarkdownProcessor {

    /**
     * @protected
     * The Obsidian App instance for accessing vault and workspace functionality.
     */
    protected App: App;

    protected Plugin: AgileProjectPlugin;

    constructor(App: App, Plugin: AgileProjectPlugin) {
        this.App = App;
        this.Plugin = Plugin;
    }

    public RegisterMarkdownProcessor(): void {
        this.Plugin.registerMarkdownCodeBlockProcessor('agile-display', (source, el, ctx) => {
            this.processMarkdown(source, el);
        });
    }

    processMarkdown(markdown: string, element: HTMLElement): void {

        const wrapper = document.createElement("div");

        const epicsDir = this.Plugin.StructureManager.GetEpicDirectories();
        const epics: string[] = this.Plugin.StructureManager.GetEpics();

        epics.forEach(epic => {


            this.ProcessEpic(epic, wrapper);
            // const title = document.createElement("h2");
            // title.textContent = epic;
            // wrapper.appendChild(title);

            // const description = document.createElement("p");
            // description.textContent = "This is an example of a custom UI component created using the Obsidian API.";
            // wrapper.appendChild(description);

            // const storyDir = this.Plugin.StructureManager.GetStoryDirectories(epic);
            // const stories: string[] = this.Plugin.StructureManager.GetStories(epic);

            // const childrenWrapper = document.createElement("div");

            // childrenWrapper.className = "children-wrapper";

            // stories.forEach(story => {
            //     const storyTitle = document.createElement("h4");
            //     storyTitle.textContent = story;
            //     childrenWrapper.appendChild(storyTitle);

            //     const storyDescription = document.createElement("p");
            //     storyDescription.textContent = "This is an example of a custom UI component created using the Obsidian API.";
            //     childrenWrapper.appendChild(storyDescription);
            //});

            //wrapper.appendChild(childrenWrapper);

        });

        element.appendChild(wrapper);
    }

    private ProcessEpic(epic: string, element: HTMLElement): void {
        const epicElement = document.createElement("div");
        epicElement.className = "epic-wrapper";

        this.OpenLeafOnClick(epicElement, epic, `${this.Plugin.Settings.agileDirectoryPath}/${epic}/${epic}.md`);

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

        element.appendChild(epicElement);
    }

    private ProcessStory(epic:string, story: string, element: HTMLElement): void {
        const storyElement = document.createElement("div");
        storyElement.className = "story-wrapper";

        this.OpenLeafOnClick(storyElement, story, `${this.Plugin.Settings.agileDirectoryPath}/${epic}/${story}/${story}.md`);

        const title = document.createElement("h4");
        title.textContent = story;
        storyElement.appendChild(title);

        const description = document.createElement("p");
        description.textContent = "This is an example of a custom UI component created using the Obsidian API.";
        storyElement.appendChild(description);

        element.appendChild(storyElement);
    }

    // Additional methods for processing can be added here

    private OpenLeafOnClick(element: HTMLElement, text: string, path: string): void {
        element.addEventListener('click', async () => {
            const file = await this.App.vault.getAbstractFileByPath(path);
            if (file) {
                this.App.workspace.getLeaf(false).openFile(file as TFile);
            }
        });
    }



}

export default AgileDisplayMarkdownProcessor;