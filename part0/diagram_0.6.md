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
