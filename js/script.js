/* 
Web Scrambling Word Processor
Coded by: Johnny Dunn

Description:
This script generates the text editor in the HTML / CSS files. There are basic formatting options, such as 
changing the page from single-space to double-space format and a few options for the font. Click the "start"
button to scramble all the text currently written on the page, and click "visible" to see it normally again. 

Credit to user Tayacan on dreamincode.net for providing a  
framework for a  basic text editor.

Credit to this stackoverflow thread for help with the scrambling algorithim:
http://stackoverflow.com/questions/14945371/using-loops-to-create-a-word-scrambler.
*/

var fullTextArea = [];			//	The full text that the user has been writing
var scrambledTextArea = [];
var doubleSpacedOn = false;		//	Double-spacing?
var scrambleTextOn = false;		//	Does the user want the text on the page to be scrambled?
var textArea;					//	The text that the user is currently inputting 

var scrambledString = "";

var charLength = 0;				
var charLengthCount = 0;
var fullTextAreaLength;			//	How much text has been written already?
var printThis;					//	Print the last inputted text from the user on the page
var printThisScrambled;			//	Adding the final touches to the super long string to be printed
var scrambled = "";				//	The final scrambled string that will be printed in place of the normal text


function textInput() {
    // var textWriter = document.getElementById('myText');
    // var textSubmitted = document.getElementById('textWritten').innerHTML;
    // var y = document.getElementById("newText").maxLength;
    // document.getElementById("textWritten").innerHTML = y;
   	// var text = textWriter.value;

   	textArea = document.getElementById('myText');
   	var text = textArea.value;

   		//	This code below is for the font interface (Bold, italicized, underlined). Not working right now. 
  		//  Make sure html and php tags are unusable by disabling < and >.
			// text = text.replace(/\</gi, "<");
			// text = text.replace(/\>/gi, ">");
			
			// // Exchange newlines for <br />
			// text = text.replace(/\n/gi, "<br />");
			
			// // Basic BBCodes.
			// text = text.replace(/\[b\]/gi, "<b>");
			// text = text.replace(/\[\/b\]/gi, "</b>");
			
			// text = text.replace(/\[i\]/gi, "<i>");
			// text = text.replace(/\[\/i\]/gi, "</i>");
			
			// text = text.replace(/\[u\]/gi, "<u>");
			// text = text.replace(/\[\/u\]/gi, "</u>");
			
   	document.getElementById('myText').value = '';	   	//	Resets the entry box.

   	fullTextArea.push(text);				//	Add text to the array
   	scrambledTextArea.push(text);
   	if (!scrambleTextOn) {
   		// document.getElementById('textScrambled').innerHTML = "";		//	Clear the scrambled text
   		document.getElementById('textWritten').innerHTML = addText();
   	} else {		
   		// document.getElementById('textWritten').innerHTML = "";			//	Clear the normal text 
   		document.getElementById('textScrambled').innerHTML = scrambler();	
   	}
}


function handleKeyPress(e){				//	Did the user hit enter / return?
	var key=e.keyCode || e.which;
  	if (key==13){
    	//scrambler();
    	textInput();						//	If so, send the current message the user is typing
     	return false;
   }
}

		
function handleKeyDown(e){				//	Did the user hit the control button?
	if (e.ctrlKey && scrambleTextOn == true) {
    	unscrambleText();					//	If so, scramble or unscramble the text
   	} else if (e.ctrlKey && scrambleTextOn == false) {
    	scrambleText();
   }
}


function doubleSpaceOn () {
	doubleSpacedOn = true;
	textInput();						//	Prints out the text again as double-spaced
}

function singleSpaceOn () {				//	Prints out the text again as single-spaced
	doubleSpacedOn = false;
	textInput();
}


function addText () {					//	Add the user's current message to the rest of the text on the screen
	printThis = "";
	fullTextAreaLength = fullTextArea.length;
	for (var i=0; i<fullTextAreaLength; i++) {
		if (!doubleSpacedOn) {
			printThis += "<br>" + fullTextArea[i];	
		} else {
			printThis += "<br>" + "<br>" + fullTextArea[i];		//	Two line breaks for double-spacing
		}
	}
	charLengthCount = charLength + charLengthCount;
	return printThis; // <-- to be printed to the div
	return charLengthCount;
}

	
function clearText () {											//	Clears the current message user is typing
	document.getElementById('myText').value = "";	
}


//	Functions to align the text on the screen
function centerTextAlign () {
	document.getElementById("textWritten").style.textAlign = "center";
	document.getElementById("textScrambled").style.textAlign = "center";
}


function leftTextAlign () {
	document.getElementById("textWritten").style.textAlign = "left";
	document.getElementById("textScrambled").style.textAlign = "left";
}


function rightTextAlign () {
	document.getElementById("textWritten").style.textAlign = "right";
	document.getElementById("textScrambled").style.textAlign = "right";
}


function scrambler () {						//	Scrambles all the text on the page except for what the uesr is
	printThisScrambled = printThis;			//	currently typing
	// console.log(printThisScrambled);
	
	// scrambledTextAreaLength = scrambledTextArea.length;
	// console.log(fullTextArea);
	// console.log(scrambledTextArea);
	// console.log(printThis);
	var printThisScrambledLength = printThisScrambled.length;
	for (var i=0; i<printThisScrambledLength; i++) {
		 // whatsThisTextScrambled = scrambledTextArea.toString();
		 var charIndex = Math.floor(Math.random() * printThisScrambledLength);
		 //console.log(whatsThisTextScrambled.length)
	 	    //var textToBeScrambled = whatsThisText;
         	scrambled += printThisScrambled.charAt(charIndex);
         	// console.log(scrambled);
         	printThisScrambled =  printThisScrambled.substr(0, charIndex) + printThisScrambled.substr(charIndex + 1);
         }
              // console.log(printThisScrambled);
			if (!doubleSpacedOn) {
				scrambled = String(scrambled);
				scrambled +=  "<br>" + scrambled;
				} else {
				scrambled = String(scrambled);
				scrambled += "<br>" + "<br>" + scrambled;
				}
		     return scrambled;
}



function eraseAll () {					//	Clears all the text from the page
	printThisScrambled = "";
	printThis = "";
	document.getElementById('textScrambled').innerHTML = "";
	document.getElementById('textWritten').innerHTML = "";
	return printThisScrambled;
	return printThis;
}


function scrambleText () {				//	Turn on text scrambling feature
	scrambleTextOn = true;     	
	document.getElementById("textWritten").style.display="none";
	document.getElementById("textScrambled").style.display="block";
	textInput();
}


function unscrambleText () {			//	Turn off text scrambling
	scrambleTextOn = false;
	document.getElementById("textScrambled").style.display="none";
	document.getElementById("textWritten").style.display="block";
	textInput();
}


function mod_selection (val1,val2) {	//	The code for getting the font interface to work, but it doesn't right now..
	var textArea = document.getElementById('myText');
	// Do we even have a selection?
	if (typeof(textArea.selectionstart) != "undefined") {
		// Split the text in three pieces - the selection, and what comes before and after.
		var begin = textArea.value.substr(0, textArea.selectionstart);
		var selection = textArea.value.substr(textArea.selectionstart, textArea.selectionend - textArea.selectionstart);
		var end = textArea.value.substr(textArea.selectionend);
		// Insert the tags between the three pieces of text.
		textArea.value = begin + val1 + selection + val2 + end;
	}
}
