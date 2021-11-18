var url_string = window.location.href
var url = new URL(url_string);
var part = url.searchParams.get("part");
console.log(part);
var map = {
    1:"imgs/"
}
$("part").src = "imgs/"
