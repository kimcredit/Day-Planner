// //getting current day (monday-friday)
var d = new Date();
var weekDay = new Date().toLocaleDateString('en', {weekday:'long'})

//getting current month
var months = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
          
var month = months[d.getMonth()]; 

//getting current day
var day = d.getUTCDate();
var today;

//adding ordinal indicators to numbers
if (day === 1 || day === 21 || day === 31) {
    today = (day + "st");
}else if (day === 2 || day === 21) {
    today = (day + "nd");
}else if (day === 3 || day === 23) {
    today = (day + "rd");
}else (today = day + "th");

//make the inner text of current day contain our weekday, month, and day
$("#currentDay").text(weekDay + ", " + month + " " + today);

//getting current hour: 
var currentTime = 11;

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
    
    listItem.addClass("one-hour");
    listItem.val(hourContent[i].value);

    //each list item get a time, input, and save button
    var time = $("<h1>");
    time.addClass("time");
    time.text(hourContent[i].hour);

    var input = $("<textarea>");
    input.addClass("user-input");

    var saveButton = $("<button>");
    saveButton.addClass("save-button");
    saveButton.text("save");

    listItem.append(time, input, saveButton);
    $(".schedule").append(listItem);

    //we link the css to our rows with classes
    //if the current hour is more the time of the hour block valye it gets a past class
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
        console.log(input);
        var textarea = saveButton.siblings("textarea");
        console.log(textarea);
        console.log($(textarea).text());
        //if they enter nothing renturn the function
        if (input.val() === "") {
            console.log("input empty");
            return;
        }
        //otherwise retrieve the values from local storage and add our new input to local storage
        else { 
            var storedTodos = JSON.parse(localStorage.getItem("user input"));
                if (storedTodos !== null) {
                    input.val(storedTodos);
                }
            localStorage.setItem("user input", JSON.stringify(input.val()));
            input.addClass("saved-input");
    
            console.log("else statement");
        }
    });

}
