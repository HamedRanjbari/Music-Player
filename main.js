let $ = document
let defaultMusic = 0
let covers = $.getElementById("cover")
let title = $.getElementById("title")
let artist = $.getElementById("artist")
let currentTime = $.getElementById("currentTime")
let duration = $.getElementById("duration")
let progress = $.getElementById("progress")
let progressContainer = $.getElementById("progressContainer")
let prev = $.getElementById("prev")
let play = $.getElementById("play")
let next = $.getElementById("next")
let background = $.getElementById("background")
let musicId = $.getElementById("musicId")
let musicIdSrc = musicId.getAttribute("src")
let isPlaying = false
let songIndex = 0

let songs = [
    { name: "Candy Land", artist: "Nirvana", bgImage: "img/bg1.jpg", cover: "img/cover1.jpg", src: "Audio/CandylandNirvana.mp3" },
    
    { name: "Crab Rave", artist: "Noise Storm", bgImage: "img/bg2.jpg", cover: "img/cover2.jpg", src: "Audio/NoisestormCrabRave.mp3" },
    
    { name: "Walking Odin", artist: "Stephen", bgImage: "img/bg3.jpg", cover: "img/cover3.jpg", src: "Audio/StephenWalkingOdin'sGhost.mp3" },
        
  { name: "Shadows", artist: "Aero Chord", bgImage: "img/bg4.jpg", cover: "img/cover4.jpg", src: "Audio/ShadowsByAeroChord.mp3" },
    
  { name: "In Cold Blood", artist: "Titanfall", bgImage: "img/bg5.jpg", cover: "img/cover5.jpg", src: "Audio/cold.mp3" },
    
    {name: "Mary Jane", artist: "K.A.A.N", bgImage: "img/bg6.jpg", cover: "img/cover6.jpg", src:"Audio/mary.mp3"},
]

function playMusic() {
    isPlaying = true
    play.classList.replace("bi-play", "bi-pause")
    musicId.play()
}
function pauseMusic() {
    isPlaying = false
    play.classList.replace("bi-pause", "bi-play")
    musicId.pause()
}

play.addEventListener("click", function () {
    if (isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
})

function loadMusic(song) {
  console.log(song);
  title.innerHTML = song.name;
  artist.innerHTML = song.artist;
  musicId.src = song.src;
    changeCover(song.cover);
    changeBg(song.bgImage)
}

function changeCover(cover) {
  covers.classList.remove("active")
  setTimeout(() => {
    covers.src = cover
    covers.classList.add("active")
  }, 100);
  background.src = cover
}
function changeBg(BG) {
  background.classList.remove("active")
  setTimeout(() => {
    background.src = BG
    background.classList.add("active")
  }, 100);
  background.src = BG
}


// Previous Song function
function prevMusic() {
  songIndex--;
  if (songIndex === -1) {
    songIndex = songs.length - 1;
  }
  loadMusic(songs[songIndex]);
  playMusic();
}

// Next Song function
function nextMusic() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadMusic(songs[songIndex]);
  playMusic();
}
// On Load - Select First Song
loadMusic(songs[songIndex]);


// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    musicTime = e.srcElement.duration;
    ActiveMusicTime = e.srcElement.currentTime;
      let progressPercent = (ActiveMusicTime / musicTime) * 100;
    progress.style.width = progressPercent + "%";
    let durationMinutes = Math.floor(musicTime / 60);
    let durationSeconds = Math.floor(musicTime % 60);
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    if (durationSeconds) {
        duration.innerHTML = durationMinutes + ":" + durationSeconds;
    }
    let currentMinutes = Math.floor(ActiveMusicTime / 60);
    let currentSeconds = Math.floor(ActiveMusicTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
  }
}
function setProgressBar(e) {
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = musicId.duration;
  musicId.currentTime = (clickX / width) * duration
}
prev.addEventListener("click", prevMusic);
next.addEventListener("click", nextMusic);
musicId.addEventListener("ended", nextMusic);
musicId.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
