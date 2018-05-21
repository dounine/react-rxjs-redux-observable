const {EventEmitter}= require('events');
window.EVENT = new EventEmitter();
let {remote, desktopCapturer, ipcRenderer} = require('electron');
let url = require('url');
let path = require('path');
let BrowserWindow = remote.BrowserWindow;
let w = screen.width,
    h = screen.height;
let captureWin = null;

// 去除默认选择
// document.onselectstart = function () {
//     return false;
// };

function screenShot(event,message) {
    // if (!win) {

    capturer().then(function (data) {
        captureWin = createChildWin('/index.html', {
            fullscreen: true,
            width: 900,
            height: 800,
            alwaysOnTop: true,
            skipTaskbar: false,
            autoHideMenuBar: true,
        });
        if(message.shortcut){
            window.EVENT.emit('LISTENER_CAPTURE_SHORTUCT')
        }
        // win.webContents.openDevTools()
    });
    // }
    // return win;
}

ipcRenderer.on('global-shortcut-capture', screenShot);
window.EVENT.on('global-shortcut-capture',function () {
    screenShot(null,{});
});

// 接受截图退出事件
ipcRenderer.on('quit-cut', function (event,{data}) {
    window.EVENT.emit('captureFinish',{data});
    captureWin && clearWindow(captureWin);
    captureWin = null;
});

/**
 * 创建截屏窗口
 */
function createChildWin(_url, opts) {
    let config = {
        fullscreen: true,
        frame: true
    };
    config = Object.assign(config, opts);
    let captureWin = new BrowserWindow(config);

    captureWin.loadURL('http://localhost:3000/screen/index.html');

    captureWin.on('closed', function () {
        captureWin = null;
    });
    captureWin.on('close', function () {
        captureWin = null;
    });
    return captureWin;
}


/**
 * 关闭窗口 取消截屏
 * @param  _win
 */
function clearWindow(captureWin) {
    captureWin && captureWin.close()
}

/**
 * 截取屏幕资源到本地
 */
function capturer() {
    return new Promise(function (resolve, reject) {
        desktopCapturer.getSources({
            types: ['screen'],
            thumbnailSize: {width: w, height: h}
        }, function (error, sources) {
            //保存图片base64到本地缓存
            // console.log.apply(console,[sources[0].thumbnail.toDataURL()]);
            localStorage['image'] = sources[0].thumbnail.toDataURL();
            resolve(sources[0].thumbnail.toDataURL())
        })
    })
}

window.EVENT.on('CLOSE',function () {
    ipcRenderer.send('CLOSE');
});
window.EVENT.on('MIN',function () {
    ipcRenderer.send('MIN');
});
window.EVENT.on('MAX',function () {
    ipcRenderer.send('MAX');
});
let keys = [{
    key:'esc',
    ipc:'quit-cut'
},{
    key:'CommandOrControl+Shift+A',
    ipc:'global-shortcut-capture',
    param:{shortcut:true}
}];
ipcRenderer.send('bindGlobalShortuct',{keys});//绑定全局快捷键