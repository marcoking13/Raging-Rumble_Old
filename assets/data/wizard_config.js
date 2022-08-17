
const animation_key = {
  attack:"Attack",
  idle:"Idle"
}

const eban_dir = "./assets/imgs/eban_sprites/";


const wizardConfig =
  {
    "eban": {
    name:"Ebin the Terrible",
    folder:"./assets/imgs/eban_sprites/",
    id:"F0001",
    type:"ice",
    animation_sheet: {
      idle: new AnimationSheet(eban_dir,4,animation_key.idle),
      attack: new AnimationSheet(eban_dir,5,animation_key.attack),
    },
    display_image : `${eban_dir}${animation_key.idle}_1.png`,
    description:"",
    moves:[
      new Moves(MoveBase["fire strike"]),
      new Moves(MoveBase["fire sling"]),
      new Moves(MoveBase["blinding light"]),
      new Moves(MoveBase["hells escape"]),
    ]
  },
    "placeholder": {
    name:"N/A",
    id:"F0002",
    type:"N/A",
    animation_sheet: {
      idle: new AnimationSheet(null,0,null),
      attack: new AnimationSheet(null,0,null),
    },
    display_image : "./assets/imgs/placeholder_wizard.png",
    description:"",
    moves:[{name:"N/A"},{name:"N/A"},{name:"N/A"},{name:'N/A'}]
  }
}





function return_available_wizards(cut_off,limit){

  const available_wizards = [];

  for(var i = 0; i < limit; i ++){

    if(i < cut_off){
        available_wizards.push(new Wizard(wizardConfig["eban"]));
    }else{
        available_wizards.push(new Wizard(wizardConfig["placeholder"]));
    }
  }

  return available_wizards;

}

//name,type,damage,animation_sheet,class_animation
