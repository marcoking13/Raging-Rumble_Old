

class AnimationSheet {

    constructor(ext,limit,prefix){
      this.animation_sheet = this.create_sheet(ext,limit,prefix);
      this.starting_sprite = this.get_current_sprite(ext,prefix,0);
      this.ext = ext;
      this.prefix = prefix;
    }

    get_current_sprite(ext,prefix,index) {

      if(!prefix || !ext){
        return null;
      }
      return `${ext}${prefix}_${index + 1}.png`;
      
    }

    create_sheet(ext,limit,prefix){

      if(limit <= 0){
        return null;
      }

      var sheet = [];

      for(var i = 0; i <= limit; i ++){
        sheet.push(`${ext}${prefix}_${i}.png`);
      }

      return sheet;

    }


    animate(element,iterate_time){

      this.animation_sheet.map((animate_item)=>{

        setTimeout(()=>{
          element.setAttribute("src",animate_item);
        },iterate_time);

      });

    }

  }
