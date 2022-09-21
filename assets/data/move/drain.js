class Drain {

  constructor(){
    this.name = "drain";

    this.effect = function drain(health,damage,health_class,character){

      var health_regained = Math.floor(damage / 2);

      console.log(health_regained);
      health = health + health_regained;

      if(health >= character.stats.health.stat){
        health = character.stats.health.stat;
      }

      return health;

    }

  }

}
