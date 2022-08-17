const MoveBase = {
  "fire strike":{
    damage:45,
    effect:null,
    name:"fire strike",
    type:"fire",
    effectChance:null,
    image:null,
    accuracy:90,
    class_animation:"fire_strike_ani"
  },
  "fire sling":{
    damage:90,
    type:"fire",
    effectChance:100,
    name:"fire sling",
    effect:"player recharge 1 turn",
    image:null,
    accuracy:100,
    class_animation:"fire_strike_ani"
  },
  "blinding light":{
    damage:0,
    effect:"enemy recharge 1 turn",
    effectChance:50,
    name:'blinding light',
    accuracy:100,
    type:"fire",
    image:null,
    class_animation:"fire_strike_ani"
  },
  "hells escape":{
    damage:2000,
    effectChance:null,
    name:"hell's escape",
    accuracy:10,
    effect:null,
    type:"fire",
    image:null,
    class_animation:"fire_strike_ani"
  }
}
