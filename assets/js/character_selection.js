const available_boxes = 6;
var ready = false;
var fight_starting = false;

const available_characters = return_available_characters(6,available_boxes);
const placeholder_character = return_placeholder_character();

var enemy_interval = null
var player_interval = null

var selected_character  = {
  player:"",
  enemy:"",
}

const ResetStatPoint = (current_point,limit,reset_to) =>{

    if(current_point > limit){
      return reset_to;
    }else{
      return current_point;
    }

  }

const RenderStatBar = (stat,stats_point,color,show_bar) =>{

  var stats_point_style = ResetStatPoint(stats_point, 101 ,100);

  const bar = show_bar ? ` <div class="stat_bar stat_bar_character_selection" style="background:${color};width:${stats_point_style}%"></div>`:"";

  const html = `
  <div class="row">
    <div class="col-6">
      <p class="stat_point_character_selection white">
        ${stat}
      </p>
    </div>

    <div class="col-4">
      ${bar}
    </div>
    <div class="col-2">
      <p class="stat_point_number ">
        ${stats_point}
      </p>
    </div>
  </div>`
  ;

  return html;

}

const StatBarLoop = (stats,show) => {

  var counter = 0;
  var html = ``;

  while (counter < stats.length){

   var current_stat = stats[counter];

   html += RenderStatBar(current_stat.name,current_stat.stat,current_stat.color,show);

   counter++;

  }

  return html;

}

const RenderSelectedCharacterData = (character,is_player) => {

  var text_effect = is_player ? "player_name" : "enemy_name";

  var moves = character.moves;
  var stats = character.stats;

  const html = `

  <div class="col-6 selected_data ${character.type}_text">

    <div class="selected_character_details">

      <p class="selected_character_detail_item width-100 ">
        <strong class="selected_specialty ${text_effect}">
         ${CapitalizeFirstLetter(character.type)}
        </strong>
      </p>

      ${StatBarLoop([stats.health,stats.attack,stats.defense,stats.speed],true)}

    </div>

  </div>

  `;

  return html;

}


const SelectCharacter = (character,box_class) =>{

  selected_character.player = character;
  selected_character.enemy = available_characters[Math.floor(Math.random() * available_characters.length)];

  var enemy = selected_character.enemy;
  var player = selected_character.player;

  var active_player_box = document.querySelector(".wizard_id_"+player.id);
  var active_enemy_box = document.querySelector(".wizard_id_"+enemy.id);

  RemoveClassFromElements("character_available_box","active_character_available_box");



  var fight_btn = document.querySelector(".fight_btn");

  fight_btn.classList.add("active");
  fight_btn.classList.remove("no-point");

  fight_btn.addEventListener("click",()=>{

    StartFight(player,enemy);

  });

  ready = true;
  var box = document.querySelector("."+box_class)
  console.log(box)
  RenderSelectedCharacters(player,enemy,true);

  RenderCharactersAvailable(available_characters);
  clearInterval(player_interval);
  clearInterval(enemy_interval);

  player_interval = setInterval(()=>{PlayerSelectedSpecialEffectSingle("wizard_id_"+player.id,true,"./assets/imgs/flame_e.png")},200);
  enemy_interval = setInterval(()=>{PlayerSelectedSpecialEffectSingle("wizard_id_"+enemy.id,false,"./assets/imgs/flame_e.png")},200);

  document.querySelector(".wizard_id_"+player.id).classList.add("active_character_available_box");
  document.querySelector(".wizard_id_"+enemy.id).classList.add("active_character_available_box");
  var selected_box = document.querySelector(`.selected_`+player.id);
  var selected_enemy_box = document.querySelector(`.selected_`+enemy.id);

  AnimateCharacter(selected_box,false,selected_character.player.animation_sheet.idle,300)
  AnimateCharacter(selected_enemy_box,true,selected_character.enemy.animation_sheet.idle,300)

  RefreshModal(player,enemy);

}

const StartFight = (player,enemy)=>{

  if(ready && !fight_starting){

    document.body.classList.add("no-point");

    fight_starting = true;

    var modal = document.querySelector(".modal");
    modal.classList.add("active_modal");

    var vs = document.querySelector(".vs_text");
    vs.classList.add("active_vs");

    SaveCharacters(player,enemy);

    ResetCountdown();

    Countdown(player,enemy);

  }

}


