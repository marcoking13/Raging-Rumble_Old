var hasPlayed = false;

var music_active = false;


var sound_effects_active = false;

const CreateAudioSound = (sound,type) => {

  var audio = document.createElement("audio");
  var source = document.createElement("source");

  source.setAttribute("type",`audio/wav`);
  source.setAttribute("src",sound);

  audio.append(source);

  document.body.append(audio);

}

const StopOrPlayAudio = (audio,play) =>{

  if(play){

    audio.play();

  }else{

    audio.pause();

  }

}

var audio_button = document.querySelector(".audio_icon");

audio_button.addEventListener("click",(e)=>{

  var audioSource = document.querySelector(".game_music");

  if(!music_active){

    e.target.classList.remove("inactive");
    e.target.classList.add("active");
    music_active = true;
    sound_effects_active = true;

  }else{

    e.target.classList.remove("active");
    e.target.classList.add("inactive");
    music_active = false;
    sound_effects_active = false;

  }

  StopOrPlayAudio(audioSource,music_active);

});

StopOrPlayAudio(document.querySelector(".game_music"),music_active)
