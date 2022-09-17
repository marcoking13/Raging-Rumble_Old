const saved_characters = {
  player:null,
  enemy:null
}

var disable = false;

music_active = true;

var enemy_health = 100;
var player_health = 100;

var enemy_recharge_turns = 0;
var player_recharge_turns = 0;
var enemy_stages = -5;
var player_stages = -5;



const Recharging = (charging_turns,element) =>{
  if(charging_turns > 0){
    element.classList.add("recharging");
  }else{
    element.classList.remove("recharging");
  }
}

const RenderBoost =(container, isEnemy, lower)=>{

  var float = isEnemy ? "right" : "left"
  console.log(lower)
  var buff = lower > 0 ? "buff" : "debuff";
  var html = `<img src = "./assets/imgs/buff.png" class="boost_icon ${buff}" style="float:${float}"/>`;

  var element = document.createElement("div");

  element.innerHTML = html;

  container.append(element);

}
const RenderHeader = () =>{

    const html = `
    <div class="row menu_header margin-top-2_5">
      <div class="col-1"></div>
        <div class="col-2">
          <button class="btn btn-secondary quit_button">Quit Game</button>
        </div>
    </div>`;



    const container = document.querySelector(".header_container");

    container.innerHTML = html;

    const button = document.querySelector(".quit_button").addEventListener("click",()=>{
      window.location.assign("./character_selection.html");
    })

}

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

const ReturnCharacterCol = (character,isEnemy) =>{

  var enemy_addon = isEnemy ? true : false;

  var is_enemy_class = isEnemy ? "enemy_character" : "player_character";
  var is_enemy_blood = isEnemy ? "enemy_blood" : "player_blood";
  var is_enemy_health = isEnemy ? enemy_health : player_health;
  var rotation = 0;
  var is_enemy_rotation = isEnemy ? 180 : 0;

  var is_sprite_rotation = character.flip_sprite ? 180 : 0;
  console.log(is_sprite_rotation);
  rotation = is_enemy_rotation + is_sprite_rotation;


  var enlarge = character.name == "Ebin the Terrible"? "enlarge" : "";

  const html = `
  <div class="character_fight_column width-100">
    <p class="character_fight_name">${character.name}</p>

    <div class="row">
      <div class="col-3"></div>

      <div class="col-6 character_img_container">
        <img style = "transform:rotateY(${rotation.toString()}deg)" src = "${character.display_image}" class="width-100 character_image ${is_enemy_class} ${enlarge}"/>
      </div>

      <div class="col-3"></div>
      <div class="col-2"></div>

      <div class="col-10 margin-top-5">
        <div class="health_bar width-100">
          <div class="blood ${is_enemy_blood}" style="width:${is_enemy_health}%;text-align:center">${is_enemy_health.toString()}</div>
        </div>
      </div>

    </div>

    <div class="row margin-top-5 move_row" style="width:90%;margin-left:5%;">

        ${MoveLoop(character.moves,is_enemy_class,enemy_addon)}

    </div>

  </div>`;

  return html;

}

const CalculateDamage = (health,character,enemy,damage) =>{

  var random_damage = Math.floor(Math.random() * 4) + 3;
  var level = 50;

  var level_calc = ((level * 2 / 5) + 2);
  var defensive_calc = (character.stats.attack.stat / (enemy.stats.defense.stat));

  var damage_dealt  = (damage  * defensive_calc);

  return Math.ceil(damage_dealt);

}

const RenderDescriptionRow  = () =>{

  const html = `
  <div class="row">

    <div class="col-2">
      <p class="detail_text attack_text"></p>
    </div>

    <div class="col-8">
      <p class="description_text">Hover over a move to learn more details</p>
    </div>

    <div class="col-2">
      <p class="detail_text accuracy_text"></p>
    </div>

    <br />


  </div>`;

  const container = document.querySelector(".description_container");
  container.innerHTML = html;

}

const RenderFightRow = (player,enemy) =>{

    const html = `
    <div class="row fight_row">

      <div class="col-4">
        ${ReturnCharacterCol(player,false)}
      </div>

      <div class="col-4 effect_box"></div>

      <div class="col-4">
        ${ReturnCharacterCol(enemy,true)}
      </div>

    </div>
    `;

    const container = document.querySelector(".fight_container");
    container.innerHTML = html;

}

