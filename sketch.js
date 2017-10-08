

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData;
var xPos = 0;   // x position of the graph
var myMessage = "";  
                 

function setup() {
 createCanvas(1500, 700);
 background(0x08, 0x16, 0x40);
 frameRate(10);

 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);     // callback for when new data arrives
 
 var options = { baudrate: 9600}; // change the data rate to whatever you wish
 serial.open(portName, options);
}

function draw() {
  background(50);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  for (var i = 0; i < seaRoseLines.length; i++) {
    var words = seaRoseLines[i].split(" ");
    var currentOffset = 0;
    for (var j = 0; j < words.length; j++) {
      var wordWidth = textWidth(words[j]);
      fill(128+(i*10));
      rect(25+currentOffset, 25+i*20,
        wordWidth, 16);
      if (mouseIsPressed) {
        fill(0);
        text(words[j], 25+currentOffset, 25+i*20);
      }
      // four pixels between words
      currentOffset += wordWidth + 4; 
    }
  }
}

function draw() {
  //graphData(inData);
  background(51);
  fill(90);
  noStroke();
  textSize(12 + (mouseX / width)*150);
  textAlign(CENTER, CENTER);
  text(myMessage, width/2, 350);

  
}


//function graphData(newData) {
  // map the range of the input to the window height:
  //var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  //stroke(0xA8, 0xD9, 0xA7);
  //line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  //if (xPos >= width) {
    //xPos = 0;
    // clear the screen by resetting the background:
    //background(0x08, 0x16, 0x40);
  //} else {
    // increment the horizontal position for the next reading:
  //  xPos++;
  //}
  //fill(255, 0, 0);
  //stroke(255,0,0);
  //text(myMessage, width/2, 200);
//}

function stringFromArray(data)
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    
    return str;
  }


function serialEvent() {
  // retreive value from serial port
  inData = serial.readStringUntil('\n');
  var x = "";
  x = x + inData;
  //inData = serial.read();


  //if (inData == 7) {
  myMessage = x;
  //} 
  console.log(inData);
  }





// print list of ports for debugging
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
  print(i + " " + portList[i]);
   }
}
