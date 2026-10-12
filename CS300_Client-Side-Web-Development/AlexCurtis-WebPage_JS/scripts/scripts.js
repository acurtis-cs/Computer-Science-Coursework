$(document).ready(function(){

    $(".clickTitle").click(function(){
        $(this).next(".hiddenInfo").slideToggle(500);

        if ($(this).text().includes("▼")) {
            $(this).text($(this).text().replace("▼", "▲"));
        }
        else {
            $(this).text($(this).text().replace("▲", "▼"));
        }
    });

});


/* LIVED FLAGES */
$(".flagLived img").click(function(){

    var country = $(this).attr("alt");

    $("#flagInfo").text("I lived in: " + country);

});


/* VISTIED FLAGES */
$("#flags img").click(function(){

    var country = $(this).attr("alt");

    $("#travelInfo").text("I traveled to: " + country);

});




// Display current date and time
function updateDateTime() {

    var now = new Date();

    $("#date").text(now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }));

    $("#time").text(now.toLocaleTimeString("en-US"));

}

// Activates once page loads
updateDateTime();

// Active time clock
setInterval(updateDateTime, 1000);




// PHOTO GALLERY

$(".travelPhoto").click(function(){

    var photo = $(this).attr("src");
    var caption = $(this).attr("alt");

    $("#mainPhoto").attr("src", photo);
    $("#mainPhoto").attr("alt", caption);

    $("#photoCaption").text(caption);

});