/* 
Web Scrambling Word Processor
Coded by: Johnny Dunn

Description:
This script generates the text editor in the HTML / CSS files. There are basic formatting options, such as 
changing the page from single-space to double-space format and a few options for the font. Click the "start"
button to scramble all the text currently written on the page, and click "visible" to see it normally again. 

Credit to user Tayacan on dreamincode.net for providing a framework for a basic text editor.

Credit to this stackoverflow thread for help with the scrambling algorithim:
http://stackoverflow.com/questions/14945371/using-loops-to-create-a-word-scrambler.

Credit to Daniel Shiffman for the code for the oscillating shapes from The Nature of Code

Also uses a caesar cipher library provided from: http://timseverien.com/articles/153-substitution-ciphering-in-javascript/.
*/

"use strict";

var textArea;					//	The text that the user is currently inputting 
var fullTextArea = [];			//	The full text that the user has been writing gets pushed here
var scrambledTextArea = [];		//	The scrambling cannot be unscrambled, so it's assigned to duplicate values
var scrambleTextOn = false;		//	Does the user want the text on the page to be scrambled?
var doubleSpacedOn = false;		//	Double-spacing on?

var charLength = 0;				
var charLengthCount = 0;
var fullTextAreaLength;			//	How much text has been written already?
var printThis;					//	Print the last inputted text from the user on the page
var printThisScrambled;			//	Adding the final touches to the super long string to be printed
var scrambled = "";				//	The final scrambled string that will be printed in place of the normal text
var scrambledSplit = "";
var scrambledString = "";

var keyCipher = "";				//	Caesear cipher key; can be any combination / length
var cipherEntered = false;

var encryptedTextOn = false;
var decryptedTextOn = false;

var cipheredText = "";		
var decipheredText = "";
// var cipheredTextSplit = "";
var textAlreadyEncrypted = false;		//Is the user decoding a previously encrypted message?

var oscillators = [];
var collider;


function textInput() {
	//Creates canvas on screen for P5.js animation

   	textArea = document.getElementById('myText');
   	var text = textArea.value;

   	//	This code below is for the font interface (Bold, italicized, underlined). Not working right now. 
  	//  Make sure html and php tags are unusable by disabling < and >.
		// text = text.replace(/\</gi, "<");
		// text = text.replace(/\>/gi, ">");
		
		// // Exchange newlines for <br />
		// text = text.replace(/\n/gi, "<br />");
		
		// Basic BBCodes.
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
   		document.getElementById('textWritten').innerHTML = addText();
   	} else {		
   		scrambler();	
   		// formatScrambling();
   		// console.log(scrambledSplit);
   		document.getElementById('textScrambled').innerHTML = formatScrambling();
   	}
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


//	What's the best way to do this..
function savePDF () {
}


//	Functions for some UI
function handleKeyPress(e){				//	Did the user hit enter / return?
	var key=e.keyCode || e.which;
  	if (key==13){
    	scrollDown();
    	textInput();						//	If so, send the current message the user is typing
     	return false;
   }
}
		
function handleKeyDown(e){				//	Did the user hit the control button?
	if (e.ctrlKey && scrambleTextOn == true) {
    	unscrambleText();					//	If so, scramble or unscramble the text
    	scrollDown();
    	return false;
   	} else if (e.ctrlKey && scrambleTextOn == false) {
    	scrambleText();
    	scrollDown();
    	return false;
   }
}

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

function scrollDown () {			//	Constantly scrolls down the text window with user input
	var textArea = document.getElementById('textWritten');
	var scrambledTextArea = document.getElementById('textScrambled');
	textArea.scrollTop = textArea.scrollHeight;
	scrambledTextArea.scrollTop = scrambledTextArea.scrollHeight;
	return true;
}

function eraseAll () {					//	Clears all the text from the page
	printThisScrambled = "";
	printThis = "";
	document.getElementById('textScrambled').innerHTML = "";
	document.getElementById('textWritten').innerHTML = "";
	return printThisScrambled;
	return printThis;
}

function clearText () {											//	Clears the current message user is typing
	document.getElementById('myText').value = "";	
}

function doubleSpaceOn () {
	doubleSpacedOn = true;
	textInput();						//	Prints out the text again as double-spaced
}

function singleSpaceOn () {				//	Prints out the text again as single-spaced
	doubleSpacedOn = false;
	textInput();
}


