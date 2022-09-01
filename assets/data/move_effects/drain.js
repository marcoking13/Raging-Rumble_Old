class Drain {

  constructor(){
    this.name = "drain";

    this.effect = function drain(health,damage,health_class){

      health += Math.floor(damage / 2);

      var health_element = document.querySelector("."+health_class);

      health_element.style.width = health + "%";
      health_element.innerHTML = health;

      return health;

    }

  }

}
