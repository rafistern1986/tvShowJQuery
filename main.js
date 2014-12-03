/*array that all tv showes go into. they are entered as objects*/
var arrayThatHoldsAllTvShows_eachTvShowIsAnObject = [];

/*check locak storage is there user has saved books from time before, if yes write them in the list*/
$(document).ready(function () {
    if (localStorage.getItem("arrayInStorage_asSring") !== null) {
        var arrayWithTvShowsThatCameFromLocalStorage = JSON.parse(localStorage.getItem("arrayInStorage_asSring"));
        for (var i = 0; i < arrayWithTvShowsThatCameFromLocalStorage.length; i++) {
            addNewObjectToList(arrayWithTvShowsThatCameFromLocalStorage[i]);
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.push(arrayWithTvShowsThatCameFromLocalStorage[i]);
        }
    }
})

$(document).ready(function () {
    if ($(".theListOfShows").html() == "") {
        $("#ulWraper").hide()
    } else {
        $("#ulWraper").show()

    }
})

/*object builder for every tv show added*/
function TvShowObject(name, season, episode, score) {
    this.name = name;
    this.season = season;
    this.episode = episode;
    this.score = score;
    this.id = new Date().getTime();
};

function TvShowObject1(name, season, episode, score) {
    this.name = name;
    this.season = season;
    this.episode = episode;
    this.score = score;
};

/*the +/- button (to open/close area of adding new tv show)*/
$(document).ready(function () {
    $(".thePlusButton, .theMinusButton").click(function () {
        tooglePlusMinus_toggleAddingNewShow();
    })
});

/*toggle +/- and open/close area of adding new tv show*/
function tooglePlusMinus_toggleAddingNewShow() {
    $(".addTvShow").slideToggle();
    $(".thePlusButton").toggle();
    cleanUpInputs()
    $(".addTvShow input:nth(0)").focus();
}

/*when clicked to ad a tv show*/
$(document).ready(function () {
    $(".addTvShow input:nth(1)").on("click", newTvShowDetails);

});

$(document).ready(function () {
    if (arrayThatHoldsAllTvShows_eachTvShowIsAnObject.length > 0) {
        $(".theMinusButton, .thePlusButton").animate({
            bottom: "45%",
            marginRight: "0%",
            bottom: "5%",
        }, 1000)
    } else {
        $(".addTvShow input:nth(1)").one("click", function () {
            $(".theMinusButton, .thePlusButton").animate({
                marginRight: "0%",
                bottom: "5%",
            }, 1000)
        });
    }
});

/*details of the new tv show just entered*/
function newTvShowDetails() {
    $("#ulWraper").show()
    var name = $(".addTvShow input:nth(0)").val();;
    var season = $(".addTvShow select:nth(0)").val();
    var episode = $(".addTvShow select:nth(1)").val();
    var score = $(".addTvShow select:nth(2)").val();
    enterNewTvShowToObject(name, season, episode, score);
    tooglePlusMinus_toggleAddingNewShow();
}

function cleanUpInputs() {
    $(".addTvShow input:nth(0)").val("");
    $(".addTvShow select:nth(0)").val("Season");
    $(".addTvShow select:nth(1)").val("Episod");
    $(".addTvShow select:nth(2)").val("Score");
}

/*this is what happens when you add a tv show*/
function enterNewTvShowToObject(name, season, episode, score) {
    var obj = new TvShowObject(name, season, episode, score)
    addNewObjectToArray(obj);
    addNewObjectToList(obj);
};

function turnItToStars(score) {
    if (score == "1 star") {
        score = "*";
        return score;
    } else if (score == "2 stars") {
        score = "**";
        return score;
    } else if (score == "3 stars") {
        score = "***";
        return score;
    } else if (score == "4 stars") {
        score = "****";
        return score;
    } else if (score == "5 stars") {
        score = "*****";
        return score;
    }
}

/*add every tv show to the array that has all tv shows*/
function addNewObjectToArray(obj) {
    arrayThatHoldsAllTvShows_eachTvShowIsAnObject.push(obj);
    createLocalStorage(arrayThatHoldsAllTvShows_eachTvShowIsAnObject)
};

/*add the new book to the list*/
function addNewObjectToList(obj) {
    score = turnItToStars(obj.score);
    var newObj = new TvShowObject1(obj.name, obj.season, obj.episode, score)
        /*"ul" will append a "li" and the "li" will append "6 divs" and "1 attribute"*/
    $("ul.theListOfShows").append($("<li>").append(
        $("<div>").text(newObj.name),
        $("<div>").text(newObj.season),
        $("<div>").text(newObj.episode),
        $("<div>").text(newObj.score).css("fontSize", "28px"),
        $("<div><input type='button' value='edit'></div>"),
        $("<div><input type='button' value='delete'></div>")
    ).attr("id", obj.id));
};

