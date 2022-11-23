/* selectors */
"use strict";
const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#music");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const cover = document.querySelector("#cover");
const title = document.querySelector("#title");
// Song  title
const songs = ["Ana wala", "Anam anam", "Sevmaysan meni"];
let songIndex = 0;
// Load  song details
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `musics/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Event listner
// play
playBtn.addEventListener("click", () =>{
 const isPlaying  =musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  }
  else{
    playSong();
  }
});

// play song function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();

}
// pause song function
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();

}

// Change song
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click", nextSong);
function prevSong() {
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length-1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// next song function
function nextSong() {
  songIndex++;
  if (songIndex >songs.length - 1) {
    songIndex = 0;
  } loadSong(songs[songIndex]);
  playSong();


}
// Time song update
audio.addEventListener("timeupdate",updateProgress);
function updateProgress(e) {
  const {duration,currentTime} =e.srcElement;
  const progressPercent =(currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;

}

// Click on progress bar
progressContainer.addEventListener("click",setProgress);
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX/width)*duration;
}