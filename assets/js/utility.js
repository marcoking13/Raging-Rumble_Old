
const audioSource = "./assets/audio/gameMusic.wav";
const audioExtension = audioSource.substring(audioSource.indexOf('c.') + 2);

const CapitalizeFirstLetter =(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EmptyContainer = (element) =>{

       var child = element.lastElementChild;

       while (child) {
           element.removeChild(child);
           child = element.lastElementChild;
       }

   }

const RemoveClassFromElements = (targetClass,className) =>{

    var target = document.getElementsByClassName(targetClass);

      for (var i = 0; i < target.length; ++i) {

         var item = target[i];
         item.classList.remove(className);

      }

  }

function randomRotation(limit,rotationV){

  var arr = [];
  var randomRotationValue = Math.floor(Math.random() * rotationV);

  for(var i = 0; i < limit; i++){
    randomRotationValue = (-1 * Math.floor(Math.random() * rotationV));
    arr.push(randomRotationValue)
  }

  return arr;

}

const SpriteDelay = (i,element,limit,folder,sprite_name,speed) =>{

 setTimeout(()=>{
    element.setAttribute("src",`${folder}${sprite_name}_${i}.png`);

  },speed);

}

const SpriteAnimator = async (element,sheet,ms,total_ms,display) => {

    ms_passed = 0;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    var k = 1;

    for (let i = 1; i <= 3000;i++) {
      k++;

      ms_passed += ms;

      if(ms_passed >= total_ms){
        element.setAttribute("src",`${display}`);
        break;
      }

      if(k >= sheet.animation_sheet.length){
        k = 1;
      }

      await delay(ms);
      element.setAttribute("src",`${sheet.animation_sheet[k]}`);

    }

}

const  AddClassToElement =(element,classAdded)=>{
    element.classList.add(classAdded);
 }
