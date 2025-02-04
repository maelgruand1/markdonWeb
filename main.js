const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { marked } = require('marked');



function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools(); // ✅ Ajoute cette ligne ici pour ouvrir les outils développeur
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



ipcMain.handle('convertMarkdown', (event, markdownText) => {
    try {
        console.log("Texte recu dans main.js :", markdownText);
        
        // Convertit en HTML avec un paragraphe par défaut
        const htmlContent = marked.parse(markdownText) || "<p>" + markdownText + "</p>";
        return htmlContent;
    } catch (error) {
        console.error('Erreur lors de la conversion Markdown:', error);
        return '';
    }
});
    