const GetCharactersFromLocalStorage = () =>{

  var player = localStorage.getItem('player');
  var enemy = localStorage.getItem('enemy');

  saved_characters.player = JSON.parse(player);
  saved_characters.enemy = JSON.parse(enemy);

}

const UpdateDescription = (move) => {

  var description_element = document.querySelector(".description_text");
  var accuracy_element = document.querySelector(".accuracy_text");
  var attack_element = document.querySelector(".attack_text");

  attack_element.innerHTML = `Attack: ${move.damage}`;
  accuracy_element.innerHTML = `Accuracy: ${move.accuracy}`;
  description_element.innerHTML = `${move.description}`;

}

const ChangeHealthBarColor = (health,health_bar_query) =>{

  var element = null;
  var color = "#62B63F";

  if(health > 50){

    color = "#62B63F";

  }else if(health <= 50 && health >= 25){

    color = "#FFDE59";

  }else{

    color = "#FF5757";

  }

    element = document.querySelector("."+health_bar_query);
    element.style.backgroundColor = color;

}

const SideEffects = (side_effects,isEnemy,damage) => {

  if(side_effects){

    var recharge_turns = side_effects.name == "recharge" ? side_effects.turns : null;

     if(side_effects.name == "recharge"){

       if(!isEnemy){

         player_recharge_turns = recharge_turns;

       }else{

         enemy_recharge_turns = recharge_turns;

       }

     }
     else if(side_effects.name == "boost"){

       if(isEnemy){

            saved_characters.enemy.stats =  side_effects.effect(saved_characters.enemy.stats,side_effects.stat_type)
            enemy_stages += side_effects.stages * side_effects.lower;
            console.log(side_effects.lower)
            RenderBoost(document.querySelector(".boost_enemy"),true,side_effects.lower)

       }

       else{

            saved_characters.player.stats = side_effects.effect(saved_characters.player.stats,side_effects.stat_type);
            player_stages += side_effects.stages * side_effects.lower;
            RenderBoost(document.querySelector(".boost_player"),false,side_effects.lower)

       }
     }

     else if(side_effects.name == "drain"){

       if(!isEnemy){

          player_health = side_effects.effect(player_health,damage,"player_blood");
          var health_element = document.querySelector(".player_blood");
          health_element.style.width = player_health + "%";
          health_element.innerHTML = player_health;


        }else{

          enemy_health = side_effects.effect(enemy_health,damage,"enemy_blood");
          var health_element = document.querySelector(".enemy_blood");
          health_element.style.width = enemy_health + "%";
          health_element.innerHTML = enemy_health;

        }

      }
    }
    }




const ChangeHealthBarWidth = (query,isEnemy) =>{

  var element = document.querySelector("."+query);

  if(isEnemy){

    element.style.width = player_health + "%";
    element.innerHTML = player_health.toString();

  }else{

    element.style.width = enemy_health + "%";
    element.innerHTML = enemy_health.toString();

  }

}

const DisplayDamageCalculations = (selected_move,isEnemy) =>{

    var is_enemy_health = isEnemy ? player_health : enemy_health;

    var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;
    var is_player_character = isEnemy ? saved_characters.player :  saved_characters.enemy ;

    var is_enemy_blood = isEnemy ? "player_blood" : "enemy_blood";

    var side_effects = selected_move.side_effects;

    var damage = CalculateDamage(is_enemy_health,is_enemy_character,is_player_character,selected_move.damage);

    if(isEnemy){

      player_health -= damage;

    }else{

      enemy_health -= damage;

    }

    if(player_health <= 0){

      player_health = 0;

    }
    if(enemy_health <= 0){

      enemy_health = 0;

    }

    is_enemy_health = isEnemy ? player_health : enemy_health;

    ChangeHealthBarWidth(is_enemy_blood,isEnemy);
    ChangeHealthBarColor(is_enemy_health,is_enemy_blood);

    SideEffects(side_effects,isEnemy,damage);

  }

const IsPlayerFaster = (player_stats,enemy_stats) =>{

  if(player_stats.speed.stat >= enemy_stats.speed.stat){

    return true;

  }else{

    return false;

  }

}

