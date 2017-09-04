var electronInstaller = require('electron-winstaller')

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '/build/win-unpacked',
    outputDirectory: '/build/win-packed',
    authors: 'Andrew Hird',
    exe: '95bFM.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`))