const placeholder_image = `./assets/imgs/placeholder.png`;
const available_boxes = 6;
var ready = false;
var fight_starting = false;
const available_wizards = return_available_wizards(6,available_boxes);

const placeholder_player = {
  id:null,
  name: "N/A",
  type:"N/A",
  moves:[{name:"N/A"},{name:"N/A"},{name:"N/A"},{name:'N/A'}],
  description:"N/A",
  stats:{
    attack:0,
    defense:0,
    speed:0,
    luck:0
  },
  display_image:placeholder_image
}

// var player = {
//   image:null,
//   name:"",
//   type_icon:"",
//   type:""
// }


const GenerateStatBar = (stat,stats_point,color,showBar) =>{
  console.log(stat,stats_point,color);
  var stats_point_style = stats_point;
  if(stats_point > 105){
    stats_point_style = 100;
  }
  const bar = showBar ? `    <div  class="stat_bar" style="background:${color};width:${stats_point_style}%;margin-top:7.5%;height:10px;border-radius:30px"></div>`:"";
  const html = `
  <div class="row">
    <div class="col-4">
      <p style="color:white;font-size:20px;font-family:'Allerta Stencil'">${stat}</p>
    </div>
    <div class="col-6">
    ${bar}
    </div>
    <div class="col-2">
      <p style="font-size:20px;color:white">${stats_point}</p>
    </div>
  </div>`
  return html;
 }

const CreateSelectedCharacterData = (character,isPlayer) => {

  var text_effect = isPlayer? "player_name" : "enemy_name";
  var moves = character.moves;

console.log(character);

  const html = `<div class="col-6 selected_data ${character.type}_text">
    <div class="selected_character_details">
      <p class="selected_character_detail_item width-100 ">Specialty: <strong class="selected_specialty ${text_effect}"> ${CapitalizeFirstLetter(character.type)}</strong></p>
      ${GenerateStatBar("Attack",character.stats.attack,"#EB4646",true)}
      ${GenerateStatBar("Defense",character.stats.defense,"#5EDB28",true)}
      ${GenerateStatBar("Speed",character.stats.speed,"#38B6FF",true)}
      ${GenerateStatBar("Luck",character.stats.luck,"#FFBD59",true)}

   </div>
  </div>`;

  return html;


}

var selected_wizard  = {
  player:"",
  enemy:"",
}

const SelectWizard = (wizard) =>{

  selected_wizard.player = wizard;
  selected_wizard.enemy = available_wizards[Math.floor(Math.random() * available_wizards.length)];
  console.log(selected_wizard)
  var active_player_box = document.querySelector(".wizard_id_"+wizard.id);
  var active_enemy_box = document.querySelector(".wizard_id_"+selected_wizard.enemy.id);

  RemoveClassFromElements("character_available_box","active_character_available_box");
  active_enemy_box.classList.add("active_character_available_box");
  active_player_box.classList.add("active_character_available_box");

  console.log(active_enemy_box,active_player_box);

  var fight_btn = document.querySelector(".fight_btn");
  fight_btn.classList.add("active");
  fight_btn.classList.remove("no-point");

  fight_btn.addEventListener("click",()=>{
    console.log(selected_wizard);
    StartFight(selected_wizard.player,selected_wizard.enemy);

  });

  ready = true;
  GenerateSelectedCharacters(selected_wizard.player,selected_wizard.enemy,true,false);
  GenerateSelectedCharacters(selected_wizard.player,selected_wizard.enemy,true,true);
  var selected_box = document.querySelector(`.selected_`+wizard.id);
  var selected_enemy_box = document.querySelector(`.selected_`+selected_wizard.enemy.id);
  console.log(selected_box);
  SpriteAnimator(selected_box,selected_wizard.player.animation_sheet.idle,200);
  SpriteAnimator(selected_enemy_box,selected_wizard.enemy.animation_sheet.idle,200);

  RefreshModal(selected_wizard.player,selected_wizard.enemy);


}

const StartFight = (player,enemy)=>{
  if(ready && !fight_starting){
    console.log(4);
    document.body.classList.add("no-point");
    fight_starting = true;
    var modal = document.querySelector(".modal");
    modal.classList.add("active_modal");
    var vs = document.querySelector(".vs_text");
    vs.classList.add("active_vs");
    console.log(vs);
    ResetCountdown();
    Countdown(player,enemy);

  }
}

const PlayerSelectedSpecialEffect = async (isPlayer)=>{

  var container_class = isPlayer ? "player_effects" : "enemy_effects";
  var container = document.querySelector("."+container_class);

  var limit = 400;

  //const delay = (ms) => new Promise(resolve => setTimeout(resolve,500))
//  ;
  for (let i =0; i<=100;i++){
  //  await delay;
    var duration = Math.random() * 2;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    var random = plusOrMinus *(Math.random() * 150);
    var size = Math.floor(Math.random() * 100);

    var g = Math.floor(Math.random() * 255);
    var r = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    var effect = document.createElement("div");
    var animation_class = "selected_box_animation";

    effect.style.background = `rgb(${r},${g},${b})`;
    effect.classList.add(animation_class);
    effect.style.animationDuration = duration.toString() + "s";
    effect.style.left = random.toString() +"px";
    effect.style.width = size.toString() +'px';
    effect.style.height = size.toString() +'px';


    container.append(effect);



  }

}


