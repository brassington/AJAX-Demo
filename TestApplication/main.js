﻿"use strict";
//Store URL in a variable
var url = "https://ajaxintro2.firebaseio.com/";

var nameArray = [];

////READ - write/display/output table
//var outputTable = function () {
//    var holder = "<table>";
//    for (var x in nameArray) {
//        holder += "<tr>";
//        for (var y in nameArray[x]) {
//            holder += "<td>";
//            holder += nameArray[x][y];
//            holder += "</td>";
//        }


//        holder += "</tr>";
//    }
//    holder += "</table>";
//    document.getElementById("outputTable").innerHTML = holder;

//};

var outputTable = function () {
    var table = document.createElement('table');
    for (var idKey in nameArray) {
        var tr = document.createElement('tr');
        for (var value in nameArray[idKey]) {
            var td = document.createElement('td');
            td.innerHTML = nameArray[idKey][value];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

var updateAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("PUT", "https://ajaxintro2.firebaseio.com/" + id + ".json", true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            getAjax()
        }
        else {
            throw new Error("Hey, something server side screwed up!");
        }
    }
    request.onerror = function () {
        throw new Error("Hey, your request never made it to the server.")
    }
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    request.send(JSON.stringify({ first: firstName.value, last: lastName.value }));

    firstName.value = '';
    lastName.value = '';
}





var deleteAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + id + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            getAjax();
        }
        else {
            console.log("Poop")
        }
    }
    request.onerror = function () {
        console.log("Never made it")
    }
    request.send();
}




























var postAjax = function () {
    //Step 1. Create request object
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open
    request.open("POST", url + ".json", true);
    //Setp 3. Define what happens when request comes back aka request.onLoad
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //This means good things are happening
            alert(this.response);
        }
        else {
            //This means the data got to the server and failed
            console.log(this.response);
        }
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        //This is a "timeout request", which means the response was not received. 
        console.log("Com ERRRRRR");
    };
    //Step 4.1 Define info to send to firebase
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var name = {
        first: firstName,
        last: lastName
    };
    console.log("This is unstringified: " + name);
    name = JSON.stringify(name);
    console.log("This is stringified: " + name);
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    //var name = {
    //    firstName: "Jacqueline",
    //    lastName: "Sloves"
    //};
    //console.log("This is unstringified: " + name);
    //name = JSON.stringify(name);
    //console.log("This is stringified: " + name);
    //Step 5. Send request. 
    request.send(name);
};

var getAjax = function () {
    //Step 1. Create request object
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open
    request.open("GET", url + ".json", true);
    //Setp 3. Define what happens when request comes back aka request.onload
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.dir(this.response);
            alert("Your response is: " + this.response);
            //Step A. Parse response (creates an object), and store in variable, often called "data"
            var data = JSON.parse(this.response);
            alert("This is parsed data: " + data);
            //Step B. Add any actions to be done on successful load, such as pushing data into an array, and writing the table.
            nameArray = [];
            for (var id in data) {
                //data[x].id = x;
                data[id].editButton = "<button onclick='updateAjax(\"" + id + "\")'>Edit</button>";
                data[id].deleteButton = "<button onclick='deleteAjax(\"" + id + "\")'>Delete</button>";
                nameArray.push(data[id]);
            }
            //Call Output Table function
            outputTable();

        } else {
            console.log(this.response);
        }

    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        console.log("Com ERRRRR");
    }
    //Step 4.1 Define how to receive info from firebase

    //Step 5. Send request. 
    request.send();
};


//var updateAjax = function(id) {
//    //Step 1. Create request object
//    var request = new XMLHttpRequest();
//    //Step 2. Create the "envelope" aka request.open
//    request.open("PUT", url + id + ".json", true);
//    //Setp 3. Define what happens when request comes back aka request.onLoad
//    request.onload = function () {
//        if (this.status >= 200 && this.status < 400) {
//            //This means good things are happening
//            alert(this.response);
//        }
//        else {
//            //This means the data got to the server and failed
//            console.log(this.response);
//        }
//    };
//    //Step 4. Define what happens when there is an error on request aka request.onerror
//    request.onerror = function () {
//        //This is a "timeout request", which means the response was not received. 
//        console.log("Com ERRRRRR");
//    };
//    //Step 4.1 Define info to send to firebase
//    var firstName = document.getElementById("firstName").value;
//    var lastName = document.getElementById("lastName").value;
//    var name = {
//        first: firstName,
//        last: lastName
//    };
//    console.log("This is unstringified: " + name);
//    name = JSON.stringify(name);
//    console.log("This is stringified: " + name);
//    document.getElementById("firstName").value = "";
//    document.getElementById("lastName").value = "";
//    //var name = {
//    //    firstName: "Jacqueline",
//    //    lastName: "Sloves"
//    //};
//    //console.log("This is unstringified: " + name);
//    //name = JSON.stringify(name);
//    //console.log("This is stringified: " + name);
//    //Step 5. Send request. 
//    request.send(name);
//};

var deleteAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + id + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            alert("You successfully deleted a name.");
        } else {
            console.log('Ooops.')
        }
    };
    request.onerror = function () {
        alert("Communication error.")
    };
    request.send()
}