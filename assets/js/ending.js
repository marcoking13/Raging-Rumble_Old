const RenderWinnerEffect = (won) =>{

  var html = `<div class="effect_container"> `
  var left = 10;
  var duration = .1;

  if(won){

    for(var i = 0; i <= 500;i++){

      var x = Math.random() * 100;
      var y = Math.random() * 100;

      var g = Math.floor(Math.random() * 255);
      var r = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);

      html += `
      <div class="winner_effect"
        style="left:${y.toString()}%;bottom:0%;animation-duration:${duration.toString()}s;background:rgb(${r.toString()},${g.toString()},${b.toString()})">
      </div>
      `
      duration += .02;
      left += 1;

    }

}

  html += `</div>`;

  return html;

}

const RenderEndPage = async(character,player_won) =>{

  var page = document.querySelector(".fight_page");

  document.body.style.backgroundColor = "black";

  var win_text = player_won ? "Won" : "Lost";
  var win_color = player_won ? "green" : "red";

  var html = `
  <div class="container-fluid ending_container">

    ${RenderWinnerEffect(player_won)}

    <div class="row">

      <div class="col-6">

        <p class="ending_title">
          Returning to Character Selection....
        </p>

      </div>

      <div class="col-5">
        <p class="ending_win" style = 'color:${win_color}'>You ${win_text}</p>
      </div>

    </div>

      <div class="row">

        <div class="col-4"></div>

        <div class="col-4">
          <img class="width-100 ending_image" src="${character.display_image}"/>
        </div>
        <div class="col-4"></div>

      </div>

      <h1 class="text-center winner_name">${character.name}</h1>

  </div>
  `

  EmptyContainer(page);

  var container = document.createElement("div");
  container.classList.add("ending_page");

  container.innerHTML = html;

  page.append(container);

  var effect_container = document.querySelector(".effect_container");

  await delay(5000);

  window.location.assign("./character_selection.html");

  EmptyContainer(effect_container);

}
