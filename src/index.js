const { app, BrowserWindow } = require('electron');
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow = null;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Wait until the app is ready
app.once('ready', () => {
    // Create a new window
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        show: false,
    });
    //
    mainWindow.on('closed', onClosed);

    // Show window when page is ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
