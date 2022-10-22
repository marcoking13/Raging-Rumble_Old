
const game_container = document.querySelector(".game_container");
var fireball_counters = 0;
var y_pos = [-5,15];

const FireballEffect = () => {

  if(fireball_counters < y_pos.length){
    var element = document.createElement("img");
    element.setAttribute("src","./assets/imgs/fire_ball_start.gif")
    element.classList.add("fireball_start");

    element.style.top = y_pos[fireball_counters].toString() + "%";
    fireball_counters ++;

    var interval;
    var audio = document.querySelector(".fire_sound");
    audio.play();
    document.body.append(element);

  }

}

const GenerateStartScreen = async() =>{


    EmptyContainer(game_container);

    var start_game_button = document.createElement("p");
    const start_game_button_text = document.createTextNode("Start Game");

    const html = `
    <div class="container-fluid witch_queen_vengence_container">

      <img class="app_background" src = "./assets/imgs/landing_background.png" />
      <div class='start_screen'>
          <h1 class="app_title title_1"> Raging <strong class="app_title title_2 title_ani_2 ">Rumble </strong></h1>
          <p class="app_subtitle"> <strong class="purple">Can You Defeat All the Fighters? </p>
      </div>

    </div>`;

    game_container.innerHTML = html;

    var start_screen = document.querySelector(".start_screen");

    await delay(1000);

    start_game_button.append(start_game_button_text);
    start_game_button.classList.add("start_game");

    start_game_button.addEventListener("click",(e)=>{
      window.location.assign("./character_selection.html");
    })

    start_screen.append(start_game_button);

    var title_1 = document.querySelector(".title_1");
    var subtitle = document.querySelector(".app_subtitle");
    var start_text = document.querySelector(".start_game");

    setTimeout(()=>{AddClassToElement(title_1,"title_ani_1")},500);
    setTimeout(()=>{AddClassToElement(subtitle,"subtitle_ani")},1000);
    setTimeout(()=>{AddClassToElement(start_text,"start_game_ani")},1000);

}

if(window.innerWidth >= 680){

  if(fireball_counters >= y_pos.length){
    clearInterval(interval)

  }else{
     interval = setInterval(()=>{FireballEffect()},800);
  }

  GenerateStartScreen();

}
