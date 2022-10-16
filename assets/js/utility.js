var player_iterator = null;
var enemy_iterator = null;
const audioSource = "./assets/audio/gameMusic.wav";
const audioExtension = audioSource.substring(audioSource.indexOf('c.') + 2);

const CapitalizeFirstLetter =(string)=> {

    const new_string = string.split(" ");

    var word = ''
    for (let i = 0; i < new_string.length; i++) {
        new_string[i] = new_string[i][0].toUpperCase() + new_string[i].substr(1);
        word += " " +new_string[i]
      }
    return word;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const PlayerSelectedSpecialEffect = async (is_player,src) => {

  var container_class = is_player ? "player_effects" : "enemy_effects";

  var container = document.querySelector("."+container_class);

  var limit = 400;

  for (let i =0; i <= 100; i++){

    var duration = Math.random() * 2;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    var random = plusOrMinus *(Math.random() * 150);
    var size = Math.floor(Math.random() * 100);



    var effect = document.createElement("img");
    effect.setAttribute("src",src);
    var animation_class = "selected_box_animation";


    effect.classList.add(animation_class);
    effect.style.animationDuration = duration.toString() + "s";
    effect.style.left = random.toString() +"px";
    effect.style.width = size.toString() +'px';
    effect.style.height = size.toString() +'px';
    console.log(effect);
    container.append(effect);

  }

}



const PlayerSelectedSpecialEffectSingle = async (animationClass,className,is_player,src) => {

  container = document.querySelector("."+className);
  container.style.position = "relative";
  container.style.zIndex =4;

  // var limit = 400;
  var duration = Math.random() * 2;
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

  var random = Math.random() *95;
  // var multiplier = Math.random() * 100 > 50 ? 1 : -1;
  // random *= multiplier;

  var size = Math.floor(Math.random() * 50);



  var element_name = src ? "img" : "div";
  var effect = document.createElement(element_name);
  if(element_name == "img"){
    effect.setAttribute("src",src);
  }
  var animation_class = animationClass;


  effect.classList.add(animation_class);
  effect.style.animationDuration = "1s";
  effect.style.left = random.toString() +"%";
  // effect.style.width = size.toString() +'px';
  // effect.style.height = size.toString() +'px';

  container.append(effect);



}





const SaveCharacters = (player,enemy) =>{

  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('enemy', JSON.stringify(enemy));

}


const EmptyContainer = (element) =>{

       var child = element.lastElementChild;

       while (child) {
           element.removeChild(child);
           child = element.lastElementChild;
       }

   }

const RemoveClassFromElements = (target_class,class_name) =>{

    var target = document.getElementsByClassName(target_class);

      for (var i = 0; i < target.length; ++i) {

         var item = target[i];
         item.classList.remove(class_name);

      }

  }

function randomRotation(limit,rotation){

  var arr = [];
  var random_rotation_value = Math.floor(Math.random() * rotation);

  for(var i = 0; i < limit; i++){
    random_rotation_value = (-1 * Math.floor(Math.random() * rotation));
    arr.push(random_rotation_value)
  }

  return arr;

}

const SpriteDelay = (i,element,limit,folder,sprite_name,speed) =>{

 setTimeout(()=>{
    element.setAttribute("src",`${folder}${sprite_name}_${i}.png`);

  },speed);

}

const AnimateCharacter = async(element,is_enemy,sheet,ms) =>{

  if(!is_enemy){

    clearInterval(player_iterator);
    player_iterator = await SpriteAnimator(element,sheet,ms);

  }else{

    clearInterval(enemy_iterator);
    enemy_iterator = await SpriteAnimator(element,sheet,ms);

  }

}

const SpriteAnimator = async (element,sheet,ms,total_ms,display) => {

    var ms_passed = 0;

    var k = 1;
    ms_passed += ms;

    var animation_iterator = setInterval(()=>{
      if(k >= sheet.animation_sheet.length - 1){
          k = 1;
      }
      k++;
      element.setAttribute("src",`${sheet.animation_sheet[k]}`);
    },ms);

    return animation_iterator

}

const  AddClassToElement =(element,class_added)=>{
    element.classList.add(class_added);
 }