/* delete button. to delete a tv show from list AND from array*/
$("ul li div input[value=delete]").live({
    click: function () {
        var id = $(this).parents("li").attr("id");
        $("#" + id).remove();
        for (var i = 0; i < arrayThatHoldsAllTvShows_eachTvShowIsAnObject.length; i++) {
            if (arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].id == id) {
                arrayThatHoldsAllTvShows_eachTvShowIsAnObject.splice(i, 1);
                createLocalStorage(arrayThatHoldsAllTvShows_eachTvShowIsAnObject)
                break;
            }
        }
    }
});

/* edit button. to change the divs with names ect. to text inputs*/
$("ul li div input[value=edit]").live({
    click: function (event) {
        var theDiv = $(this).parent();
        var sib = theDiv.siblings();
        for (var i = 0; i < 4; i++) {
            var sibling = sib[i];
            var valOfSibling = $(sibling).text()
            $(sibling).html("<input type='text' value=' " + valOfSibling + " '>").css("fontSize", "10px");
        }
        $("ul li div input[type=text]:nth(0)").select();
        var id = $(this).parents("li").attr("id");
        $("#" + id + " div:nth(5) input[type = button]").val("cancel");
        $(this).val("save");
    }
});

/*when inputs are text (to change current name ect.) and you press enter/esc*/
$("ul li div input[type=text]").live({
    keyup: function (eve) {
        var theKeyPreesed = eve.which;
        if (theKeyPreesed == 13 /*enter*/ ) {
            getNewValueOfTvShow_andReBuildList(this);
        } else if (theKeyPreesed == 27) {
            reWriteListFromArray()
        }
    }
})

/*when inputs are text (to change current name ect.) and you press save/cancel*/
$("ul li div input[value='save'], ul li div input[value=cancel]").live({
    click: function () {
        if ($(this).val() == "save") {
            getNewValueOfTvShow_andReBuildList(this)
        } else {
            reWriteListFromArray()
        }
    }
})

/*get New Value (after edit) Of Tv Show and ReBuild the List*/
function getNewValueOfTvShow_andReBuildList(thePlaceEventIsHppenig) {
    var id = $(thePlaceEventIsHppenig).parents("li").attr("id");
    var name = $("#" + id + " div:nth(0) input[type = text]").val();
    var season = $("#" + id + " div:nth(1) input[type = text]").val();
    var episode = $("#" + id + " div:nth(2) input[type = text]").val();
    var score = $("#" + id + " div:nth(3) input[type = text]").val();
    changeExsistingTvShowDetailsInArray(id, name, season, episode, score);
    reWriteListFromArray()
}

/*to re write the list of tv shows direct from array (used for local storge and if there was a edit done)*/
function reWriteListFromArray() {
    $(".theListOfShows").empty();
    for (var i = 0; i < arrayThatHoldsAllTvShows_eachTvShowIsAnObject.length; i++) {
        addNewObjectToList(arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i]);
    }
}

/*chang tv show details in array if edit was done*/
function changeExsistingTvShowDetailsInArray(id, name, season, episode, score) {
    for (var i = 0; i < arrayThatHoldsAllTvShows_eachTvShowIsAnObject.length; i++) {
        if (arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].id == id) {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].name = name;
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].season = season;
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].episode = episode;
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject[i].score = score;
        }
        createLocalStorage(arrayThatHoldsAllTvShows_eachTvShowIsAnObject);
    }
}

/*this creats the local storge with the aray of tv shows*/
function createLocalStorage(arrayThatHoldsAllTvShows_eachTvShowIsAnObject) {
    var arrayInString = JSON.stringify(arrayThatHoldsAllTvShows_eachTvShowIsAnObject);
    localStorage.setItem("arrayInStorage_asSring", arrayInString);
}

/*search tv show list*/
$(document).ready(function () {
    $("#searchWords").keyup(function () {
        var searchWords = $(this).val();
        $("ul.theListOfShows li").show()
        for (var i = 0; i < $("li").length; i++) {
            var theIdOfTheCurentLi = $("li")[i].id;
            var arrayWithSearchResults = $("#" + theIdOfTheCurentLi + ":contains(" + searchWords + ")");
            if (arrayWithSearchResults.length == 0) {
                $("#" + theIdOfTheCurentLi).hide()
            }
        }
    });
})

$(document).ready(function () {
    $(".sortListBy").change(function () {
        if ($(".sortListBy").val() == "aFirst") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(compare)
        } else if ($(".sortListBy").val() == "zFirst") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(compareBackwords)
        } else if ($(".sortListBy").val() == "season") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(function (a, b) {
                return parseFloat(a.season) - parseFloat(b.season)
            })
        } else if ($(".sortListBy").val() == "episode") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(function (a, b) {
                return parseFloat(a.episode) - parseFloat(b.episode)
            })
        } else if ($(".sortListBy").val() == "score") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(function (b, a) {
                return parseFloat(a.score) - parseFloat(b.score)
            })
        } else if ($(".sortListBy").val() == "newest") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(function (a, b) {
                return parseFloat(b.id) - parseFloat(a.id)
            })
        } else if ($(".sortListBy").val() == "oldest") {
            arrayThatHoldsAllTvShows_eachTvShowIsAnObject.sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id)
            })
        }
        reWriteListFromArray()
    })
})

function compare(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

function compareBackwords(b, a) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}
