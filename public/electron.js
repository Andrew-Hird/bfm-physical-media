const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const notifier = require('node-notifier')
const {appUpdater} = require('./autoupdater')

let mainWindow

const autoUpdater = require('electron-updater').autoUpdater

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 850,
    minHeight: 600,
    backgroundColor: '#222222',
    resizable: true,
    fullscreenable: true,
    show: false
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.once('ready-to-show', () => {
      mainWindow.show()
  })
  mainWindow.on('closed', () => (mainWindow = null))
  // initAutoUpdate()

  const page = mainWindow.webContents;
  
  page.once('did-frame-finish-load', () => {
    const checkOS = isWindowsOrmacOS();
    if (checkOS && !isDev) {
      // Initate auto-updates on macOs and windows
      appUpdater();
    }});

}

// function initAutoUpdate() {
//   if (isDev) {
//     return
//   }

//   if (process.platform === 'linux') {
//     return
//   }

//   autoUpdater.checkForUpdates()
//   autoUpdater.signals.updateDownloaded(showUpdateNotification)
// }

function showUpdateNotification(it) {
  it = it || {}
  const restartNowAction = 'Restart now'

  const versionLabel = it.label ? `Version ${it.version}` : 'The latest version'

  notifier.notify(
    {
      title: 'A new update is ready to install.',
      message: `${versionLabel} has been downloaded and will be automatically installed after restart.`,
      closeLabel: 'Okay',
      actions: restartNowAction
    },
    function(err, response, metadata) {
      if (err) throw err
      if (metadata.activationValue !== restartNowAction) {
        return
      }
      autoUpdater.quitAndInstall()
    }
  )
}

function isWindowsOrmacOS() {
	return process.platform === 'darwin' || process.platform === 'win32';
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
