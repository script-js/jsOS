let dock = document.querySelector("#dock");
class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};

function checkOverflow() {
    if (dock.scrollWidth > dock.clientWidth) {
        dock.classList.add("overflow");
    } else {
        dock.classList.remove("overflow");
    }
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
             return pair[1];
            }
       }
       return(false);
}

let id = getQueryVariable("app");
let date = getQueryVariable("date");
let text = getQueryVariable("text");
let view = getQueryVariable("view");

var keys = {}

let appsMini = 0;

const appShell = document.createElement("div");
appShell.classList.add("appShell");
const appsShellName = document.createElement("p");
appsShellName.classList.add("name");
const appOptions = document.querySelector(".appOptions");
shell.appendChild(appShell);

let params;

function hideStart() {
    if (document.querySelector(".apps").classList.contains("op")) {
        document.querySelector(".apps").classList.add("hidden");
        document.querySelector("#appsL").classList.remove("appsIF");
        document.querySelector(".apps").classList.remove("op");
    }
}

var availableApps = ["browser", "hypertabs", "code", "youtube", "apple music", "spotify", "tidal", "youtube music", "settings", "help", "color picker", "terminal", "video", "game center"];

class WIN {
    constructor(link, icon, title, os, fullscreen, appName, controlsTypes, textAppText, urlToOpen, oneInstance, width, height, resizable) {
        this.link = link;
        this.icon = icon;
        this.title = title;
        this.os = os;
        this.fullscreen = fullscreen;
        this.appName = appName;
        this.textAppText = textAppText;
        this.controlsTypes = controlsTypes;
        this.urlToOpen = urlToOpen;
        this.oneInstance = oneInstance;
        this.width = width;
        this.height = height;
        this.resizable = resizable;
        this.create()
    }
    create() {
        let allParams = [];
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                if(this[prop] == undefined) {
                    // console.warn(`%cThere is no %c${prop}%c property, this may affect the app.`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;");
                    continue;
                }
                let paren;
                let propItem;
                if(!this[prop].includes("(")) {
                    console.error(`%cThere is a missing indication properties -> %ctype%c\nfor example: %c(link) %cfor indication for what %ctype %cto set`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;");
                    console.log(`%cA good working window initialization would look like this:\n%cnew %cWIN%c(%c"(link)[../test/test.html]"%c, %c"(icon)[../resources/test.svg]"%c, %c"(title)[Terbium Test]"%c, %cfalse%c, %ctrue%c, %cfalse%c, %c"test"%c, %c"minClose"%c)`, "color: #ff4747;", "color: #ba5eff;", "color: #fcef79;", "color: #ba5eff;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #ba5eff;");
                }
                if(!this[prop].includes("[")) {
                    console.error(`%cThere is no indicating properties -> %cvalue%c\nfor example: %c[https://example.com] %cfor property: %c(link)`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;", "color: #fff157;");
                }
                paren = this[prop].substring(this[prop].indexOf("(") + 1, this[prop].indexOf(")")).toLowerCase();
                propItem = this[prop].substring(this[prop].indexOf("[") + 1, this[prop].indexOf("]"));
                allParams.push(`(${paren})[${propItem}]`);
            }
        }

        let controlsTypes;
        let title;
        let link;
        let icn;
        let os;
        let fullscreen;
        let appName;
        let textAppText;
        let urlToOpen;
        let oneInstance;
        let width;
        let height;
        let resizable;

        let windowsCell = document.querySelector(".windows");
        let allWindowsHolder = windowsCell.querySelector(".windowsList");
        let lastWindow = windowsCell.querySelector(".lastWindow");
        let currentWindow = windowsCell.querySelector(".currentWindow");
        let nextWindow = windowsCell.querySelector(".nextWindow");

        allParams.filter((item) => {
            let brackVal = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            if(item.includes("undefined")) {
                return brackVal;
            }
            if(item.includes("null")) {
                return brackVal;
            }
            if(item.includes("(link)") || item.includes("(url)") || item.includes("(href)") || item.includes("(lnk)")) {
                link = brackVal;
            }
            if(item.includes("(icon)") || item.includes("(icn)")) {
                icn = brackVal;
            }
            if(item.includes("(title)")) {
                title = brackVal;
            }
            if(item.includes("(os)")) {
                os = brackVal.toLowerCase();
            }
            if(item.includes("(fullscreen)") || item.includes("(full)")) {
                fullscreen = brackVal.toLowerCase();
            }
            if(item.includes("(appname)")) {
                appName = brackVal;
            }
            if(item.includes("(textapptext)") || item.includes("(textapp)") || item.includes("(text)") || item.includes("(txt)")) {
                textAppText = brackVal;
            }
            if(item.includes("(controls)") || item.includes("(ctrls)") || item.includes("(controlsTypes)") || item.includes("(ctrlsTypes)")) {
                if(brackVal === undefined || brackVal === null || brackVal === "all") {
                    controlsTypes = "minmaxclose";
                } else {
                    controlsTypes = brackVal.toLowerCase();
                }
            }
            if(item.includes("(urltoopen)") || item.includes("(urltoopen)") || item.includes("(urltoopen)") || item.includes("(urltoopen)")) {
                urlToOpen = brackVal;
            }
            if(item.includes("(oneinstance)") || item.includes("(oneinst)")) {
                oneInstance = brackVal.toLowerCase();
            }
            if(item.includes("(width)")) {
                width = brackVal;
            }
            if(item.includes("(height)")) {
                height = brackVal;
            }
            if(item.includes("(resizable)") || item.includes("(resize)")) {
                resizable = brackVal.toLowerCase();
            }
        });

        appShell.appendChild(appsShellName);
        if(appsShellName.classList.contains("inactive")) {
            appsShellName.classList.remove("inactive");
        }
        appsShellName.innerText = title;
        const appID = document.querySelector(".name").getAttribute("data-id");
        let chromeJS = document.createElement("script");
        chromeJS.src = "./js/chrome-tabs.js";
        let maxState;
        const newwin = document.createElement("div");
        let windowID;
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return windowID = result;
        }
        makeid(18);
        if(width) {
            newwin.setAttribute("data-width", height);
            if(width.includes("px")) {
                newwin.style.width = width;
            } else {
                newwin.style.width = `${width}px`;
            }
        }
        if(height) {
            newwin.setAttribute("data-height", height);
            if(height.includes("px")) {
                newwin.style.height = height;
            } else {
                newwin.style.height = `${height}px`;
            }
        }
        newwin.setAttribute("data-id", windowID);
        if 
        newwin.setAttribute("data-link", link);
        newwin.setAttribute("data-title", title);
        newwin.setAttribute("data-os", os);
        newwin.setAttribute("data-fullscreen", fullscreen);
        newwin.setAttribute("data-appName", appName);
        newwin.setAttribute("data-textAppText", textAppText);
        newwin.setAttribute("min-height", "499");
        newwin.setAttribute("min-width", "499");
        newwin.setAttribute("urlToOpen", urlToOpen);
        newwin.setAttribute("oneInst", oneInstance);
        newwin.setAttribute("data-resizable", resizable);
        newwin.setAttribute("data-controls", controlsTypes);

