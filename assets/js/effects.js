
const GenerateMove = async (move,is_enemy,isRandom) =>{

   var total_delay = 0;
   var enemy_class_animation = is_enemy ? move.class_animation + "_enemy" : "";

   GenerateElementsLoop(`${move.class_animation} move_ef`,enemy_class_animation,move.audio,move.image,move.effects,move.milliseconds,move.playOnce,isRandom);

   await delay(move.milliseconds * move.effects + 500);

   total_delay += move.milliseconds * move.effects + 500
   var character = null;

   if(is_enemy){
     character = "player_character";
   }else{
     character = "enemy_character";
   }

   var character_element = document.querySelector("."+character);

   character_element.classList.add("hurt");

   await delay(1000);

   total_delay += 1000;
   character_element.classList.remove("hurt");

   return total_delay;

}

const CreateSoundElement = (sound) => {

  var audio = document.createElement("audio");
  var source = document.createElement("source");

  source.setAttribute("type","audio/wav");
  source.setAttribute("src",sound);

  audio.append(source);
  if(sound_effects_active){
    audio.play();
  }
  document.body.append(audio);

}

const GenerateElementsLoop = async (className,enemy_animation,audio,src,limit,ms,playOnce,isRandom) => {

  var milliseconds = 0;

  for (let i =0; i<=limit;i++){

      milliseconds += ms;

      const element = document.createElement("div");

      if(playOnce && i <= 1){

        CreateSoundElement(audio)

      }else if(!playOnce){

        CreateSoundElement(audio)

      }

      var container = document.querySelector(".effect_box");

      if(isRandom){

          var size = Math.floor(Math.random() * 30) +5;
          var delay_time = Math.floor(Math.random() * 50);

          element.innerHTML =`<img style = "transform:rotate(${Math.floor(Math.random() * 360)}deg);height:${size.toString()}%;width:${size.toString()}%" class="${className} ${enemy_animation}" src ="${src}"/>`
          container.append(element);

          await delay(delay_time);

      }else{

        element.innerHTML =`<img class="${className} ${enemy_animation}" src ="${src}"/>`
        container.append(element);

        await delay(ms);
    }

  }

}
