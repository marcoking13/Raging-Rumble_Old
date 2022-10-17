
const Attack = async(move,is_enemy) => {

    var attacker_query = is_enemy ? "enemy_character" : "player_character";
    var iterator = is_enemy ? enemy_iterator : player_iterator;
    var attacker_health = is_enemy ? enemy_engine.health : player_engine.health;
    var defender_health = !is_enemy ? enemy_engine.health : player_engine.health;
    var attacker_recharge = is_enemy ? enemy_engine.recharge_turns : player_engine.recharge_turns;
    var attacker = is_enemy ? saved_characters.enemy :  saved_characters.player ;
    var attacking_animation = attacker.animation_sheet.attack;
    var idle_animation = attacker.animation_sheet.idle;
    var attacker_element = document.querySelector("."+attacker_query);

    Recharging(player_engine.recharge_turns,document.querySelector(".player_character"))
    Recharging(enemy_engine.recharge_turns,document.querySelector(".enemy_character"))

    if(attacker_health > 0 && defender_health > 0 ){

     if(attacker_recharge <= 0){

      if(move.accuracy > Math.floor(Math.random() * 100 + 1)){

        var total_delay = move.effects * move.milliseconds + 1300;

        await AnimateCharacter(attacker_element,is_enemy,attacking_animation,200);

        GenerateMove(move,is_enemy,move.isRandom);

        await delay(total_delay);

        await AnimateCharacter(attacker_element,is_enemy,idle_animation,200);

        DisplayDamageCalculations(move,is_enemy);

        await Death(is_enemy);
        await delay(1000);
        var winner = DetermineWinner();

        EndGame(winner);

        return total_delay + 1300;

      }else{
        RenderMiss(is_enemy);
      }

    }else{

      if(is_enemy){

        enemy_engine.recharge_turns--;

      }else{

        player_engine.recharge_turns--;

      }

    }

  }

}

const CalculateDamage = (health,character,enemy,damage) =>{

  var random_damage = Math.floor(Math.random() * 4) + 3;
  var level = 50;

  var level_calc = ((level * 2 / 5) + 2);
  var defensive_calc = (character.stats.attack.stat / (enemy.stats.defense.stat));

  var damage_dealt  = (damage  * defensive_calc);

  return Math.ceil(damage_dealt);

}


const DetermineWinner = () =>{

  if(player_engine.health <= 0 || enemy_engine.health <= 0){

      if(player_engine.health <= 0 && enemy_engine.health <= 0){

        return {character:saved_characters.player,win:true}

      }
      else if(enemy_engine.health <= 0 && player_engine.health > 0){

        return {character:saved_characters.player,win:true}

      }else{

        return {character:saved_characters.enemy,win:false};

      }
  }else{

    return false;

  }

}

const EndGame = (winner) =>{
    if(winner){

     saved_characters = {
        player:null,
        enemy:null
      }

      RenderEndPage(winner.character,winner.win);

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

    BattleSequence(is_player_faster,selected_move);

    await delay(4500);

    EmptyContainer(document.querySelector(".effect_box"));

    disable = false;

    move_row.style.opacity = "100%";

    document.body.classList.remove("no-point");

 }


}

const BattleSequence = async(is_player_faster,selected_move) => {

  var attack_sequence = [];

  var random_counter = saved_characters.enemy.moves[Math.ceil(Math.random()*3)].name;
  var random_move = MoveBase[random_counter];

  var enemy_args = {
    move : random_move,
    is_enemy:true
  }

  var player_args = {
    move : selected_move,
    is_enemy: false
  }

  if(is_player_faster){
    attack_sequence.push(player_args);
    attack_sequence.push(enemy_args);
  }else{
    attack_sequence.push(enemy_args);
    attack_sequence.push(player_args);
  }

  Attack(attack_sequence[0].move, attack_sequence[0].is_enemy);
  await delay(2500);
  Attack(attack_sequence[1].move, attack_sequence[1].is_enemy);

}


const IsPlayerFaster = (player_stats,enemy_stats) =>{

  if(player_stats.speed.stat >= enemy_stats.speed.stat){

    return true;

  }else{

    return false;

  }

}

const DisplayDamageCalculations = (selected_move,is_enemy) =>{

    var defender_health = is_enemy ? player_engine.health : enemy_engine.health;

    var attacker = is_enemy ? saved_characters.enemy :  saved_characters.player;
    var defender = is_enemy ? saved_characters.player :  saved_characters.enemy;

    var defender_blood = is_enemy ? "player_blood" : "enemy_blood";

    var side_effects = selected_move.side_effects;

    var damage = CalculateDamage(defender_health,attacker,defender,selected_move.damage);

    if(is_enemy){

      player_engine.health -= damage;

    }else{

      enemy_engine.health -= damage;

    }

    if(player_engine.health <= 0){

      player_engine.health = 0;

    }
    if(enemy_engine.health <= 0){

      enemy_engine.health = 0;

    }

    defender_health = is_enemy ?   player_engine.health :   enemy_engine.health;

    ChangeHealthBarWidth(defender_blood,defender_health,defender);
    ChangeHealthBarColor(defender_health,defender_blood,defender.stats.health.stat);

    SideEffects(side_effects,is_enemy,damage);

}



const SideEffects = (side_effects,is_enemy,damage) => {

  function boost(side_effects,character,is_enemy){
    var class_name = is_enemy ? "boost_enemy" : "boost_player";
    var element = document.querySelector("."+class_name)

    RenderBoost(element,is_enemy,side_effects.lower,side_effects.stages);

    return side_effects.effect(character.stats,side_effects.stat_type);
  }

  if(side_effects){

     if(side_effects.name == "recharge"){

       var recharge_turns = side_effects.turns;

       if(!is_enemy){

         player_engine.recharge_turns = recharge_turns;

       }else{

         enemy_engine.recharge_turns  = recharge_turns;

       }

     }
     else if(side_effects.name == "boost"){

       if(is_enemy){

          if(enemy_engine.stages < 4){
            var boost_data =  boost(side_effects,saved_characters.enemy,true);
            saved_characters.enemy.stats = boost_data;
            enemy_engine.stages += 1;

          }

       }
       else{

          if(player_engine.stages < 4){

            var boost_data =  boost(side_effects,saved_characters.player,false);
            saved_characters.player.stats = boost_data;
            player_engine.stages += 1;

          }

       }

     }

     else if(side_effects.name == "drain"){

       var query = is_enemy ? "enemy_blood" : "player_blood";
       var character = is_enemy ? saved_characters.enemy : saved_characters.player;

       if(!is_enemy){

          player_engine.health = side_effects.effect(player_engine.health,damage,query,character);

        }else{

          enemy_engine.health = side_effects.effect(enemy_engine.health,damage,query,character);

        }

        var health = is_enemy ? enemy_engine.health : player_engine.health;

        ChangeHealthBarWidth(query,health,character);

      }

    }

  }



  const Death = async(is_enemy) =>{

    var defender_health = is_enemy ? player_engine.health : enemy_engine.health;

    var element =  is_enemy ? document.querySelector(".player_character") : document.querySelector(".enemy_character");

    if(defender_health <=0){
      DeathAnimation(element)
    }

  }
