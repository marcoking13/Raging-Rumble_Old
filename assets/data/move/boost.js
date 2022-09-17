class Boost {

  constructor(stat_type,stages,lower){

    this.stages = stages;
    this.stage_points = .25;
    this.stat_type = stat_type;
    this.name = "boost";
    this.lower = lower;
    this.effect =  function boost(character_stats,stat_type){

      var stage_multiplier = (this.stage_points * this.stages);
      var boost_or_lower_stat = stage_multiplier * this.lower;

      switch(stat_type){

        case "attack":

          character_stats.attack.stat +=  Math.floor(character_stats.attack.stat * boost_or_lower_stat)
          return character_stats

        case "defense":

           character_stats.defense.stat +=  Math.floor(character_stats.defense.stat * boost_or_lower_stat)
           return character_stats

        case "speed":

           character_stats.speed.stat += Math.floor( character_stats.speed.stat *  boost_or_lower_stat);
           return character_stats

        case "luck":

           character_stats.luck.stat +=  Math.floor(character_stats.luck.stat * boost_or_lower_stat);
           return character_stats

      }

    }

  }

}
