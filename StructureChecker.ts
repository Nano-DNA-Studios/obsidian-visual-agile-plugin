import { it } from "node:test";
import { App, Notice, TFolder } from "obsidian";

class StructureChecker {

    App: App;

    constructor(app: App) {
        this.App = app;
    }

    public CheckStructure() {

        if (!this.IsValidStructure())
            new Notice("Invalid structure! Please create a folder named 'Projects and Stories' in the root of your vault.");
        else
            new Notice("Structure is valid!");
    }

    public IsValidStructure(): boolean {
        let result = false;
        const root : TFolder = this.App.vault.getRoot();

        root.children.forEach((item) => {

            if (!(item instanceof TFolder)) 
                return;

            if (item.name == "Projects and Stories")
            {
                new Notice(`Found Projects and Stories folder: ${item.name}`);
                result = true;
            }
        });

        return result;
    }

}

export default StructureChecker;