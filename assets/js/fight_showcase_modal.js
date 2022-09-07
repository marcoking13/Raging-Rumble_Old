
var countdown = 5;

const ResetCountdown = () =>{
  countdown = 5;
}


const SaveCharacters = (player,enemy) =>{

  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('enemy', JSON.stringify(enemy));

}

const Countdown = async(player,enemy) =>{
  var countdown = 5;

  SaveCharacters(player,enemy);

  while(countdown >= 0){

    countdown = countdown-1;

    if(countdown <= 0){

      countdown = 0;

      window.location.href = 'fight.html';

      return false;

    }

    var countdown_text = document.querySelector(".countdown_text");

    countdown_text.innerHTML = countdown.toString();

    await delay(1000);

  }

}

const vs_modal = (player,enemy) => {

  var flip_player = player.flip_sprite ? 180 : 0;
  var flip_enemy = enemy.flip_sprite ? 360 : 180;

  var html = `
  <div class="col-5 margin-top-5">
  <div style="height:300px">
    <img src=${player.display_image} class="player_modal_img"style="transform:rotateY(${flip_player.toString()}deg)"/>
    </div>
    <h3 class="player_modal_name text-center rubik margin-top-5"style="color:#38B6FF">${player.name}</h3>
  </div>

  <div class="col-2 margin-top-5">
      <h1 class="vs_text text-center rubik" style="font-size:60px;margin-top:100%">VS</h1>
  </div>

  <div class="col-5 margin-top-5">
    <div style="height:300px">
    <img src=${enemy.display_image} class="player_modal_img rotate-180"style="transform:rotateY(${flip_enemy.toString()}deg)"/>
    </div>
    <h3 class="player_modal_name margin-top-5 text-center rubik"style="color:#FF5757">${enemy.name}</h3>
  </div>`

  return html;
}


const end_modal = (character) => {

  var html = `
  <div class="col-8 margin-top-5">

  <div class="col-12 margin-top-5">
    <div style="height:300px">
    <img src=${character.display_image} class="player_modal_img rotate-180"/>
    </div>
    <h3 class="player_modal_name margin-top-5 text-center rubik"style="color:#FF5757">${character.name} Has Won!</h3>
  </div>`

  return html;
}



const GenerateModal = (player,enemy,is_vs_modal,character) =>{

var header = is_vs_modal ? `Fight Starting in `: "Fight Has Ended";

  var modal = ``

  if(is_vs_modal){
    modal += vs_modal(player,enemy);
  }else{
    modal += end_modal(character);
  }

  var html  = `
  <div class="modal"  tabindex="-1" role="dialog" id="fightmodal">
    <div class="modal-dialog" role="document">
      <div class="modal-content"style="padding:2%;background:black;color:white;width:700px;position:absolute;left:-15%;height:600px">
        <div class="header margin-top-5">
          <h2 class="fight_modal_title text-center rubik"style="color:yellow;font-size:40px;padding-top:2.5%;padding-bottom:2.5%;border-top:1px solid yellow;border-bottom:1px solid yellow"><strong class='countdown_text'></strong></h2>
        </div>
        <div class="row">

          ${modal}

        </div>
      </div>
    </div>
 </div>`;

 return html;

}
