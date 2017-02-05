var result;

function messageHandler(msg, step) {
    var httpRequest = new XMLHttpRequest();
    if (step == 0) {
        result = "Test";
        //Event
    } else if (step == 1) {
        //Time and Location Check
    } else if (step == 2) {
        //Correct Code
        if (msg.toLowerCase() == "abcd") {
            result = "Correct Code! Please say what time you expect to be leaving.";
        } else {
            result = "Incorrect Code!";
        }
    } else if (step == 3) {
        //Time Leaving
        result = "Ok thanks! Hope to see you around!";
    } else if (step == 4) {

    }
    httpRequest.onreadystatechange = function() {

    }
    httpRequest.open('GET', 'http://localhost:8080?result=' + result);
    httpRequest.send();
}
