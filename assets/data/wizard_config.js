
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

const wizardConfig =
  [
     {
    name:"Ebin the Terrible",
    folder:"./assets/imgs/eban_sprites/",
    id:"F0001",
    type:"power",
    animation_sheet: {
      idle: new AnimationSheet(eban_dir,4,animation_key.idle),
      attack: new AnimationSheet(eban_dir,4,animation_key.attack),
    },
    display_image : `${eban_dir}${animation_key.idle}_1.png`,
    description:"",
       flip_sprite:false,
    stats: new Stats(170,70,10,10),
    moves:[
      new Moves(MoveBase["glacier thrust"]),
      new Moves(MoveBase["ice sling"]),
      new Moves(MoveBase["ice punch"]),
      new Moves(MoveBase["dark void"]),
    ]
  },
  {
 name:"Jack O' Latern",
 folder:"./assets/imgs/jackolatern_sprites/",
 id:"F00031",
 type:"all-around",
 stats: new Stats(75,85,75,15),
 animation_sheet: {
   idle: new AnimationSheet(jackolatern_dir,4,animation_key.idle),
   attack: new AnimationSheet(jackolatern_dir,4,animation_key.attack),
 },
    flip_sprite:false,
 display_image : `${jackolatern_dir}${animation_key.idle}_1.png`,
 description:"",
 moves:[
   new Moves(MoveBase["fire strike"]),
   new Moves(MoveBase["fire sling"]),
   new Moves(MoveBase["dark void"]),
   new Moves(MoveBase["gorgon stare"]),
 ]
},
  {
   name:"Mr. Hands",
   folder:"./assets/imgs/mrhands/",
   id:"F00035",
   type:"strategy",
   flip_sprite:false,
   stats: new Stats(40,100,110,46),
   animation_sheet: {
     idle: new AnimationSheet(mrhands_dir,6,animation_key.idle),
     attack: new AnimationSheet(mrhands_dir,4,animation_key.attack),
   },
   display_image : `${mrhands_dir}${animation_key.idle}_1.png`,
   description:"",
   moves:[
     new Moves(MoveBase["ghost claw"]),
     new Moves(MoveBase["spirit chant"]),
     new Moves(MoveBase["life drain"]),
     new Moves(MoveBase["ghost fire"]),
   ]
  },
  {
   name:"Rikon the Robotic Dragon",
   folder:"./assets/imgs/rikon_sprites/",
   flip_sprite:true,
   id:"F00236",
   type:"power",
   stats: new Stats(80,70,100,6),
   animation_sheet: {
     idle: new AnimationSheet(rikon_dir,14,animation_key.idle),
     attack: new AnimationSheet(rikon_dir,10,animation_key.idle),
   },
   display_image : `${rikon_dir}${animation_key.idle}_1.png`,
   description:"",
   moves:[
     new Moves(MoveBase["fire strike"]),
     new Moves(MoveBase["raging thunder"]),
     new Moves(MoveBase["robotic bite"]),
     new Moves(MoveBase["flying rush"]),
   ]
  },
  {
   name:"Jack Frost",
   folder:"./assets/imgs/frost_sprites/",
   flip_sprite:false,
   id:"F02436",
   type:"all around",
   stats: new Stats(85,75,70,6),
   animation_sheet: {
     idle: new AnimationSheet(frost_dir,3,animation_key.idle),
     attack: new AnimationSheet(frost_dir,4,animation_key.attack),
   },
   display_image : `${frost_dir}${animation_key.idle}_1.png`,
   description:"",
   moves:[
     new Moves(MoveBase["ice sling"]),
     new Moves(MoveBase["gorgon stare"]),
     new Moves(MoveBase["ice punch"]),
     new Moves(MoveBase["dark void"]),
   ]
  },
   {
  name:"Johnathan the Bat",
  folder:"./assets/imgs/johnathan_sprites/",
  id:"F0002",
  flip_sprite:false,
  stats:new Stats(70,90,75,20),
  type:"strategy",
  animation_sheet: {
    idle: new AnimationSheet(johnathan_dir,3,animation_key.idle),
    attack: new AnimationSheet(johnathan_dir,4,animation_key.attack),
  },
  display_image : `${johnathan_dir}${animation_key.idle}_1.png`,
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
   stats: new Stats(0,0,0,0),
  animation_sheet: {
    idle: new AnimationSheet(null,0,null),
    attack: new AnimationSheet(null,0,null),
  },
     flip_sprite:false,
  display_image : "./assets/imgs/placeholder_wizard.png",
  description:"",
  moves:[{name:"N/A"},{name:"N/A"},{name:"N/A"},{name:'N/A'}]

}
]





function return_available_wizards(cut_off,limit){

  const available_wizards = [];
  var counter = 0;
  for(var i = 0; i < 9; i ++){
    console.log(wizardConfig[counter]);

    if(counter >= cut_off){
        available_wizards.push(new Wizard(wizardConfig[wizardConfig.length -1]));
    }else{

        available_wizards.push(new Wizard(wizardConfig[counter]));
    }


    counter ++;

  }

  return available_wizards;

}

//name,type,damage,animation_sheet,class_animation
