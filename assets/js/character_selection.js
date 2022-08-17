const placeholder_image = `./assets/imgs/placeholder.png`;
const available_boxes = 9;
const available_wizards = return_available_wizards(1,available_boxes);

const placeholder_player = {
  id:null,
  name: "N/A",
  type:"N/A",
  moves:[{name:"N/A"},{name:"N/A"},{name:"N/A"},{name:'N/A'}],
  description:"N/A",
  display_image:placeholder_image
}

// var player = {
//   image:null,
//   name:"",
//   type_icon:"",
//   type:""
// }


const CreateSelectedCharacterData = (character) => {


  var moves = character.moves;



  const html = `<div class="col-6 selected_data ${character.type}_text">
    <div class="selected_character_details margin-left-10">
      <p class="selected_character_detail_item width-100">Specialty: <strong class="selected_specialty"> ${CapitalizeFirstLetter(character.type)}</strong></p>
      <p class="selected_character_detail_item ">Moves<strong class="selected_moves margin-left-5"> <br> ${" "+moves[0].name} <br> ${" "+moves[1].name} <br> ${" "+moves[2].name} <br> ${" "+moves[3].name}</strong></p>

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
  var active_box = document.querySelector("."+wizard.id);


  SpriteAnimator(active_box,selected_wizard.player.animation_sheet.idle,500);

  GenerateSelectedCharacters(selected_wizard.player,selected_wizard.enemy,true,false);
  GenerateSelectedCharacters(selected_wizard.player,selected_wizard.enemy,true,true);
  var selected_box = document.querySelector(`.selected_`+wizard.id);
  console.log(selected_box);
  SpriteAnimator(selected_box,selected_wizard.player.animation_sheet.idle,500);


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
      return `  <img class="character_available_image width-100 ${wizard.id}" src= ${wizard.display_image} />`
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
    ${image}
    <p class="text-center character_available_name">${wizard.name}</p>
    <span class="type_container">
      <p class="type_text ${wizard.type}_border_color ${wizard.type}_background" >${CapitalizeFirstLetter(wizard.type)}</p>
    </span>

        <p class="description_text " > This is some descriptive text to be used for later</p>


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
      console.log(character.id);
      const html = `

      <div class="col-6 selected_player_container">
        <div class="${active_class}">
          <img class="width-100 selected_character_image selected_${character.id}"  src = "${character.display_image}"/>

        </div>
        <div class=${effects}></div>
      </div>


      <div class="col-6">
        <div class="selected_character_name">
            <p class="selected_character_item_name ">${character.name}</p>
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


GenerateCharacterSelectionPage = (player,enemy) => {
  GenerateHeader();
  GenerateSelectedCharacters(player,enemy);
  GenerateCharactersAvailable(available_wizards);
}


GenerateCharacterSelectionPage(placeholder_player,placeholder_player);