//	SCRAMBLER
function scrambler () {						//	Scrambles all the text on the page except for what the uesr is
	printThisScrambled = printThis;			//	currently typing
	var printThisScrambledLength = printThisScrambled.length;
	for (var i=0; i<printThisScrambledLength; i++) {
		 // whatsThisTextScrambled = scrambledTextArea.toString();
		 var charIndex = Math.floor(Math.random() * printThisScrambledLength/20);
		 //console.log(whatsThisTextScrambled.length)
	 	    //var textToBeScrambled = whatsThisText;
         	scrambled += printThisScrambled.charAt(charIndex);
         	// console.log(scrambled);
         	printThisScrambled =  printThisScrambled.substr(0, charIndex) + printThisScrambled.substr(charIndex + 1);
         }
              // console.log(printThisScrambled);
				scrambled = String(scrambled);
				// formatScrambling();
				//scrambled =  scrambled;
		     	// var splitBy = ['<', '>', '<>'];
		     	// var scrambledSplit = scrambled.split("<").join("\t");
		     	return scrambled;
}

function formatScrambling () {			//	Tabs some of the spliced, scrambled strings for cleaner formatting.
		var scrambledTextHTML = document.getElementById('textScrambled').innerHTML;
   		// console.log(scrambledTextHTML);	
   		var splitBy = ['<', '>', '<>'];
		scrambledSplit = scrambled.split(splitBy).join("\t\t\t\t\t\t\t\t\t\t\t");
		// console.log(scrambledSplit);
		return scrambledSplit; 
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


//CIPHER CODE
function doClick(){
    keyCipher = document.getElementById("firstkey").value;
    alert("You have entered the cipher: " + " "  +"'"+keyCipher+"'" + ".  " + "A few specific number-only ciphers do not work with the code, so please test the decryption first!");
    cipherEntered = true;
    return keyCipher;
}

function cipherOn () {
	if (!encryptedTextOn && !decryptedTextOn) {
		encryptedTextOn = true;
			if (encryptedTextOn = true) {
			printEncryption();
			console.log("YES");
							decryptedTextOn = false;

		}
			document.getElementById('textWritten').innerHTML = cipheredText;
	}
}

function cipherOff () {
	if (!decryptedTextOn && encryptedTextOn) {
			decryptedTextOn = true;
			console.log("yes");
			if (textAlreadyEncrypted) {
				printDecryption();
				encryptedTextOn = false;
			}
	}
	if (!decryptedTextOn && encryptedTextOn) {
		decryptedTextOn = true;
		if (decryptedTextOn) {
				printDecryption();
			
		}
	}
	document.getElementById('textWritten').innerHTML = decipheredText;
}


function printEncryption () {
	if (textAlreadyEncrypted = true) {
		printThis = String(printThis);
		cipheredText = Cipher.keyRotate(printThis, keyCipher);
		console.log("THISONE")
		return cipheredText;
	}
}

function printDecryption () {
	if (decryptedTextOn && textAlreadyEncrypted) {
		console.log("DECODER IS WORKING");
		var stringToDecode = document.getElementById('textWritten').innerHTML	;
		decipheredText = Cipher.keyRotate(String(stringToDecode), keyCipher, true);
		decryptedTextOn = false;
		return decipheredText;
	} 

	if (decryptedTextOn && encryptedTextOn) {
   		console.log("DECRYPTING");
		var stringToDecode = document.getElementById('textWritten').innerHTML;
		decipheredText = Cipher.keyRotate(stringToDecode, keyCipher, true);
		encryptedTextOn = false;
		return decipheredText;
	}
	if (!decryptedTextOn && encryptedTextOn) {
   		console.log("DECRYPTING");
		var stringToDecode = document.getElementById('textWritten').innerHTML;
		decipheredText = Cipher.keyRotate(stringToDecode, keyCipher, true);
		decryptedTextOn = false;
		textIsEncrypted = false;
		return decipheredText;
	}
}


function decodingSomeText () {
	var stringToDecode = document.getElementById('textWritten').innerHTML;
	decipheredText = Cipher.keyRotate(stringToDecode, keyCipher, true);
	document.getElementById('textWritten').innerHTML = decipheredText;
}

function formatCiphering () {		//	Tabs some of the spliced, scrambled strings for formatting.
		// var scrambledTextHTML = document.getElementById('textScrambled').innerHTML;
   		// console.log(scrambledTextHTML);	
   		var splitBy = ['>','<','?','.','='];
		cipheredTextSplit = cipheredText.split(splitBy).join("\n");
		console.log(scrambledSplit);
		return cipheredTextSplit; 
}

//	The code for getting the font interface to work, but it doesn't right now..
function mod_selection (val1,val2) {	
	textArea = document.getElementById('myText');
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
