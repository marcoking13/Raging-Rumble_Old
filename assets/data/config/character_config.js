const animation_key = {
  attack:"Attack",
  idle:"Idle"
}

const eban_dir = "./assets/imgs/eban_sprites/";
const johnathan_dir = "./assets/imgs/johnathan_sprites/";
const mrhands_dir = "./assets/imgs/mrhands_sprites/";
const jackolatern_dir ="./assets/imgs/jackolatern_sprites/";
const rikon_dir ="./assets/imgs/rikon_sprites/";
const frost_dir ="./assets/imgs/frost_sprites/";

var stat_config = {

  attack:{
    name:"Attack",
    color:"#FF5757"
  },
  defense:{
    name:"Defense",
    color:"#38B6FF"
  },
  speed:{
    name:"Speed",
    color:"#00C2CB"
  },
  health:{
    name:"Health",
    color:"#7ED957"
  }

}

const characters =
  [
    {
    name:"Ice Giant",
    folder:"./assets/imgs/eban_sprites/",
    id:"F0001",
    type:"power",
    animation_sheet: {
      idle: new AnimationSheet(eban_dir,4,animation_key.idle),
      attack: new AnimationSheet(eban_dir,4,animation_key.attack),
    },
    display_image : `${eban_dir}icon.png`,
    description:"",
    flip_sprite:false,
    stats:{
     attack:new Stat(stat_config.attack.name,stat_config.attack.color,100),
     defense:new Stat(stat_config.defense.name,stat_config.defense.color,110),
     speed:new Stat(stat_config.speed.name,stat_config.speed.color,10),
     health:new Stat(stat_config.health.name,stat_config.health.color,150)
    },
    moves:[
      new Moves(MoveBase["glacier thrust"]),
      new Moves(MoveBase["ice sling"]),
      new Moves(MoveBase["ice punch"]),
      new Moves(MoveBase["magical chaos"]),
    ]
  },
  {
 name:"Fire Mage",
 folder:"./assets/imgs/jackolatern_sprites/",
 id:"F00031",
 type:"Defense",
 stats:{
   attack:new Stat(stat_config.attack.name,stat_config.attack.color,65),
   defense:new Stat(stat_config.defense.name,stat_config.defense.color,125),
   speed:new Stat(stat_config.speed.name,stat_config.speed.color,65),
   health:new Stat(stat_config.health.name,stat_config.health.color,170)

 },
 animation_sheet: {
   idle: new AnimationSheet(jackolatern_dir,4,animation_key.idle),
   attack: new AnimationSheet(jackolatern_dir,4,animation_key.attack),
 },
 flip_sprite:false,
 display_image : `${jackolatern_dir}icon.png`,
 description:"",
 moves:[
   new Moves(MoveBase["fire strike"]),
   new Moves(MoveBase["fire sling"]),
   new Moves(MoveBase["magical chaos"]),
   new Moves(MoveBase["gorgon stare"]),
 ]
},
  {
   name:"Fire Ghoul",
   folder:"./assets/imgs/mrhands_sprites/",
   id:"F00035",
   type:"Strategy",
   flip_sprite:false,
   stats:{
       attack:new Stat(stat_config.attack.name,stat_config.attack.color,35),
       defense:new Stat(stat_config.defense.name,stat_config.defense.color,120),
       speed:new Stat(stat_config.speed.name,stat_config.speed.color,120),
       health:new Stat(stat_config.health.name,stat_config.health.color,200)
     },
   animation_sheet: {
     idle: new AnimationSheet(mrhands_dir,6,animation_key.idle),
     attack: new AnimationSheet(mrhands_dir,4,animation_key.attack),
   },
   display_image : `${mrhands_dir}icon.png`,
   description:"",
   moves:[
     new Moves(MoveBase["ghost claw"]),
     new Moves(MoveBase["spirit chant"]),
     new Moves(MoveBase["life drain"]),
     new Moves(MoveBase["ghost fire"]),
   ]
  },
  {
   name:"Metal Dragon",
   folder:"./assets/imgs/rikon_sprites/",
   flip_sprite:true,
   id:"F00236",
   type:"power",
   stats:{
     attack:new Stat(stat_config.attack.name,stat_config.attack.color,95),
     defense:new Stat(stat_config.defense.name,stat_config.defense.color,70),
     speed:new Stat(stat_config.speed.name,stat_config.speed.color,110),
     health:new Stat(stat_config.health.name,stat_config.health.color,130)
   },
   animation_sheet: {
     idle: new AnimationSheet(rikon_dir,14,animation_key.idle),
     attack: new AnimationSheet(rikon_dir,10,animation_key.idle),
   },
   display_image : `${rikon_dir}icon.png`,
   description:"",
   moves:[
     new Moves(MoveBase["fire strike"]),
     new Moves(MoveBase["raging thunder"]),
     new Moves(MoveBase["robotic bite"]),
     new Moves(MoveBase["flying rush"]),
   ]
  },
  {
   name:"Ice Mage",
   folder:"./assets/imgs/frost_sprites/",
   flip_sprite:false,
   id:"F02436",
   type:"all around",
   stats:{
     attack:new Stat(stat_config.attack.name,stat_config.attack.color,80),
     defense:new Stat(stat_config.defense.name,stat_config.defense.color,85),
     speed:new Stat(stat_config.speed.name,stat_config.speed.color,90),
     health:new Stat(stat_config.health.name,stat_config.health.color,130)
   },
   animation_sheet: {
     idle: new AnimationSheet(frost_dir,3,animation_key.idle),
     attack: new AnimationSheet(frost_dir,4,animation_key.attack),
   },
   display_image : `${frost_dir}icon.png`,
   description:"",
   moves:[
     new Moves(MoveBase["ice sling"]),
     new Moves(MoveBase["gorgon stare"]),
     new Moves(MoveBase["ice punch"]),
     new Moves(MoveBase["blinding light"]),
   ]
  },
   {
  name:"Vampire Bat",
  folder:"./assets/imgs/johnathan_sprites/",
  id:"F0002",
  flip_sprite:false,
  stats:{
    attack:new Stat(stat_config.attack.name,stat_config.attack.color,70),
    defense:new Stat(stat_config.defense.name,stat_config.defense.color,100),
    speed:new Stat(stat_config.speed.name,stat_config.speed.color,70),
    health:new Stat(stat_config.health.name,stat_config.health.color,150)

  },
  type:"strategy",
  animation_sheet: {
    idle: new AnimationSheet(johnathan_dir,3,animation_key.idle),
    attack: new AnimationSheet(johnathan_dir,4,animation_key.attack),
  },
  display_image : `${johnathan_dir}icon.png`,
  description:"",
  moves:[
    new Moves(MoveBase["gorgon stare"]),
    new Moves(MoveBase["flying rush"]),
    new Moves(MoveBase["life drain"]),
    new Moves(MoveBase["venom boost"]),
  ]
},
   {
  name:"N/A",
  id:"F0003",
  type:"N/A",
   stats:{
     attack:new Stat(stat_config.attack.name,stat_config.attack.color,8),
     defense:new Stat(stat_config.defense.name,stat_config.defense.color,8),
     speed:new Stat(stat_config.speed.name,stat_config.speed.color,8),
     health:new Stat(stat_config.health.name,stat_config.health.color,8)

   },
  animation_sheet: {
    idle: new AnimationSheet(null,0,null),
    attack: new AnimationSheet(null,0,null),
  },
  flip_sprite:false,
  display_image : "./assets/imgs/placeholder_wizard.gif",
  description:"",
  moves:[{name:"N/A"},{name:"N/A"},{name:"N/A"},{name:'N/A'}]

  }
]

function return_available_characters(cut_off,limit){

  const available_characters = [];
  var counter = 0;

  for(var i = 0; i < cut_off; i ++){
    console.log(characters[i])
    if(counter >= cut_off){

        available_characters.push(new Character(characters[characters.length - 1]));
    }else{

        available_characters.push(new Character(characters[counter]));
    }

    counter ++;

  }

  return available_characters;

}

function return_placeholder_character(){
    return new Character(characters[characters.length - 1]);
}
