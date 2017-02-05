var time = 10;
var code = "ABCD";
var timeLeaving;

function MessageHandler(context, event) {
    if (event.message.toLowerCase() == "hello") {
        context.sendResponse("Hi! Which event are you going to?")
    } else if (event.message.toLowerCase() == "los altos hacks") {
        if (10 == time) {
            context.sendResponse("Thanks for arriving on time.\nPlease enter the given code: ")
        }
    } else if (event.message == code) {
        context.sendResponse("Ok, thanks. You have been added to the finalized list of attendees. Just tell me the time you expect to leave.")
    } else if (!isNaN(event.message)) {
        timeLeaving = event.message;
        context.sendResponse("We won't hold you to leaving at " + timeLeaving + "pm; its just for our personal statistics. Hope to see you around! ");
        isConfirmed = false;
    } else if (event.message.toLowerCase() == "thanks") {
        context.sendResponse("Bye");
    } else {
        context.sendResponse(event.message + " is not a valid code.");
    }
}
/** Functions declared below are required **/
function EventHandler(context, event) {
    context.sendResponse("Hi! Which event are you going to?");
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}
