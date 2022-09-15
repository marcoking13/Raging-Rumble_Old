class Drain {

  constructor(){
    this.name = "drain";

    this.effect = function drain(health,damage,health_class){

      var health_regained = Math.floor(damage / 2);

      console.log(health_regained);
      health = health + health_regained;
      if(health >= 100){
        health = 100;
      }

      return health;

    }

  }

}
