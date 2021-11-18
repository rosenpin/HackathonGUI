const SERVER_URL = "http://192.168.43.39:8000"

function receive(callback) {
    httpGetAsync(SERVER_URL, callback)
}


const INVALID = 0;
var current = INVALID;

function start() {
    console.log("starting" + current)
    const _current = current
    if (_current === INVALID) {
        alert("error, current is undefined")
        return
    }
    const el = "#part" + _current;

    let i = 0;
    while (i < 100) {
        i++;
        const _i = i
        if (current === _current) {
            setTimeout(function () {
                $(el).css('opacity', _i / 100)
            }, 20 * i)
        } else {
            break
        }
    }
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function stopPrevious(index) {
    console.log("stopping "+index)
    var el = "#part" + index
    $(el).css('opacity', 0.0)
}

function select(part) {
    //document.location = "part.html?part=" + current;
}

function parseInput(value) {
    let part = value.split("-")[0]
    let selected = value.split("-")[1]
    return {part: part, selected: selected}
}

function handleInput(value) {
    var result = parseInput(value)
    if (result.part == INVALID) {
        console.log("got 0")
        stopPrevious(current)
        current = INVALID
        return
    }
    console.log("got " + result.part + result.selected)
    if (result.selected == 2) {
        console.log("selecting " + result.part)
        current = result.part
        select(result.part)
        return
    }
    if (result.selected == 1) {
        if (current != result.part) {
            stopPrevious(current)
            current = result.part;
            start()
        }
    }
}

function loopContent() {
    document.getElementById("loading").hidden = true;
    console.log("trying to read from server")
    receive(handleInput);
    myLoop();             //  ..  again which will trigger another
}

function myLoop() {         //  create a loop function
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
        loopContent()
    }, 500)
}

loopContent()
