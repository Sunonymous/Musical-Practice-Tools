const    keysWithSharps = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭'];
const            volume = ['Very Quiet', 'Quiet', 'Moderately Loud', 'Loud',  'Very Loud',  'Loud Spikes',   'Gradually Quieter', 'Gradually Louder'];
const       volumeFancy = ['Pianissimo', 'Piano', 'Mezzo Forte',     'Forte', 'Fortissimo', 'Sforzando',     'Diminuendo',        'Crescendo'];
const             tempo = ['Very Slow', 'Slow and Long', 'Slower',    'Slow',   'Slightly Slow', 'Medium',   'Quickened',  'Fast',    'Very Fast'];
const        tempoFancy = ['Grave',     'Largo',         'Larghetto', 'Lento',  'Andante',       'Moderato', 'Allegretto', 'Allegro', 'Presto'];
const      articulation = ['Slur', 'Dotted',   'Connected', 'Fully Held', 'Emphasized'];
const articulationFancy = ['Slur', 'Staccato', 'Legato',    'Tenuto',     'Marcato'];
const              mood = ["adventurous","aimless","alive","alluring","ancient","awkward","blissful","brisk","bumpy","busy","calm","cautious","charming","cheerful","circular","clumsy","compelling","colorful","colossal","combative","comfortable","confusing","courageous","creepy","curious","cute","dangerous","dark","defiant","deliberate","delightful","despicable","difficult","directionless","dreamy","eager","ecstatic","eerie","elderly","elegant","enchanted","endless","energetic","engaging","enthusiastic","evil","exciting","fancy","fantastical","fragile","frail","frantic","frenzied","friendly","gentle","glorious","graceful","grumpy","hollow","homeward","horizontal","hypnotic","impulsive","indecisive","innocent","intertwined","irregular","jittery","joyous","lazy","lively","lonely","lovely","lunar","luscious","massive","meaningful","mechanical","melodic","mini","modern","momentous","motionless","morose","mystical","naughty","nervous","odd","open","parallel","perfect","pleasant","precious","proud","pulsing","quaint","random","repulsive","restless","rhythmic","ruined","rushed","safe","serpentine","scenic","shaky","sharp","shy","silly","skimpy","sleepy","sly","smiling","smooth","soft","splendid","staggered","steady","strange","striding","suspicious","synchronous","tender","timid","thoughtful","tough","tremendous","tremulous","turbulent","unnatural","unusual","vast","vertical","vigorous","warm","weary","whimsical","wicked","wild","windward","wretched","youthful","zany"];
const            motion = ["advancing","advising","ambling","amending","attacking","beaming","brooding","charging","climbing","colliding","commuting","craving","crawling","departing","deviating","devouring","discovering","dismantling","dripping","enveloping","erasing","exploring","extracting","gathering","gleaming","glistening","guiding","hobbling","hurrying","igniting","illuminating","journeying","launching","leading","lingering","lurching","lurking","mimicking","multiplying","musing","oppressing","ordering","planting","plopping","plucking","popping","prattling","preaching","puzzling","realizing","refining","relieving","retreating","revitalizing","reverberating","revolving","rising","sauntering","scampering","settling","singing","skipping","sliding","slinking","sneaking","soaring","spiralling","straining","strolling","struggling","stumbling","stuttering","swelling","swooning","transporting","traveling","trudging","unearthing","untangling","wandering","weaving","whispering","winding","withdrawing"];

const expressions = {
  tone: keysWithSharps,
  volume,
  volumeFancy,
  tempo,
  tempoFancy,
  articulation,
  articulationFancy,
  mood,
  motion,
};

export default expressions;