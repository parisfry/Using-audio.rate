let audio;
let steps = 100; 
let baseRadius = 100;
let isPlaying = false; //use this to track if the audio is playing

function preload(){
  audio = loadSound('audio.mp3');
}
 
function setup() {
 createCanvas(400, 400);
 background(0);
 noFill();

//create a play and pause buttons as well as three buttons for different tempos 

 let playButton = createButton ('play audio');
 playButton.position (20,20);
 playButton.mousePressed (playAudio);

 let pauseButton = createButton ('Pause audio');
  pauseButton.position(100,20);
  pauseButton.mousePressed(pauseAudio);

  let slowtempoButton = createButton ('x0.5');
  slowtempoButton.position(100,60);
  slowtempoButton.mousePressed(setSlowTempo);

  let normaltempoButton = createButton ('x1');
  normaltempoButton.position(150,60);
  normaltempoButton.mousePressed(setNormalTempo);

  let fasttempoButton = createButton ('x2');
  fasttempoButton.position(200,60);
  fasttempoButton.mousePressed(setFastTempo);

}
//checks if the audio is playing, if its not then it starts playing
function playAudio(){
  if (isPlaying == false){

  audio.setVolume(1);
audio.play()
isPlaying = true;
console.log('sound playing');
  }
}
//pauses the audio if playing 
function pauseAudio(){
  if (isPlaying){
  audio.pause();
  isPlaying = false;
  console.log('sound paused');
  }
}

//use different playback speeds as different tempos (0.5,1,2)

function setSlowTempo(){
  if(isPlaying){
  audio.rate(0.5);
  }
}

function setNormalTempo(){
  if(isPlaying){
  audio.rate(1);
}
}

  function setFastTempo(){
    if(isPlaying){
    audio.rate(2);
  }
}
 
function draw() {

  let tempo = audio.rate();
  let radius = baseRadius * tempo; //use the tempo as a variable to change the base radius
  let noiseAmplitude = map(tempo, 0.5, 2, 5, 50); //use tempo as a variable to change the noise amplitude

text('Tempo = ', 20,75);
textSize(20);

 background(0, 30);
 translate(width / 2, height / 2); 
 stroke(255, 150);
 
 beginShape();
 for (let i = 0; i <= steps; i++) {
   let angle = TWO_PI * i / steps;
   let x = radius * cos(angle);
   let y = radius * sin(angle);
 
//by using tempo as a value here it means that the circle appears to wobble and respond to the beat of the audio
   x += map(noise(x * 0.01 * tempo, y * 0.01 * tempo, frameCount * 0.1), 0, 1, -noiseAmplitude, noiseAmplitude);
   y += map(noise(x * 0.01, y * 0.01, frameCount * 0.1), 0, 1, -noiseAmplitude, noiseAmplitude);
 
   vertex(x, y);
 }
 endShape(CLOSE);
 
}