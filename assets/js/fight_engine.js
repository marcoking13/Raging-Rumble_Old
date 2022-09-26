const Attack = async(move,isEnemy) => {

    var attacker_query = isEnemy ? "enemy_character" : "player_character";
    var attacker_health = isEnemy ? enemy_health : player_health;
    var attacker_recharge = isEnemy ? enemy_recharge_turns : player_recharge_turns;
    var attacker = isEnemy ? saved_characters.enemy :  saved_characters.player ;
    var attacker_animation = attacker.animation_sheet.attack;
    var attacker_element = document.querySelector("."+attacker_query);

    Recharging(player_recharge_turns,document.querySelector(".player_character"))
    Recharging(enemy_recharge_turns,document.querySelector(".enemy_character"))

    if(attacker_health > 0){

     if(attacker_recharge <= 0){

      if(move.accuracy > Math.floor(Math.random() * 100 + 1)){

        var total_delay = move.effects * move.milliseconds + 1300;

        if(!isEnemy){
          console.log(player_iterator,enemy_iterator);
          clearInterval(player_iterator);
          player_iterator = await SpriteAnimator2(player_element,saved_characters.player.animation_sheet.attack,200);
            console.log(player_iterator,enemy_iterator);
        }else{
          clearInterval(enemy_iterator);
          enemy_iterator = await SpriteAnimator2(enemy_element,saved_characters.enemy.animation_sheet.attack,200);
        }

        GenerateMove(move,isEnemy,move.isRandom);

        await delay(total_delay);

        if(!isEnemy){
          clearInterval(player_iterator);
          player_iterator = await SpriteAnimator2(player_element,saved_characters.player.animation_sheet.idle,200);
        }else{
          clearInterval(enemy_iterator);
          enemy_iterator = await SpriteAnimator2(enemy_element,saved_characters.enemy.animation_sheet.idle,200);
      }

        DisplayDamageCalculations(move,isEnemy);

        return total_delay + 1300;



      }else{
        RenderMiss(isEnemy);
      }

    }else{

      if(isEnemy){

        enemy_recharge_turns--;

      }else{

        player_recharge_turns--;

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

    var winner = DetermineWinner();


    Death(true);
    Death(false);

    await delay(1000);

    if(winner){

      RenderEndPage(winner.character,winner.win);

    }else{

      disable = false;

      move_row.style.opacity = "100%";

      document.body.classList.remove("no-point");

    }

  }

}



const BattleSequence = async(is_player_faster,selected_move) => {

  var attack_sequence = [];

  var random_counter = saved_characters.enemy.moves[Math.ceil(Math.random()*3)].name;
  var random_move = MoveBase[random_counter];

  var enemy_args = {
    move : random_move,
    isEnemy:true
  }

  var player_args = {
    move : selected_move,
    isEnemy: false
  }

  if(is_player_faster){
    attack_sequence.push(player_args);
    attack_sequence.push(enemy_args);
  }else{
    attack_sequence.push(enemy_args);
    attack_sequence.push(player_args);
  }

  Attack(attack_sequence[0].move, attack_sequence[0].isEnemy);
  await delay(2500);
  Attack(attack_sequence[1].move, attack_sequence[1].isEnemy);

}


const IsPlayerFaster = (player_stats,enemy_stats) =>{

  if(player_stats.speed.stat >= enemy_stats.speed.stat){

    return true;

  }else{

    return false;

  }

}





const DisplayDamageCalculations = (selected_move,isEnemy) =>{

    var defender_health = isEnemy ? player_health : enemy_health;

    var attacker = isEnemy ? saved_characters.enemy :  saved_characters.player;
    var defender = isEnemy ? saved_characters.player :  saved_characters.enemy;

    var defender_blood = isEnemy ? "player_blood" : "enemy_blood";

    var side_effects = selected_move.side_effects;

    var damage = CalculateDamage(defender_health,attacker,defender,selected_move.damage);

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

    defender_health = isEnemy ? player_health : enemy_health;

    ChangeHealthBarWidth(defender_blood,defender_health,defender);
    ChangeHealthBarColor(defender_health,defender_blood,defender.stats.health.stat);

    SideEffects(side_effects,isEnemy,damage);

}



const SideEffects = (side_effects,isEnemy,damage) => {

  if(side_effects){

     if(side_effects.name == "recharge"){
       var recharge_turns = side_effects.turns;

       if(!isEnemy){

         player_recharge_turns = recharge_turns;

       }else{

         enemy_recharge_turns = recharge_turns;

       }

     }
     else if(side_effects.name == "boost"){

       if(isEnemy){

          if(enemy_stages < 4){

            saved_characters.enemy.stats =  side_effects.effect(saved_characters.enemy.stats,side_effects.stat_type)
            enemy_stages += side_effects.stages;
            RenderBoost(document.querySelector(".boost_enemy"),true,side_effects.lower,side_effects.stages)

          }

       }
       else{

          if(player_stages < 4){

            saved_characters.player.stats = side_effects.effect(saved_characters.player.stats,side_effects.stat_type);
            player_stages += side_effects.stages;
            RenderBoost(document.querySelector(".boost_player"),false,side_effects.lower,side_effects.stages)

          }

       }

     }

     else if(side_effects.name == "drain"){

       var query = isEnemy ? "enemy_blood" : "player_blood";
       var character = isEnemy ? saved_characters.enemy : saved_characters.player;

       if(!isEnemy){

          player_health = side_effects.effect(player_health,damage,query,character);

        }else{

          enemy_health = side_effects.effect(enemy_health,damage,query,character);

        }

        var health = isEnemy ? enemy_health : player_health;

        ChangeHealthBarWidth(query,health,character);

      }

    }

  }



  const Death = (isEnemy) =>{

    var defender_health = isEnemy ? player_health : enemy_health;

    var element =  isEnemy ? document.querySelector(".player_character") : document.querySelector(".enemy_character");

    if(defender_health <=0){
      DeathAnimation(element)
    }

  }