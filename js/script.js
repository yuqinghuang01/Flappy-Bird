// -------------- Flappy Bird JS --------------
document.getElementById("defaultOpen").click();

// draw images to the canvas continuously
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var change = document.getElementById("toggle");
var hide = document.getElementById("contact");
var pn = document.getElementById("name").value;

// load images and audios
var bird = new Image();
var gbird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var zero = new Image();
var one = new Image();
var two = new Image();
var three = new Image();
var four = new Image();
var five = new Image();
var six = new Image();
var seven = new Image();
var eight = new Image();
var nine = new Image();
var gameover = new Image();

function ybird() {
    bird.src = "images/bird.png";
}

function rbird() {
    bird.src = "images/rbird.png";
}

function bbird() {
    bird.src = "images/bbird.png";
}

bird.src = "images/bird.png";
gbird.src = "images/gbird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
zero.src = "images/zero.png";
one.src = "images/one.png";
two.src = "images/two.png";
three.src = "images/three.png";
four.src = "images/four.png";
five.src = "images/five.png";
six.src = "images/six.png";
seven.src = "images/seven.png";
eight.src = "images/eight.png";
nine.src = "images/nine.png";
gameover.src = "images/gameover.png";

var fly = new Audio();
var scor = new Audio();
var smash = new Audio();
var die = new Audio();

fly.src = "audio/fly.mp3";
scor.src = "audio/score.mp3";
smash.src = "audio/smash.mp3";
die.src = "audio/die.mp3";

// define variables
var gap = 90;
var pS;
var gravity = 1.2;

var bX = 10;
var bY = 180;

var score = 0;

var ratio;
var up;

var hidden = true;

// click to move up
function moveUp() {
    if (score <= 20) {
        up = 25;
    } else if (score <= 25) {
        up = 28;
    } else {
        up = 32;
    }
    bY -= up;
    fly.play();
}

function displayDigit(d, total, place) {
    var right;
    var between;
    if (total == 1) {
        right = 135;
        between = 0;
    } else if (total == 2) {
        right = 148;
        between = 30;
    } else if (total == 3) {
        right = 161;
        between = 30;
    } else if (total == 4) {
        right = 174;
        between = 30;
    }

    if (d == 0) {
        ctx.drawImage(zero, right - place * between, 100);
    } else if (d == 1) {
        ctx.drawImage(one, right - place * between, 100);
    } else if (d == 2) {
        ctx.drawImage(two, right - place * between, 100);
    } else if (d == 3) {
        ctx.drawImage(three, right - place * between, 100);
    } else if (d == 4) {
        ctx.drawImage(four, right - place * between, 100);
    } else if (d == 5) {
        ctx.drawImage(five, right - place * between, 100);
    } else if (d == 6) {
        ctx.drawImage(six, right - place * between, 100);
    } else if (d == 7) {
        ctx.drawImage(seven, right - place * between, 100);
    } else if (d == 8) {
        ctx.drawImage(eight, right - place * between, 100);
    } else if (d == 9) {
        ctx.drawImage(nine, right - place * between, 100);
    }
}

// pipe array
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// draw function
function draw() {
    var exit = true;

    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        pS = pipeNorth.height + gap;

        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + pS);

        pipe[i].x--;

        if (pipe[i].x == 100) {
            if (score <= 10) {
                ratio = 0.7;

                pipe.push({
                    x: cvs.width,
                    y: - Math.floor(Math.random() * pipeNorth.height * ratio)
                });
            } else if (score <= 20) {
                ratio = 0.8;
                
                pipe.push({
                    x: cvs.width,
                    y: - Math.floor(Math.random() * pipeNorth.height * ratio)
                });
            } else if (score <= 25) {
                ratio = 0.9;
                
                pipe.push({
                    x: cvs.width,
                    y: - Math.floor(Math.random() * pipeNorth.height * ratio)
                });
            } else {
                pipe.push({
                    x: cvs.width,
                    y: - Math.floor(Math.random() * pipeNorth.height)
                });
            }
        }

        // when collision occurs

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + pS)) {
            cvs.removeEventListener("click", moveUp);
            exit = false;
            smash.play();
            over();
            change.innerHTML = "Retry";
            change.style.visibility = "visible";
            hidden = false;
        }

        if (bY + bird.height >= cvs.height - fg.height) {
            cvs.removeEventListener("click", moveUp);
            exit = false;
            die.play();
            over();
            change.innerHTML = "Retry";
            change.style.visibility = "visible";
            hidden = false;
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    var curscore = score;
    var digits = [];

    if (curscore == 0) {
        displayDigit(0, 1, 0)
    } else {
        while (curscore != 0) {
            digits.push(curscore % 10);
            curscore = Math.floor(curscore / 10);
        }
    }

    var l = digits.length;
    for (i = 0; i < digits.length; i++) {
        displayDigit(digits[i], l, i);
    }

    if (exit) {
        requestAnimationFrame(draw);
    }
}

// start game function
function setting() {
    if (hidden) {
        hide.style.visibility = "hidden";
    } else {
        hide.style.visibility = "visible";
    }

    pS = pipeNorth.height + gap;

    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(pipeNorth, 200, 0);
    ctx.drawImage(pipeSouth, 200, pS);
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    requestAnimationFrame(setting);
}

setting();

function start() {
    if (change.innerHTML == "Start") {
        draw();
        cvs.addEventListener("click", moveUp);
        change.style.visibility = "hidden";
    } else {
        location.reload();
    }
}

function over() {
    ctx.drawImage(gameover, 50, 170);
    requestAnimationFrame(over);
}

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function record() {
    var tableBody = document.getElementById("table-body");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");    
    var row = document.createElement("tr");
    
    td1.innerHTML = document.getElementById("Ranking").value;
    td2.innerHTML  = document.getElementById("Player Name").value;
    td3.innerHTML  = document.getElementById("Score").value;
    
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    
    tableBody.appendChild(row);
}

$(function() {
  
    // contact form animations
    $('#contact').click(function() {
      $('#contactForm').fadeToggle();
    })
    $(document).mouseup(function (e) {
      var container = $("#contactForm");
  
      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.fadeOut();
      }
    });
});

window.onload= init;

// The contact manager as a global variable
let cm; 

function init() { 
	// create an instance of the contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	  // Display contacts in a table
      // Pass the id of the HTML element that will contain the table
      cm.sort();
	  loadList();
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
	let newContact = new Contact(name.value, score);
	cm.add(newContact);
	
	// Empty the input fields
	name.value = "";
	
    // refresh the html table
    cm.save();
    cm.sort();
	loadList();
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactsAsATable("contacts");
}


class Contact {
	constructor(name, score) {
		this.name = name;
		this.score = score;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}
	
	addTestData() {
		var c1 = new Contact("Sunny", "80");
		
		this.add(c1);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
	
	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}
	
	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfContacts.sort(ContactManager.compareByScore);
	}
	
	// class method for comparing two contacts by name
	static compareByScore(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
        // in alphabetical order
        var int1 = parseInt(c1.score);
        var int2 = parseInt(c2.score);
		if (int1 < int2)
     		return 1;
		
    	if (int1 > int2)
     		return -1;
  
    	return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	} 
	
  	displayContactsAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfContacts.length === 0) {
			container.innerHTML = "<p>No contacts to display!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
    	var table = document.createElement("table");
          
    	// iterate on the array of users
    	this.listOfContacts.forEach(function(currentContact) {
        	// creates a row
        	var row = table.insertRow();
        
			row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.score + "</td>"
     	});
  
     	// adds the table to the div
     	container.appendChild(table);
  	}
}