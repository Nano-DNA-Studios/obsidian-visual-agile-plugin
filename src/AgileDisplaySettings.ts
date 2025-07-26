import { Notice } from "obsidian";




class AgileDisplaySettings {
    UsesCompleted: boolean = false;
    Completed: boolean = false;


    public ProcessSettings(source: string) : void
    {
        const lines = source.split('\n');
        
                if (lines.length === 0) {
                    return;
                }
        
                lines.forEach(line => {
        
                    line = line.trim();
                    line = line.toLowerCase();
        
                    if (line.startsWith("completed=")) {
                        const completedMatch = line.match(/completed=(true|false)/);
                        if (!completedMatch) {
                            new Notice("Invalid Completed value in Agile Display Markdown");
                            return;
                        }
        
                        new Notice(`Completed set to ${completedMatch[1]}`);
        
                        this.UsesCompleted = true;
                        this.Completed = completedMatch[1] === "true";
                    }
                });
    }




}

export default AgileDisplaySettings;