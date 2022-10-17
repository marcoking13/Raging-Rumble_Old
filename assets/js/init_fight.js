var saved_characters = {
  player:null,
  enemy:null
}

var player_engine = new Engine(0,0,0);
var enemy_engine = new Engine(0,0,0);

var player_element = null;
var enemy_element = null;

var disable = false;

music_active = true;

const MoveLoop = (moves,class_name,is_enemy) =>{

  var html = ``;

  if(!is_enemy){

    for(var i = 0; i < moves.length; i++){
      var capital_name = CapitalizeFirstLetter(moves[i].name)
      html +=   `
        <div class="col-6">
          <div class="move_box  ${class_name}_box" id="${moves[i].name}" is_enemy = "${is_enemy}">
            <img class="flame_hov" src = "./assets/imgs/flame_hover.gif"/>
            ${capital_name}
          </div>
        </div>`

    }

  }

  return html;

}

const GetCharactersFromLocalStorage = () =>{

  var player = localStorage.getItem('player');
  var enemy = localStorage.getItem('enemy');

  saved_characters.player = JSON.parse(player);
  saved_characters.enemy = JSON.parse(enemy);

}

const AddEventToMoves = () =>{

  var moves = document.getElementsByClassName("move_box");

  document.querySelectorAll('.player_character_box').forEach(move => {

      move.addEventListener('mouseover', e => {

        var id = e.target.getAttribute("id");
        console.log(id);
        UpdateDescription(MoveBase[id]);

      });

      move.addEventListener("click", async(e) => {

        selected_move_id = e.target.getAttribute("id");
        Battle(selected_move_id);

      });

  })

}

const IntializeGame = () =>{

  GetCharactersFromLocalStorage();

  clearInterval(player_iterator)
  clearInterval(enemy_iterator)

  player_engine.health = 5;
  enemy_engine.health = 5;

  RenderHeader();
  RenderFightRow(saved_characters.player,saved_characters.enemy);
  RenderDescriptionRow(saved_characters.player);
  AddEventToMoves();

  player_element = document.querySelector(".player_character");
  enemy_element = document.querySelector(".enemy_character")

  player_iterator = AnimateCharacter(player_element,false,saved_characters.player.animation_sheet.idle,200);
  enemy_iterator = AnimateCharacter(enemy_element,true,saved_characters.enemy.animation_sheet.idle,200);

}


if(window.innerWidth >= 680){
  IntializeGame();
  StopOrPlayAudio(document.querySelector(".game_music"),music_active)
}
