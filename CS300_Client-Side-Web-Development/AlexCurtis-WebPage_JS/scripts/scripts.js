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

// Display immediately when page loads
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);