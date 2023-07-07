
var countdown = 5;
var effect_modal_interval = null;


const ResetCountdown = () =>{
  countdown = 5;
}

const RefreshModal = (player,enemy)=>{

    var container = document.querySelector(".fight_showcase_modal");

    EmptyContainer(container);

    container.innerHTML = GenerateModal(player,enemy);

}

var _in ;
const Countdown = async(player,enemy) =>{

  var countdown = 5;

  clearInterval(effect_modal_interval);

  var countdown_text = document.querySelector(".countdown_text");

  countdown_text.innerHTML = countdown.toString();

  effect_modal_interval = setInterval(()=>{


    countdown--;

    if(countdown <= 0){

      countdown = 0;

      window.location.href = 'fight.html';

      return false;

    }else{

      countdown_text.innerHTML = countdown.toString();

    }

  },1000);

}

const RenderVSModal = (player,enemy) => {

  var flip_player = player.flip_sprite ? 180 : 0;
  var flip_enemy = enemy.flip_sprite ? 360 : 180;

  var html = `
  <div class="col-5 margin-top-5">
  <div class="fight_modal">
    <img src=${player.display_image} class="player_modal_img" style="z-index:999;transform:rotateY(${flip_player.toString()}deg)"/>
  </div>
    <h3 class="player_modal_name text-center rubik margin-top-5 light_blue" style="relative;z-index:999">${player.name}</h3>
  </div>

  <div class="col-2 margin-top-5">
      <h1 class="vs_text text-center rubik">VS</h1>
  </div>

  <div class="col-5 margin-top-5">
    <div class="fight_modal">
      <img src=${enemy.display_image} class="player_modal_img rotate-180"style="z-index:99;position:relative;transform:rotateY(${flip_enemy.toString()}deg)"/>
    </div>
    <h3 class="player_modal_name margin-top-5 text-center rubik light_red" style="z-index:999; position:relative">${enemy.name}</h3>
  </div>`

  return html;
}

const GenerateModal = (player,enemy) =>{

  var header =  `Fight Starting in `

  var modal = ``
  modal += RenderVSModal(player,enemy);

  var html  = `
  <div class="modal"  tabindex="-1" role="dialog" id="fightmodal">
    <div class="modal-dialog" role="document">
      <div class="modal-content game_modal">
        <div class="header margin-top-5">
          <h2 class="fight_modal_title text-center rubik"><strong class='countdown_text'></strong></h2>
        </div>
        <div class="row countdown_box relative">

          ${modal}

        </div>
      </div>
    </div>
 </div>`;

 return html;

}
