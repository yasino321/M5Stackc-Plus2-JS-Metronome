// Prev: -1 BPM | Next: +1 BPM | Esc/Power: exit

const display  = require("display");
const keyboard = require("keyboard");
const audio    = require("audio");

var bpm = 60;
var interval = 60000 / bpm;
var tone_frequency = 800;
var tone_duration = 20;
var min_bpm = 40;
var max_bpm = 240;
var running = true;

// Display
display.setTextSize(5);
var white = display.color(255, 255, 255);
var black = display.color(0, 0, 0);
display.setTextColor(white);
display.setTextAlign("center", "middle");
var width = display.width();
var height = display.height();

function updateDisplay() {
  display.fill(black);
  display.drawText(bpm.toString(), width / 2, height / 2);
}

updateDisplay();

var next_beat = now() + interval;

while (running) {
  var current_time = now();
  
  if (current_time >= next_beat) {
    audio.tone(tone_frequency, tone_duration, true);
    
    // Optional flash 
    display.fill(display.color(80, 80, 0)); 
    display.drawText(bpm.toString(), width / 2, height / 2);
    delay(40); 
    updateDisplay();
    
    next_beat += interval;
  }
  
  if (keyboard.getPrevPress(false)) {
    bpm = Math.max(min_bpm, bpm - 1);
    interval = 60000 / bpm;
    updateDisplay();
    delay(200);
  }
  if (keyboard.getNextPress(false)) {
    bpm = Math.min(max_bpm, bpm + 1);
    interval = 60000 / bpm;
    updateDisplay();
    delay(200);
  }
  if (keyboard.getEscPress(false)) {
    running = false;
  }
  
  delay(20);
}

display.fill(black);
display.setTextSize(3);
display.drawText("Exited", width / 2, height / 2);
