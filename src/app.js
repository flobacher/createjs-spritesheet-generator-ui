const { dialog } = require('electron').remote;
const cjsSpritesheetGenerator = require('createjs-spritesheet-generator');

const inputFolderChooserBtn = document.getElementById('inputFolderChooser');

let inputFiles = null;
let targetDirectory = null;

inputFolderChooserBtn.addEventListener('click', () => {
    dialog.showOpenDialog(
        {
            title: 'Choose files',
            // defaultPath: String (optional)
            // buttonLabel String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
            filters: '*.png',
            properties: ['openFile', 'multiSelections'],
        },
        fileNames => {
            console.log('filenames', fileNames);
            inputFiles = fileNames;
        }
    );
});

const destinationFolderChooserBtn = document.getElementById('destinationFolderChooser');
destinationFolderChooserBtn.addEventListener('click', () => {
    dialog.showOpenDialog(
        {
            title: 'Choose destination folder',
            // defaultPath: String (optional)
            // buttonLabel String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
            properties: ['openDirectory'],
        },
        directory => {
            console.log('directory', directory);
            targetDirectory = directory;
        }
    );
});

const ctaBtn = document.getElementById('cta');
ctaBtn.addEventListener('click', () => {
    if (inputFiles && inputFiles.length > 0 && targetDirectory && targetDirectory.length >= 1) {
        console.log('create ss at', targetDirectory[0]);
        cjsSpritesheetGenerator({
            dest: targetDirectory[0] + '/',
            images: inputFiles,
            outImgName: 'spritesheet',
            outImgExt: 'png',
            name: 'spritesheet',
        });
    }
});
