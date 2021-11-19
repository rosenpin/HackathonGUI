const SERVER_URL = "http://127.0.0.1:8000"

function receive(callback) {
    httpGetAsync(SERVER_URL, callback)
}


const refreshTime = 100;
const animationTime = 3000;
const INVALID = 0;
let current = INVALID;
const highlightColor = 'white'
const backgroundColor = '#546E7A'

function animateGrowShrink(el) {
    anime({
        targets: '#' + el,
        scale: 1.5,
        duration: 500,
        complete: function (anim) {
            anime({
                targets: '#' + el,
                duration: 500,
                scale: 1,
            });
        }
    });
}


function start() {
    console.log("starting" + current)
    const _current = current
    if (_current === INVALID) {
        alert("error, current is undefined")
        return
    }
    const el = "#part" + _current;

    $(el).css("border-color", highlightColor)
    $(el).css("background-color", backgroundColor)
    $(el).animate({opacity: 0.7}, animationTime);
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

function stopPrevious() {
    for (let i = 1; i <= 9; i++) {
        const el = "#part" + i;
        $(el).stop(true)
        $(el).css('opacity', 0.0)
        $(el).css("border-color", highlightColor)
        $(el).css("background-color", backgroundColor)
    }
}

let receiving = true;

function stopReceiving() {
    receiving = false;
    setTimeout(function () {
        receiving = true
    }, 5000)
}

function select(part) {
    //document.location = "part.html?part=" + current;
    $("#part" + part).css("background-color", "green")
    animateGrowShrink("part" + part)
    stopReceiving()
}

function parseInput(value) {
    let part = value.split("-")[0]
    let selected = value.split("-")[1]
    return {part: part, selected: selected}
}

function handleInput(value) {
    // remove loading after server connect
    document.getElementById("loading").hidden = true;

    var result = parseInput(value)
    if (result.part == INVALID) {
        console.log("got 0")
        stopPrevious()
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
    console.log("trying to read from server")
    if (receiving) {
        receive(handleInput);
    }
    myLoop();             //  ..  again which will trigger another
}

function myLoop() {         //  create a loop function
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
        loopContent()
    }, refreshTime)
}

loopContent()