class Recharge {
  
  constructor(turns,isEnemy){
    this.turns = turns;
    this.name = "recharge";
    this.isEnemy = isEnemy;

    this.effect = function recharge(turns,isEnemy){

      var turn_recharge =
      {
        enemy: 0,
        player:0
      }

      if(this.isEnemy){
        turn_recharge.enemy += this.turns;
      }else{
        turn_recharge.player += this.turns
      }

      return turn_recharge;

    }

  }

}