        if(allWindowsHolder.innerHTML === "") {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("cell-id", windowID);
            allWindowsHolder.appendChild(cell);
        } else {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("cell-id", windowID);
            allWindowsHolder.appendChild(cell);
        }

        let allWindowsForCellNumberCheck = document.querySelectorAll(".cell");
        currentWindow.innerHTML = `${newwin.getAttribute("data-id")}`;
        if(allWindowsForCellNumberCheck.length > 1) {
            // console.log("tits");
            lastWindow.innerHTML = document.querySelector(".winFocus").getAttribute("id");
        } else if(allWindowsForCellNumberCheck.length == 1) {
            // lastWindow.innerHTML = document.querySelector(".winFocus").getAttribute("id")
            if(document.querySelector(".winFocus")) {
                console.log(document.querySelector(".winFocus").getAttribute("id"));
            }
        }

        if(resizable === "no" || resizable === "false") {
            newwin.setAttribute("data-resizable", "no");
            newwin.classList.add("no-resize");
        } else if(resizable === "yes" || resizable === "true") {
            newwin.setAttribute("data-resizable", "yes");
        }
        if(oneInstance === "yes" || oneInstance === "true") {
            appShell.setAttribute("oneInst", "yes");
            if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                document.querySelectorAll(`.win`).forEach((item) => {
                    item.classList.remove("winFocus");
                    item.classList.add("winNotFocus");
                    item.querySelector(".focusWinEl").classList.remove("no");
                    item.querySelector(".focusWinEl").classList.add("yes");
                })
                document.querySelector(`[data-appname='${appName}']`).classList.remove("winNotFocus");
                document.querySelector(`[data-appname='${appName}']`).classList.remove("winmini");
                document.querySelector(`[data-appname='${appName}']`).classList.remove("negZI");
                document.querySelector(`[data-appname='${appName}']`).classList.add("winFocus");
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.add("no");
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.remove("yes");
                document.querySelectorAll(`[app]`).forEach((item) => {
                    item.classList.remove("active");
                })
                let id = document.querySelector(`[data-appname='${appName}']`).getAttribute("data-id");
                document.querySelector(`[data-appid="${id}"]`).classList.add("active");
                document.querySelector(".appShell").querySelector(".name").setAttribute("data-id", id);
                document.querySelector(".appShell").querySelector(".name").innerHTML = title;
                document.querySelector(".appShell").setAttribute("oneInst", "yes");
                return
            }
        } else {
            appShell.setAttribute("oneInst", "no");
        }

        let focusWinEl = document.createElement("div");
        focusWinEl.classList.add("focusWinEl");
        newwin.appendChild(focusWinEl);
    
        appsShellName.onclick = (e) => {
            if(appsShellName.innerHTML == "" || appsShellName.classList.contains("inactive")) {
                return
            } else {
                if(appOptions.classList.contains("h")) {
                    appOptions.classList.remove("h");
                }
            }
            window.addEventListener("mousedown", (e) => {
                if (e.button == 0 && !e.target.closest(".appOptions") && appOptions.classList.contains("h") == false && !e.target.closest(".name")) {
                    appOptions.classList.add("h");
                }
            });
            appOptions.querySelector(".closeApp").onclick = (e) => {
                appsShellName.innerHTML = "";
                appsShellName.classList.add("inactive");
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".close").click();
            }
            appOptions.querySelector(".newwin").onclick = (e) => {
                let link = document.querySelector(".winFocus").getAttribute("data-link");
                let icn = document.querySelector(".winFocus").getAttribute("data-icon");
                let os = document.querySelector(".winFocus").getAttribute("data-os");
                let fullscreen = document.querySelector(".winFocus").getAttribute("data-fullscreen");
                let appName = document.querySelector(".winFocus").getAttribute("data-appName");
                let controlsTypes = document.querySelector(".winFocus").getAttribute("data-controls");
                let textAppText = document.querySelector(".winFocus").getAttribute("data-textAppText");
                let width = document.querySelector(".winFocus").getAttribute("data-width");
                let height = document.querySelector(".winFocus").getAttribute("data-height");
                let resizable = document.querySelector(".winFocus").getAttribute("data-resizable");
                let title = document.querySelector(".winFocus").getAttribute("data-title");
                appOptions.classList.toggle("h");
                if(appShell.getAttribute("oneInst") === "yes" || appShell.getAttribute("oneInst") === "true") {
                    if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                        return
                    }
                }
                new WIN(`(link)[${link}]`, `(icn)[${icn}]`, `(title)[${title}]`, `(os)[${os}]`, `(fullscreen)[${fullscreen}]`, `(appName)[${appName}]`, `(controls)[${controlsTypes}]`, `(textAppText)[${textAppText}]`, `(width)[${width}]`, `(height)[${height}]`, `(resizable)[${resizable}]`);
            }
            appOptions.querySelector(".minimizeApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".mini").click();
            }
            appOptions.querySelector(".maximizeApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".maxi").click();
            }
            appOptions.querySelector(".reloadApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                let win = document.querySelector(".appShell").querySelector(".name").getAttribute("data-id");
                console.log(win);
                if(document.querySelector(`#${win}`)) {
                    let src = document.querySelector(`#${win}`).querySelector(".frame").src;
                    document.querySelector(`#${win}`).querySelector(".frame").src = "about:blank";
                    document.querySelector(`#${win}`).querySelector(".frame").src = src;
                } else {
                    console.error("Window not found, this shouldn't be!");
                }
            }
        }
    
        appsShellName.setAttribute("data-id", windowID);
        newwin.id = windowID;
        newwin.classList.add("win");
        newwin.classList.add("maxiN");
        newwin.setAttribute("data-title", title);
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].classList.add("winNotFocus");
            windows[i].classList.remove("winFocus");
            windows[i].querySelector(".focusWinEl").classList.remove("no");
            windows[i].querySelector(".focusWinEl").classList.add("yes");
        }
    
        newwin.classList.add("winFocus");
        newwin.style.opacity = "";
        newwin.classList.remove("winNotFocus");
        if(appName != null && appName != undefined) {
            newwin.setAttribute("data-app", appName);
        }
    
        if(localStorage.getItem("shadow") === "yes") {
            if(localStorage.getItem("winshadow") === "default") {
                if(localStorage.getItem("accentShadow") === "yes") {
                    newwin.style.boxShadow = `0 0 1px 1px var(--accentShadow), 0px 0px 13px 4px var(--accentShadow)`;
                    newwin.classList.add("shadow");
                } else {
                    newwin.style.boxShadow = `0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)`;
                    newwin.classList.add("shadow");
                }
            } else {
                newwin.style.boxShadow = `0 0 1px 1px ${localStorage.getItem("winshadow")}, 0 0 13px 4px ${localStorage.getItem("winshadow")}`;
                newwin.classList.add("shadow");
            }
        }
        switch(localStorage.getItem("fullscreen")) {
            case null:
                break;
            case "yes":
                shell.style.borderRadius = "0px";
                if(localStorage.getItem("dockFull") === "yes") {
                    switch(localStorage.getItem("dockPos").toLowerCase()) {
                        case "left":
                            newwin.classList.add("LDF");
                            newwin.classList.remove("RDF");
                            newwin.classList.remove("BDF");
                            break;
                        case "right":
                            newwin.classList.add("RDF");
                            newwin.classList.remove("LDF");
                            newwin.classList.remove("BDF");
                            break;
                        case "bottom":
                            newwin.classList.add("BDF");
                            newwin.classList.remove("LDF");
                            newwin.classList.remove("RDF");
                            break;
                        default:
                            break;
                    }
                } else {
                  
