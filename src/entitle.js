/* ============ Yurt dışında şarkı isimleri İngilizce ============ */
const WORDS_EN={rap:[['Concrete','Midnight','Hustle','Street','Cold','Gold','Block','Money','Dark','Ghetto','Loyal','Savage','Back','No'],['Dreams','Kings','Talk','Life','Mode','Chains','Code','Bars','Season','Hearts','Rules','Pressure','Flow','Love']],
 pop:[['Neon','Summer','Golden','Electric','Sweet','Lonely','Crazy','Velvet','Starlight','Paper','Wild','Pink','Lost','Better'],['Heart','Nights','Love','Dance','Skies','Feelings','Kiss','City','Dreams','Days','Lights','Lies','Party','Fire']],
 arabesk:[['Broken','Tears of','Endless','Silent','Lonely','Bitter','Last','Fallen','Faded','Burning'],['Heart','Goodbye','Rain','Night','Longing','Love','Memories','Pain','Prayer','Exile']],
 rock:[['Thunder','Iron','Highway','Black','Wild','Restless','Burning','Electric','Rebel','Stone'],['Road','Storm','Revolution','Echoes','Machine','Riot','Fire','Soul','Skies','Engine']],
 turku:[['Mountain','River','Old','Valley','Shepherd\'s','Homeland','Distant','Willow','Village','Northern'],['Song','Wind','Lament','Road','Ballad','Fields','Home','Path','Tale','Hymn']]};
const _gt19=genTitle;genTitle=function(g){if(S&&S.ct&&S.ct!=='tr'){const w=WORDS_EN[g]||WORDS_EN.pop;return pick(w[0])+' '+pick(w[1])}return _gt19(g)};
