## Files 
- config/config.js: joi authentication and exporting global variables.
- config/express.js: express and other middlewares setting.
- server/controllers: 

## Middleware
- a piece of application that stands between the interface and backend
- in this case, the middleware is in the way of API controllers toward services via routing.
- example: body-parser, enables http request made via json, raw, test, xml, url-encoded, etc

## Controllers
- the layer that handling the http endpoint

## Modules
- the layer that handling the CRUD operation with the database

## MongoDB Guides

### MacOS
- Prerequisite: install Homebrew first.
- Run [brew install mongodb] in terminal.
- Create a folder by running [sudo mkdir -p data/db] in terminal.
- Run [sudo chown -R `id -un` /data/db] to make sure the folder has the right permission for you.
- Next, Download and install MongoDB Compass.
- Run [mongod] in your terminal to start the database.


### Windows
- Download and Install MongoDB, choose Complete installation, and uncheck install Compass checkbox. (It will never worked for some reasons).
- Next, Download and install MongoDB Compass
- Then, proceed to [Your MongoDB installation folder]\Server\[version]\bin, copied the path.
- Open Environment Variables, add in the path you just copied to the PATH variable.
- Create folders in [C:/data/db]
- Run 'mongod' in cmd/bash to start the database.

### CLI executed
- npm init -y
- npm install eslint babel-eslint --save-dev
- npm install eslint-config-airbnb-base eslint-plugin-import eslint --save-dev
- yarn add -D webpack webpack-node-externals
- yarn add -D babel-preset-env babel-plugin-transform-object-rest-spread babel-core babel-loader 
- yarn add express
- yarn add dotenv
- yarn add joi // API and its parameters Validator middleware
- yarn add body-parser
- yarn add cors
- yarn add morgan, // logger middleware
- yarn add mysql
- yarn add express-validation
- yarn add bcrypt
- yarn add http-status
- yarn add jsonwebtoken
- yarn add -D mocha // might not work without installing globally
- yarn add -D chai
- yarn add -D supertest
- yarn add global forever // might not work without installing globally

// Place your settings in this file to overwrite the default settings
{
    "files.autoSave": "afterDelay",
    "editor.detectIndentation": true,
    "workbench.colorTheme": "One Dark Pro",
    "window.zoomLevel": 0,
    "explorer.openEditors.visible": 0,
    "explorer.autoReveal": false,
    "editor.minimap.enabled": false,
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/.conf": true
    },
    "debug.allowBreakpointsEverywhere": true,
    "workbench.editor.tabCloseButton": "left",
    "workbench.editor.closeOnFileDelete": false,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "editor.tabSize": 4,
    "standard.enable": false,
    "editor.smoothScrolling": true,
    // "workbench.sideBar.location": "right",
    "editor.cursorBlinking": "expand",
    "workbench.iconTheme": "material-icon-theme",
    "gitlens.advanced.messages": {
        "suppressShowKeyBindingsNotice": true
    },
    "gitlens.historyExplorer.enabled": true,
    "editor.fontFamily": "Consolas, 'Courier New', monospace",
    "breadcrumbs.enabled": true,
    "files.eol": "\n",
    // "shellLauncher.shells.windows": [
    //     {
    //         "shell": "C:\\Windows\\sysnative\\cmd.exe",
    //         "args": ["-1"],
    //         "label": "cmd"
    //     },
    //     {
    //         "shell": "C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe",
    //         "label": "PowerShell"
    //     },
    //     {
    //         "shell": "C:\\Program Files\\Git\\bin\\bash.exe",
    //         "label": "Git bash"
    //     },
    //     {
    //         "shell": "C:\\Windows\\sysnative\\bash.exe",
    //         "label": "WSL Bash"
    //     }
    // ]
    // "gitProjectManager.baseProjectsFolders": [
    //     "K:/git/VTanKC/Source/Repos/KartCbtsDev",
    //     "K:/git/VTanKC/Source/Repos/kart-cbts-cloud"
    // ],
    // "gitProjectManager.storeRepositoriesBetweenSessions": true
}
