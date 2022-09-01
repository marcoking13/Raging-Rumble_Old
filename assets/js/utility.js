
const audioSource = "./assets/audio/gameMusic.wav";
const audioExtension = audioSource.substring(audioSource.indexOf('c.') + 2);
console.log(audioExtension);


const CapitalizeFirstLetter =(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


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

//
// const EffectGenerator = async(container,element,limit,ms) =>{
//
//   const delay = (ms) => new Promise(resolve => setTimeout(resolve, 400));
//
//
//
// let i =0;
//
// while(i <300){
//     element.style.left = (Math.random() * 500).toString() + "px";
//       container.append(element);
//     console.log(container,element,limit,ms);
//     i++;
//   }
//
//
//
//
//
//   // setTimeout(()=>{
//   //   EmptyContainer(container);
//   // },delay);
// }


function randomRotation(limit,rotationV){

  var arr = [];
  var randomRotationValue = Math.floor(Math.random() * rotationV);

  for(var i = 0; i < limit; i++){
    randomRotationValue = (-1 * Math.floor(Math.random() * rotationV));
    arr.push(randomRotationValue)
  }

  return arr;

}

const Delay = (i,element,limit,folder,sprite_name,speed) =>{

 setTimeout(()=>{
   console.log(i);

    element.setAttribute("src",`${folder}${sprite_name}_${i}.png`);

  },speed);

}







// var test_element = document.createElement("img");
// var sprite_test_folder = "./assets/imgs/eban_sprites/";
// var limit = 5;
// var start = 0;
// var test_name = "Idle";
// test_element.setAttribute("src",`${sprite_test_folder}${test_name}_2.png`);
// test_element.classList.add("test");
// document.body.append(test_element);

//SpriteAnimator(test_element,limit,sprite_test_folder,test_name,500);




const SpriteAnimator = async (element,sheet,ms,total_ms,display) => {
  ms_passed = 0;

  console.log(element);
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
