const saved_characters = {
  player:null,
  enemy:null
}

var disable = false;
var enemy_health = 100;
var player_health = 100;

var enemy_recharge_turns = 0;
var player_recharge_turns = 0;

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

}

const ReturnCharacterCol = (player,isEnemy) =>{
  var enemy_addon = isEnemy ? true : false;
  var is_enemy_class = isEnemy ? "enemy_character" : "player_character";
  var is_enemy_blood = isEnemy ? "enemy_blood" : "player_blood";
  var is_enemy_health = isEnemy ? enemy_health : player_health;
  var is_enemy_rotation = isEnemy ? 180 : 0;
  var enlarge = player.name == "Ebin the Terrible"? "enlarge" : "";

  const html = `
  <div class="character_fight_column width-100">
    <p class="character_fight_name">${player.name}</p>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 character_img_container">
        <img style = "transform:rotateY(${is_enemy_rotation.toString()}deg)" src = "${player.display_image}" class="width-100 character_image ${is_enemy_class} ${enlarge}"/>
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

      <div class="move_box ${is_enemy_class}_box col-6" id="${player.moves[0].name}" isEnemy = "${enemy_addon}">
        ${player.moves[0].name}
      </div>
      <div class="move_box ${is_enemy_class}_box  col-6"id="${player.moves[1].name}" isEnemy = "${enemy_addon}">
        ${player.moves[1].name}
      </div>
      <div class="move_box ${is_enemy_class}_box col-6"id="${player.moves[2].name}" isEnemy = "${enemy_addon}">
        ${player.moves[2].name}
      </div>
      <div class="move_box ${is_enemy_class}_box  col-6"id="${player.moves[3].name}" isEnemy = "${enemy_addon}">
        ${player.moves[3].name}
      </div>
    </div>



  </div>`;

  return html;
}






const  CalculateDamage = (health,character,damage) =>{
  var defense = character.stats.defense;
  var attack = character.stats.attack;
  var random_damage = Math.floor(Math.random() * 4) + 3;
  console.log(damage);

  var level = 50;

  var level_calc = ((level * 2 / 5) + 2);
  var defensive_calc = (attack/defense);

  var damage_dealt  = (((level_calc + 2) * damage * defensive_calc) / 50 + 2)+random_damage;

  console.log(damage_dealt);

  return Math.floor(damage_dealt);

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


const UpdateCharacters = () =>{

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

const ChangeHealthBarColor = (element,health) =>{

  if(health > 50){
    element.style.backgroundColor = "green";
  }else if(health <= 50 && health >= 25){
    element.style.backgroundColor = "yellow";
  }else{
    element.style.backgroundColor = "red";
  }

}

const DisplayDamageCalculations = (selected_move,isEnemy) =>{
    var is_enemy_health = isEnemy ? player_health : enemy_health;
    var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;

    var is_enemy_blood = isEnemy ? "player_blood" : "enemy_blood";
    var character_health_element = document.querySelector("."+is_enemy_blood);
    var side_effects = selected_move.side_effects;
      var enemy_damage = CalculateDamage(player_health,saved_characters.enemy,selected_move.damage);
      var player_damage= CalculateDamage(enemy_health,saved_characters.player,selected_move.damage);
   if(isEnemy){

      player_health -= player_damage;

      if(player_health < 0){
        player_health = 0;
      }


            if(side_effects){
              if(side_effects.name == "recharge"){
                player_recharge_turns = side_effects.turns;
              }
              else if(side_effects.name == "boost"){
               var stats = saved_characters.enemy.stats;
               saved_characters.enemy.stats =  side_effects.effect(stats,side_effects.stat_type);
               console.log(saved_characters.enemy.stats);
             }
             else if(side_effects.name == "drain"){
               player_health = move.side_effects.effect(enemy_health,enemy_damage,".enemy_blood");
             }
            }


      ChangeHealthBarColor(character_health_element,player_health);
      character_health_element.style.width = player_health + "%";
      character_health_element.innerHTML = player_health;



   }else{
       enemy_health -= enemy_damage;

      if(enemy_health < 0){
        enemy_health = 0;
      }

      if(side_effects){
        if(side_effects.name == "recharge"){
          var turns = side_effects.effect(side_effects.turns,side_effects.isEnemy);
          player_recharge_turns = turns.player;
          enemy_recharge_turns = turns.enemy;

        }
        else if(side_effects.name == "boost"){
         var stats = saved_characters.player.stats;
         saved_characters.player.stats =  side_effects.effect(stats,side_effects.stat_type,side_effects.stage_points,side_effects.stages);
       }
       else if(side_effects.name == "drain"){
         player_health = side_effects.effect(player_health,player_damage,"player_blood");
       }
      }

      ChangeHealthBarColor(character_health_element,enemy_health);
      character_health_element.style.width = enemy_health + "%";
      character_health_element.innerHTML = enemy_health;

  }


}


const IsPlayerFaster = (player_stats,enemy_stats) =>{

  if(player_stats.speed > enemy_stats.speed){
    return true;
  }else{
    return false;
  }

}


const EnemyAttacks = () =>{

  var random_move = saved_characters.enemy.moves[Math.floor(Math.random()*3)+1].name;
  var selected_move = MoveBase[random_move];
  console.log(selected_move);
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
        Battle(selected_move_id)
      });

  })

}




