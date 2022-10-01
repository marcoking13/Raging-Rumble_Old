class Recharge {
  
  constructor(turns,is_enemy){
    this.turns = turns;
    this.name = "recharge";
    this.is_enemy = is_enemy;

    this.effect = function recharge(turns,is_enemy){

      var turn_recharge =
      {
        enemy: 0,
        player:0
      }

      if(this.is_enemy){
        turn_recharge.enemy += this.turns;
      }else{
        turn_recharge.player += this.turns
      }

      return turn_recharge;

    }

  }

}
