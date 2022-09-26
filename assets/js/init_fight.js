const saved_characters = {
  player:null,
  enemy:null
}

class Engine {
  constructor(iterator,health,recharge,stages){
    this.iterator = iterator;
    this.health = health;
    this.recharge = recharge;
    this.stages = stages;
  }
}


var player_engine = new Engine(null,0,0,0);
var enemy_engine = new Engine(null,0,0,0);

var player_element = null;
var enemy_element = null;

var disable = false;

music_active = true;

var enemy_health = 100;
var player_health = 100;

var enemy_recharge_turns = 0;
var player_recharge_turns = 0;

var enemy_stages = 0;
var player_stages = 0;



const MoveLoop = (moves,className,isEnemy) =>{

  var html = ``;

  if(!isEnemy){

    for(var i = 0; i < moves.length; i++){

      html +=   `
        <div class="move_box ${className}_box col-6" id="${moves[i].name}" isEnemy = "${isEnemy}">
          ${moves[i].name}
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
  // player_health = saved_characters.player.stats.health.stat;
  // enemy_health = saved_characters.enemy.stats.health.stat;

  player_health = saved_characters.player.stats.health.stat
  enemy_health = saved_characters.enemy.stats.health.stat;
  RenderHeader();
  RenderFightRow(saved_characters.player,saved_characters.enemy);
  RenderDescriptionRow();
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
