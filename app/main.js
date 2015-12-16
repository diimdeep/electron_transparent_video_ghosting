const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;

var opaque = null;
var transparent = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // var atomScreen = require('screen');
  // var size = atomScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  opaque = new BrowserWindow({width: 620,
                                  height: 313,
                                  minWidth: 250,
                                  minHeight: 150,
                                  x: 20,
                                  y: 20,
                                  //frame: false,
                                  transparent: false,
                                  //resizable: false,
                                  'title-bar-style': 'hidden'
                                });

  // and load the index.html of the app.
  opaque.loadUrl('file://' + __dirname + '/test.html');

  transparent = new BrowserWindow({width: 620,
                                  height: 313,
                                  minWidth: 250,
                                  minHeight: 150,
                                  x:20,
                                  y: 200,
                                  //frame: false,
                                  transparent: true,
                                  //resizable: false,
                                  'title-bar-style': 'hidden'
                                });

  // and load the index.html of the app.
  transparent.loadUrl('file://' + __dirname + '/test.html');


  // if (process.env.NODE_ENV === 'development') {
     //mainWindow.openDevTools({detach: true});
  // }

});
