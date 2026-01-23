## Diagram 0.4 

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes text into the input field
    Note right of browser: User clicks the Save button

    browser->>browser: JavaScript captures form submit event
    browser->>browser: JS prevents default page reload

    Note right of browser: JS creates a new note object\n{content: "...", date: ...}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: JS updates local notes list
    browser->>browser: JS re-renders notes list


## Diagram 0.5

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (SPA shell)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JavaScript SPA code
    deactivate server

    Note right of browser: Browser executes SPA JavaScript\nNo full page reloads needed anymore

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Notes data as JSON
    deactivate server

    Note right of browser: JS renders notes dynamically into the page


## Diagram 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a new note into input field
    Note right of browser: User clicks Save button

    browser->>browser: SPA JavaScript captures submit event
    browser->>browser: Prevents default form submission

    Note right of browser: JS creates new note object\n{content: "...", date: ...}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa\nwith JSON note data
    activate server
    server-->>browser: HTTP 201 Created (response JSON)
    deactivate server

    Note right of browser: SPA updates notes list in memory
    browser->>browser: SPA re-renders notes list on page

