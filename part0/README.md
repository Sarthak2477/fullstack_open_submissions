sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes text into the input field

    Note right of browser: User clicks the Save button

    browser->>browser: JavaScript captures form submit event
    browser->>browser: JS prevents default page reload

    Note right of browser: JS creates a new note object\n{content: "...", date: ...}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note\nwith JSON note data
    activate server
    server-->>browser: HTTP 201 Created (or redirect response)
    deactivate server

    Note right of browser: JS updates the local notes list

    browser->>browser: JS re-renders the notes list on the page
