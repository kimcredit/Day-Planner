//wait until everything is loaded to show items
$(document).ready(function () {

    console.log(moment().format("h"))

    //make the inner text of current day contain our weekday, month, and day
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    //getting current hour: 
    var currentTime = Number(moment().format("H"));

    //making object constructor for each hour block
    function hourSections (hour, value) {
        this.hour = hour;
        this.value = value;
    }
    var hourContent = [
        new hourSections ("8:00am", 8),
        new hourSections ("9:00am", 9),
        new hourSections ("10:00am", 10),
        new hourSections ("11:00am", 11),
        new hourSections ("12:00pm", 12),
        new hourSections ("1:00pm", 13),
        new hourSections ("2:00pm", 14),
        new hourSections ("3:00pm", 15),
        new hourSections ("4:00pm", 16),
        new hourSections ("5:00pm", 17),
    ];

    //making list items appear on the page
    for (var i = 0; i < hourContent.length; i++) {
        var listItem = $("<li>");
        //make a new list item
        listItem.addClass("one-hour");
        listItem.val(hourContent[i].value);
        //make new header to hold the time value
        var time = $("<h1>");
        time.addClass("time");
        time.text(hourContent[i].hour);
        //make new text area for user input
        var input = $("<textarea>");
        input.addClass("user-input");
        //make new button to save user input
        var saveButton = $("<button>");
        saveButton.addClass("save-button");
        saveButton.text("save");
        //add the children to the li and append to our schedule list
        listItem.append(time, input, saveButton);
        $(".schedule").append(listItem);
        //we link the css to our rows with classes
        //if the current hour is more the time of the hour block value it gets a past class
        if (listItem.val() < currentTime) {
            time.addClass("past-time");
            input.addClass("past-input");
            saveButton.addClass("past-save-button");
        //if the current hour is the same as the hour block value it gets a present class
        }else if (listItem.val() === currentTime) {
            time.addClass("present-time");
            input.addClass("present-input");
            saveButton.addClass("present-save-button");
        //if the current hour is less than the hour block value it gets a future class
        }else {
            time.addClass("future-time");
            input.addClass("future-input");
            saveButton.addClass("future-save-button");
        }  
        //setting buttons
        saveButton.on("click", function(event) {
            event.preventDefault();
            var textarea = $(this).siblings("textarea");
            var li = $(this).parent();
            //saving user inputs in local storage
            localStorage.setItem(li.val(), JSON.stringify(textarea.val()));
        });
        //getting items from local storage and adding them to input boxes upon refresh
        var storedTodos= JSON.parse(localStorage.getItem(listItem.val()));
        if (storedTodos !== "" || storedTodos !== null) {
            input.val(storedTodos);
        }
    }
});