const GenerateCharacterBox = (wizard,rotation) => {

  function returnImage(){
    if(wizard.display_image){
      var enlarge = wizard.name == "Ebin the Terrible"? "enlarge" : "";
      console.log( wizard.name)
      return `  <img class="  width-100  ${enlarge} character_available_image${wizard.id}" src= ${wizard.display_image} />`
    }else{
      return `<div></div>`
    }
  }

  const image = returnImage();
  var html = document.createElement("div");
  html.classList.add("col-2");
  var box_id  = wizard.id;
  html.addEventListener("click",(e)=>{
    SelectWizard(wizard);
  });
  // html.addEventListener("mouseover",(e)=>{
  //
  //   var sheet = wizard.animation_sheet.idle;
  //   var ms = 400;
  //
  //   var element = document.querySelector(`.${box_id}`);
  //
  //   SpriteAnimator(element,sheet,ms);
  //
  // });

   html.innerHTML = `

  <div class="character_available_box ${wizard.type}_text width-100 wizard_id_${wizard.id}"style="transform:rotate(${rotation}deg)"  >
  <div style="height:250px">
    ${image}
  </div>
    <p class="text-center character_available_name">${wizard.name}</p>
    <br />

    <div class='row'>
      <div class="col-1"></div>
      <div class="col-9">
      ${GenerateStatBar("Attack",wizard.stats.attack,"#EB4646",false)}
      ${GenerateStatBar("Defense",wizard.stats.defense,"#5EDB28",false)}
      ${GenerateStatBar("Speed",wizard.stats.speed,"#38B6FF",false)}
      ${GenerateStatBar("Luck",wizard.stats.luck,"#FFBD59",false)}
      </div>
    </div>

  </div>
  `;
  return html;



  return html;

}



const GenerateCharactersAvailable = (wizards) => {

  var container = document.querySelector(".characters_available_container");

  var rotations = randomRotation(wizards.length,3);

  for(var i = 0; i < wizards.length; i ++){

   container.append(GenerateCharacterBox(wizards[i],rotations[i]));

  }

}




const CreateSelectedCharacterBox = (character,isPlayer) => {


      var active_class = character.id ? "active_selected_character_box" : "selected_character_box right_selected_box";
      var effects = isPlayer? "player_effects" : "enemy_effects";
      console.log(character);
      var enlarge = character.name == "Ebin the Terrible"? "enlarge" : "";
      var flip = character.flip_sprite ? 180 : 0;
      var is_enemy_flip = isPlayer ?  0  : 180;
      flip += is_enemy_flip;
      var text_effect = isPlayer? "player_name" : "enemy_name";
      console.log(character.id);
      const html = `

      <div class="col-5 selected_player_container">
        <div class="${active_class}">
          <img style="transform:rotateY(${flip.toString()}deg)" class=" ${enlarge} width-100 selected_character_image selected_${character.id}"  src = "${character.display_image}"/>

        </div>
        <div class=${effects}></div>
      </div>


      <div class="col-6">
        <div class="selected_character_name">
            <p class="selected_character_item_name ${text_effect}">${character.name}</p>
        </div>

      </div>`;

      return html;

}

const CreateSelectedCharacterColumn = (character,ease,isPlayer) => {
      if(character.id){
        ease = "";
      }
      const html = `
         <div class="col-5 character_box ${ease}">
            <div class="row">
             ${CreateSelectedCharacterData(character,isPlayer)}
              <div class="col-1"></div>
              ${CreateSelectedCharacterBox(character,isPlayer)}



            </div>



          </div>
          `

      return html;

}



const GenerateSelectedCharacters = (player,enemy,playerSelected) => {

  var container = document.querySelector(".selected_character_container");
  EmptyContainer(container);

  var selected_character_html = `
    <div class="container-fluid selected_character_row">
      <div class="row">

        <div class="col-12">
          <div class="row">
            ${CreateSelectedCharacterColumn(player,"ease_left",true)}
            <div class="col-2"></div>
            ${CreateSelectedCharacterColumn(enemy,"ease_right",false)}
          </div>
        </div>

      </div>

    </div>
  `


  var selected_character_row = document.createElement("div");

  selected_character_row.innerHTML = selected_character_html;

  var container = document.querySelector(".selected_character_container");

  container.append(selected_character_row);
  if(playerSelected){

    PlayerSelectedSpecialEffect(true);
    PlayerSelectedSpecialEffect(false);
    if(music_active){
    var audio = document.querySelector(".ui_sound");
    audio.play();
  }

}


}





const GenerateHeader = () =>{

    var title_element = document.createElement("div");
    var header_element = document.createElement("div");

    var header_container = document.querySelector(".header_container");
    var title_container = document.querySelector(".title_container");


    var header_html =   `
      <div class="container-fluid">
      <a href="./index.html">
        <div class='row title_row' >

            <div class='col-2'>
              <img src = './assets/imgs/arrow.png' class='rotate-180 go_back_arrow'/>
            </div>
            <div class="col-1 go_back_text_container">
                <p class='go_back_text'> Home </p>
            </div>

          </div>
          </a>
        </div>


      `;

      var title_html = `  <div class="title_container">
          <p class='character_select_title'> Choose Your Character </p>
        </div>`;

      title_element.innerHTML = title_html;
      header_element.innerHTML = header_html;

      header_container.append(header_element);
      title_container.append(title_element);


}



const RefreshModal = (player,enemy)=>{

    var container = document.querySelector(".fight_showcase_modal");
    EmptyContainer(container);
    container.innerHTML = GenerateModal(player,enemy);

}


GenerateCharacterSelectionPage = (player,enemy) => {
  GenerateHeader();
  GenerateSelectedCharacters(player,enemy);
  GenerateCharactersAvailable(available_wizards);
}


GenerateCharacterSelectionPage(placeholder_player,placeholder_player);
