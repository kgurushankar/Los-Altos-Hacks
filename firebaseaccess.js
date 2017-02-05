/*
https://www.gstatic.com/firebasejs/3.6.2/firebase.js
https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js
https://www.gstatic.com/firebasejs/3.6.2/firebase-database.js
https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js
*/
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyBr7M2TFxVXYcSYf_OLNevG3bjTctCm5CA",
    authDomain: "losaltoshacks-6be78.firebaseapp.com",
    databaseURL: "https://losaltoshacks-6be78.firebaseio.com",
    storageBucket: "losaltoshacks-6be78.appspot.com",
    messagingSenderId: "573810510799"
};
firebase.initializeApp(config);


var database = firebase.database();


function CreateEvent(Name, Time, Location, Code) {
    firebase.database().ref('/events/' + Name).set({
        name: Name,
        time: Time,
        location: Location,
        code: Code
    });
}

function GetEventData(EventName) {
    var out = ["", "", "", ""];
    firebase.database().ref('/events/' + EventName + '/name').once('value').then(function(snapshot) {
        out[0] = snapshot.val();
    });
    firebase.database().ref('/events/' + EventName + '/time').once('value').then(function(snapshot) {
        out[1] = snapshot.val();
    });
    firebase.database().ref('/events/' + EventName + '/location').once('value').then(function(snapshot) {
        out[2] = snapshot.val();
    });
    firebase.database().ref('/events/' + EventName + '/code').once('value').then(function(snapshot) {
        out[3] = snapshot.val();
    });
    return out;
}

function eventExists(EventName) {
    var exists = false;
    firebase.database().ref('/events/' + EventName + '/name').once('value').then(function(snapshot) {
        exists = (snapshot.val() == "");
    });
    return exists;
}

function CreateSuperUser(User, pass) {
    var hashed = hash(pass);
    firebase.database().ref('/SU/' + User).set({
        user: User,
        pw: hashed
    });
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (true) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function LoginSU(User, pass) {
    var value = GetSU(User);
    var str = hash(pass);
    return (value == str);
}

// has to be called twice to work

function GetSU(User) {
    var x;
    firebase.database().ref('/SU/' + User + '/pw').once('value').then(function(snapshot) {
        x = snapshot.val();
    });
    while (x == null) {
        sleep(50);
    }
    return x;

}

function MarkPrescence(Event, Name, boolean) {

    return firebase.database().ref('/events/' + Event + '/People').update({
            [Name]: boolean
        }

    );
}

//Internal
function hash(str) {
    var hash = 0,
        i, chr, len;
    if (str.length === 0) {
        return hash;
    }
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
