function getSpesificParmeterThatCameInUrl(theName) {
    var longSearch = window.location.search;
    longSearch = longSearch.replace("?", "");
    var searchAsArray = longSearch.split("&");
    for (var i = 0; i < searchAsArray.length; i++) {
        var cutArray = searchAsArray[i].split("=");
        if (cutArray[0] === theName) {
            return cutArray[1].split("%20").join(" ");
        }
    }
}
$(document).ready(function () {
    var whatBookDidClientClick = getSpesificParmeterThatCameInUrl("whithBook");
    var arrayFromLocalStorage = JSON.parse(localStorage.getItem("arrayInStorage_asSring"));
    for (var i = 0; i < arrayFromLocalStorage.length; i++) {
        if (arrayFromLocalStorage[i].id == whatBookDidClientClick) {
            addNewObjectToList(arrayFromLocalStorage[i])
        }
    }
})


function addNewObjectToList(obj) {
    var date = new Date(obj.id).toString();
    var dateInShort = date.substring(0, 15)
    var name = obj.name.toUpperCase();
    var linkToGoogel = $("<a>").attr("href", "https://www.google.co.il/?#q=" + obj.name + "+season+" + obj.season + "+episode+" + obj.episode).text("googel it").attr("target", "_blank");
    var linkToTrailer = $("<a>").attr("href", "https://www.youtube.com/results?search_query=" + obj.name + "+season+" + obj.season + "+episode+" + obj.episode + "+trailer").text("watch trailer").attr("target", "_blank");
    var name = $("<h1>").text(name);
    var season = $("<div>").text(obj.season);
    var episode = $("<div>").text(obj.episode);
    var score = $("<div>").text(obj.score);
    var dateAdded = $("<div>").text(dateInShort).attr("title", date);
    var status = $("<div>");
    var details = $("<div>").append(linkToGoogel);
    var trailer = $("<div>").append(linkToTrailer);
    var theWholeLi = $("<li>").append(season, episode, score, dateAdded, status, details, trailer);
    $("div.theNameInBig").append(name);
    $("ul.theListOfShows").append(theWholeLi);

};
