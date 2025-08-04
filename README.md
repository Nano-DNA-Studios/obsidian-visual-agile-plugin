# Obsidian Agile Plugin
The Obsidian Agile Plugin is used to replicate Jira Task tracking and management within the Obsidian Markdown Editor.

Tasks are organized under Epics and Stories to better Categorize them and come with a custom Markdown Processor to Display them.

An Epic is a High Level activity or Project the user can work on. These may take months or years of activity and are meant to represent a large scale project on a high level view

A Story is a group of tasks that are related to a medium scale goal. Stories may take Weeks or days to complete and are used to organize closely related tasks

A Task is a single activity the user will interact with. They are normally represented by a few hours worth of work, or up to a full days worth. Tasks are the lowest level Agile related activity

Each of these Agile Structures use a Markdown File.

# How it works
Once installed, you will be prompted to automatically create a Directory where the Agile Structures are Stored. This Directory can be renamed anytime through the Settings.

You can now use the ``Update Agile`` Ribbon Icon on the left side of the Screen, or the commands in the Command Palette (Ctrl + P) to create new Epics, Stories and Tasks.

Your Agile structures and organization will grow along with your Obsidian Vault. They are stored in the following format.

```
Projects and Stories
├── Epic 1
│   ├── Story 1
│   │   └── Tasks
│   │       ├── Task 1
│   │       ├── Task 2
│   │       └── Task 3
│   └── Story 2
│       └── Tasks
│           ├── Task 1
│           ├── Task 2
│           └── Task 3
└── Epic 2
    ├── Story 1
    │   └── Tasks
    │       ├── Task 1
    │       ├── Task 2
    │       └── Task 3
    └── Story 2
        └── Tasks
            ├── Task 1
            ├── Task 2
            └── Task 3
```

These Structures can also be displayed using the ``Agile Display`` a custom UI generated from a Markdown Code Block.

To add a ``Agile Display`` create a Code Block with the type ``agile-display``.

You can customize what the ``Agile Display`` shows by adding some settings and filters within the Code Block, they are as follows:

```agile-display
Epic=Epic Name
Story=Story Name
Task=Task Name
ShortDescription=true
Completed=true
Sort=Alphabetically
Priority=Medium
HotReload=true
```

## Display Settings and Filters

- **Epic / Story / Task** — Filters by name (you can use partial matches).
    
- **ShortDescription** — If `true`, only shows 1 line of each description.
    
- **Completed** — If `true`, only shows completed tasks. If `false`, only shows uncompleted tasks. 
    
- **Sort** — Sort by `Alphabetical` or `Priority`.
    
- **Priority** — Show only tasks with `Low`, `Medium`, or `High` priority.
    
- **HotReload** — If `true` (default), display auto-refreshes when visible again.
---

If nothing matches your filters, it will show "No Structures Found."

# Contact
For Additional Support, Contact MrDNAlex through the email : ``Mr.DNAlex.2003@gmail.com``.