const EnemyAttacks = () =>{

  var random_move = saved_characters.enemy.moves[Math.floor(Math.random()*3)+1].name;
  var selected_move = MoveBase[random_move];

  Attack(selected_move,true);

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

const BattleSequence = async(is_player_faster,player_args) => {




  if(is_player_faster){

    if(player_health > 0){
      Attack(player_args.move,player_args.isEnemy);
    }else{
      DeathAnimation(document.querySelector(".player_character"))
    }

    await delay(2500);

    if(enemy_health > 0){
      EnemyAttacks();
    }else{
      DeathAnimation(document.querySelector(".enemy_character"))
    }

  }else{

    if(enemy_health > 0){
      EnemyAttacks();
    }else{
      DeathAnimation(document.querySelector(".enemy_character"))
    }

    await delay(2500);

    if(player_health > 0){
      Attack(player_args.move,player_args.isEnemy);
    }else{
      DeathAnimation(document.querySelector(".player_character"))
    }

  }

}

const Battle = async (id) =>{

  if(!disable){

    document.body.classList.add("no-point");

    disable = true;

    var move_row = document.querySelector(".move_row");
    move_row.style.opacity = "50%";

    var is_player_faster = IsPlayerFaster(saved_characters.player.stats,saved_characters.enemy.stats)

    const selected_move = MoveBase[id];

    var player_args = {
      move : selected_move,
      isEnemy: false
    }

    BattleSequence(is_player_faster,player_args);

    await delay(4500);

    var winner = DetermineWinner();

    console.log(DetermineWinner());
    if(winner){
      RenderEndPage(winner.character,winner.win);
    }else{

      disable = false;

      move_row.style.opacity = "100%";

      document.body.classList.remove("no-point");

    }



  }

}



const Attack = async(move,isEnemy) => {

    var is_enemy_image = isEnemy ? "enemy_character" : "player_character";
    var is_alert = isEnemy ? "Enemy" : "Player";
    var is_enemy_health = isEnemy ? player_health : enemy_health;
    var is_enemy_sheet_idle = isEnemy ? saved_characters.enemy.animation_sheet.idle : saved_characters.player.animation_sheet.idle;
    var is_drained_health = isEnemy ? enemy_health : player_health;
    var is_enemy_recharge = isEnemy ? enemy_recharge_turns : player_recharge_turns;
    var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;
    var is_enemy_blood = isEnemy ? "player_blood" : "enemy_blood";
    var character_health_element = document.querySelector("."+is_enemy_blood);
    var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;
    var is_enemy_sheet = isEnemy ? saved_characters.enemy.animation_sheet.attack : saved_characters.player.animation_sheet.attack;
    var character_image = document.querySelector("."+is_enemy_image);

    Recharging(player_recharge_turns,document.querySelector(".player_character"))
    Recharging(enemy_recharge_turns,document.querySelector(".enemy_character"))

     if(is_enemy_recharge <= 0){

      if(move.accuracy > Math.floor(Math.random() * 100 + 1)){

        var total_delay = move.effects * move.milliseconds + 1300;

        SpriteAnimator(character_image,is_enemy_sheet,200,total_delay,is_enemy_character.display_image);

        GenerateMove(move,isEnemy,move.isRandom);

        await delay(total_delay);

        DisplayDamageCalculations(move,isEnemy);

        return total_delay + 1000;

      }

    }else{

      if(isEnemy){

        enemy_recharge_turns--;

      }else{

        player_recharge_turns--;

      }



      }


}

const IntializeGame = () =>{

  GetCharactersFromLocalStorage();
  RenderHeader();
  RenderFightRow(saved_characters.player,saved_characters.enemy);
  RenderDescriptionRow();
  AddEventToMoves();

}


const DeathAnimation = async(characterElement) => {
  characterElement.classList.add("death");
  var audio = document.querySelector(".death_sound");
  audio.play();
  await delay(1000);
}

const DetermineWinner = () =>{

  if(player_health <= 0 || enemy_health <= 0){

      if(player_health <= 0 && enemy_health <= 0){

        return {character:saved_characters.player,win:true}

      }
      else if(enemy_health <= 0 && player_health > 0){

        return {character:saved_characters.player,win:true}

      }else{

        return {character:saved_characters.enemy,win:false};

      }
  }else{

    return false;

  }

}
if(window.innerWidth >= 680){
  IntializeGame();
}