const RenderAvailableBox = (character,rotation) => {

  var stats = character.stats;

  function returnImage(){

    if(character.display_image){
      var enlarge = character.name == "Ebin the Terrible"? "enlarge" : "";
      return `<img class="width-25 character_available_image ${character.id}" style="float:left;width:40%" src= ${character.display_image} />`
    }else{
      return `<div></div>`
    }

  }

  const image = returnImage();

  var html = document.createElement("div");
  html.classList.add("col-6");

  var box_id  = character.id;

  html.addEventListener("click",(e)=>{
    SelectCharacter(character,`wizard_id_${character.id}`);
  });

   html.innerHTML = `

  <div class="character_available_box ${character.type}_text width-100 wizard_id_${character.id}"style="height:100px;"  >


      ${image}

      <p class="character_available_name" style="width:50%;float:left;margin-top:5%">${character.name}</p>

      <br />


  </div>

  `;

  return html;

}

const RenderCharactersAvailable = (characters) => {

  var container = document.querySelector(".characters_available_container");

  var rotations = randomRotation(characters.length,3);

  for(var i = 0; i < characters.length; i ++){

   container.append(RenderAvailableBox(characters[i],rotations[i]));

  }

}

const RenderSelectedCharacterBox = (character,is_player) => {

    var active_class = character.id ? "active_selected_character_box" : "selected_character_box right_selected_box";
    var effects = is_player? "player_effects" : "enemy_effects";
    var text_effect = is_player? "player_name" : "enemy_name";
    var enlarge = character.name == "Ebin the Terrible"? "enlarge" : "";
    var flip = character.flip_sprite ? 180 : 0;
    var is_enemy_flip = is_player ?  0  : 180;

    flip += is_enemy_flip;

    const html = `

      <div class="col-5 selected_player_container">
        <div class="${active_class}">
          <img style="transform:rotateY(${flip.toString()}deg)" class=" ${enlarge} width-100 selected_character_image selected_${character.id}"  src = "${character.display_image}"/>
        </div>
        <div class=${effects}></div>
      </div>


      <div class="col-12">
        <div class="selected_character_name">
          <p class="selected_character_item_name ${text_effect}">${character.name}</p>
        </div>

      </div>`;

      return html;

}

const RenderSelectedCharacterColumn = (character,ease,is_player,playerSelected) => {

      if(character.id){
        ease = "";
      }

      const html = `
         <div class="col-5 character_box ${ease}">

            <div class="row">
             ${RenderSelectedCharacterData(character,is_player,playerSelected)}
              <div class="col-1"></div>
             ${RenderSelectedCharacterBox(character,is_player,playerSelected)}
            </div>

          </div>
          `

      return html;

}

const RenderSelectedCharacters = (player,enemy,playerSelected) => {

  var container = document.querySelector(".selected_character_container");
  EmptyContainer(container);
  console.log(playerSelected)
  var selected_character_html = `
    <div class="container-fluid selected_character_row">
      <div class="row">
        <div class="col-4" style="background:black;position:relative;bottom:50px">
          <div class="row characters_available_container" style="background:black">

          </div>
        </div>
        <div class="col-8">
          <div class="row">
            ${RenderSelectedCharacterColumn(player,"ease_left",true)}
            <div class="col-2"></div>
            ${RenderSelectedCharacterColumn(enemy,"ease_right",false)}
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

    PlayerSelectedSpecialEffect(true,"./assets/imgs/flame_e.png");
    PlayerSelectedSpecialEffect(false,"./assets/imgs/flame_e.png");

    if(music_active){
      var audio = document.querySelector(".ui_sound");
      audio.play();
    }

  }

}

const RenderHeader = () =>{

    var title_element = document.createElement("div");
    var header_element = document.createElement("div");

    var header_container = document.querySelector(".header_container");
    var title_container = document.querySelector(".title_container");

    var header_html =
    `
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

    var title_html = `
      <div class="title_container">
          <p class='character_select_title'> Choose Your Character </p>
      </div>`;

    title_element.innerHTML = title_html;
    header_element.innerHTML = header_html;

    header_container.append(header_element);
    title_container.append(title_element);


}

RenderCharacterSelectionPage = (player,enemy) => {

  RenderHeader();

  RenderSelectedCharacters(player,enemy);

  RenderCharactersAvailable(available_characters);

}


if(window.innerWidth >= 680){
  RenderCharacterSelectionPage(placeholder_character,placeholder_character);
}