const Battle = async (id) =>{

  if(!disable){

    document.body.classList.add("no-point");

    disable = true;

    var move_row = document.querySelector(".move_row");
    move_row.style.opacity = "50%";

    var is_player_faster = IsPlayerFaster(saved_characters.player.stats,saved_characters.enemy.stats)

    const selected_move = MoveBase[id];
    console.log(enemy_recharge_turns,player_recharge_turns);
    if(is_player_faster){
      console.log(player_recharge_turns,enemy_recharge_turns)
      if(player_recharge_turns <= 0){

        Attack(selected_move,false);
      }else{
        alert("Player Must Recharge")
      }
      await delay(2000);
      if(enemy_recharge_turns <= 0){
        EnemyAttacks();
    }else{
      alert("Enemy Must Recharge")
    }

    }else{

      if(enemy_recharge_turns <= 0){
        EnemyAttacks();
    }else{
      alert("Enemy Must Recharge")
    }
      await delay(2000);
      if(player_recharge_turns <= 0){
        Attack(selected_move,false);
      }else{
        alert("Player Must Recharge")
      }
      player_recharge_turns --;
      enemy_recharge_turns --;

    }

    await delay(2000);

    disable = false;

    move_row.style.opacity = "100%";

    document.body.classList.remove("no-point");

  }

}

const Attack = async(move,isEnemy) => {

  var is_enemy_image = isEnemy ? "enemy_character" : "player_character";
  var is_alert = isEnemy ? "Enemy" : "Player";
  var is_enemy_health = isEnemy ? player_health : enemy_health;
  var is_drained_health = isEnemy ? enemy_health : player_health;
  var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;
  var is_enemy_blood = isEnemy ? "player_blood" : "enemy_blood";
  var character_health_element = document.querySelector("."+is_enemy_blood);
  var is_enemy_character = isEnemy ? saved_characters.enemy :  saved_characters.player ;
  var is_enemy_sheet = isEnemy ? saved_characters.enemy.animation_sheet.attack : saved_characters.player.animation_sheet.attack;
  var character_image = document.querySelector("."+is_enemy_image);

  if(move.accuracy > Math.floor(Math.random() * 100 + 1)){
    var total_delay = move.effects * move.milliseconds + 1300;
    console.log(is_enemy_character.display_image);
    SpriteAnimator(character_image,is_enemy_sheet,200,total_delay,is_enemy_character.display_image);

    GenerateMove(move,isEnemy,move.isRandom);

    await delay(total_delay);

    DisplayDamageCalculations(move,isEnemy);



    return total_delay + 1000;

  }else{
    alert(`${is_alert} Missed!`)
  }

  var is_enemy_sheet_idle = isEnemy ? saved_characters.enemy.animation_sheet.idle : saved_characters.player.animation_sheet.idle;

}


const IntializeGame = () =>{

  UpdateCharacters();
  RenderHeader();
  RenderFightRow(saved_characters.player,saved_characters.enemy);
  RenderDescriptionRow();
  AddEventToMoves();

}

IntializeGame();
